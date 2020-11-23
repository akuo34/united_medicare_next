import React, { useState, useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import Axios from 'axios';
import AdminHeader from '../../components/adminHeader';
import { storage } from '../../firebase/firebase';
import { useAuth } from '../../contexts/auth';
import LoadingScreen from '../../components/loadingScreen';

const ProductManager = (props) => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(null);
  const [showFeatures, setShowFeatures] = useState(null);
  const [showSpecs, setShowSpecs] = useState(null);
  const [showDownloads, setShowDownloads] = useState(null);
  const [indexes, setIndexes] = useState({});
  const [categories, setCategories] = useState({});
  const [sortedProducts, setSortedProducts] = useState([]);
  const { logout, admin } = useAuth();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = (id, last) => {
    Axios
      .get('/api/products')
      .then(response => {
        let copy = { ...indexes }
        let categories = {};

        // for every product
        response.data.forEach(product => {
          // if category is not on the current list of categories, add to list
          if (categories[product.category] === undefined) {
            categories[product.category] = 1;
          }
          // if product is not listed in the current list of indexes, add to list
          if (copy[product._id] === undefined) {
            copy[product._id] = 0;
            // if current product index is higher than index of last image, decrement index
          } else if (copy[product._id] > product.images.length - 1 && copy[product._id] !== 0) {
            copy[product._id]--;

          } else if (last && id === product._id) {
            copy[id] = product.images.length - 1;
          }
        })

        setCategories(categories);
        setIndexes(copy)
        setProducts(response.data);

        if (document.getElementById('selector-category').value === "All categories") {
          setSortedProducts(response.data);
        } else {
          let sorted = response.data.filter(product => product.category === document.getElementById('selector-category').value);
          setSortedProducts(sorted);
        }
      })
      .catch(err => console.error(err));
  }

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    const prodId = e.target.prodId.value;
    const index = products.length;
    const category = e.target.category.value;

    setLoading(true);

    console.log('start of upload');

    if (imageAsFile === '') {
      setLoading(false);
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
      return;
    };

    let randomizer = (Math.floor(Math.random() * (1000 - 1)) + 1).toString();
    let split = imageAsFile.name.split('.');
    const filename = split[0] + randomizer + split[1];

    const uploadTask = storage.ref(`/products/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('products').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let images = [{ filename, fireBaseUrl }]
          let request = { images, name, prodId, description, category, index };

          Axios
            .post('/api/products', request)
            .then(response => {
              getProducts();
              setImageAsFile('');
              setLoading(false);
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-products').reset();
  };

  const showEditHandler = (e) => {
    const _id = e.target.dataset.id;

    if (showEdit === _id) {
      setShowEdit(null);
    } else {
      setShowEdit(_id);
    }
  }

  const editProductHandler = (e) => {
    e.preventDefault();

    let _id = e.target.dataset.id;
    let name = e.target.name.value;
    let prodId = e.target.prodId.value;
    let description = e.target.description.value;
    let category = e.target.category.value;
    let request = { name, prodId, description, category };

    for (let key in request) {
      if (request[key] === '') {
        delete request[key];
      }
    }

    Axios
      .put(`/api/products/${_id}`, request)
      .then(response => {
        getProducts();
      })
      .catch(err => console.error(err));

    document.getElementById(`form-products-edit-${_id}`).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.dataset.id;

    Axios
      .delete(`/api/products/${_id}`)
      .then(response => {

        let product = products.filter(product => product._id === _id)[0];
        let images = product.images;
        images.forEach(image => {
          storage.ref('products').child(image.filename).delete()
            .then(() => console.log('deleted from firebase'))
            .catch(err => console.error(err));
        })

        let downloads = product.downloads;
        downloads.forEach(download => {
          storage.ref('products').child(download.filename).delete()
            .then(() => console.log('deleted from firebase'))
            .catch(err => console.error(err));
        })

        getProducts();
      })
      .catch(err => console.error(err));
  }

  const addFeature = (e) => {
    e.preventDefault();

    let feature = e.target.feature.value;
    let _id = e.target.dataset.id;
    let features = products.filter(product => product._id === _id)[0].features;

    features.push(feature);

    Axios
      .put(`/api/products/${_id}`, { features })
      .then(response => {
        getProducts();
        setShowFeatures(_id);
      })
      .catch(err => console.error(err));

    document.getElementById(`form-features-${_id}`).reset();
  }

  const deleteFeature = (e) => {
    let _id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let features = products.filter(product => product._id === _id)[0].features;

    features.splice(index, 1);

    Axios
      .put(`/api/products/${_id}`, { features })
      .then(response => {
        getProducts();
      })
      .catch(err => console.error(err));
  }

  const showFeaturesHandler = (e) => {
    let _id = e.target.dataset.id;

    if (showFeatures === _id) {
      setShowFeatures(null);
    } else {
      setShowFeatures(_id);
    }
  }

  const addSpec = (e) => {
    e.preventDefault();

    let spec = e.target.spec.value;
    let _id = e.target.dataset.id;
    let specs = products.filter(product => product._id === _id)[0].specs;

    specs.push(spec);

    Axios
      .put(`/api/products/${_id}`, { specs })
      .then(response => {
        getProducts();
        setShowSpecs(_id);
      })
      .catch(err => console.error(err));

    document.getElementById(`form-specs-${_id}`).reset();
  }

  const deleteSpec = (e) => {
    let _id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let specs = products.filter(product => product._id === _id)[0].specs;

    specs.splice(index, 1);

    Axios
      .put(`/api/products/${_id}`, { specs })
      .then(response => {
        getProducts();
      })
      .catch(err => console.error(err));
  }

  const showSpecsHandler = (e) => {
    let _id = e.target.dataset.id;

    if (showSpecs === _id) {
      setShowSpecs(null);
    } else {
      setShowSpecs(_id);
    }
  }

  const addPhoto = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;

    console.log('start of upload');
    setLoading(true);

    if (imageAsFile === '') {
      setLoading(false);
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
      return;
    };

    let randomizer = (Math.floor(Math.random() * (1000 - 1)) + 1).toString();
    let split = imageAsFile.name.split('.');
    const filename = split[0] + randomizer + split[1];

    const uploadTask = storage.ref(`/products/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('products').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let images = products.filter(product => product._id === _id)[0].images;
          images.push({ filename, fireBaseUrl });

          Axios
            .put(`/api/products/${_id}`, { images })
            .then(response => {
              getProducts(_id, true);
              setImageAsFile('');
              setLoading(false);
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById(`form-add-photo-${_id}`).reset();
  }

  const nextPhoto = (e) => {
    let _id = e.target.dataset.id;
    let copy = { ...indexes };
    let images = products.filter(product => product._id === _id)[0].images;

    if (copy[_id] < images.length - 1) {
      copy[_id]++;
      setIndexes(copy);
    }
  }

  const previousPhoto = (e) => {
    let _id = e.target.dataset.id;
    let copy = { ...indexes };

    if (copy[_id] > 0) {
      copy[_id]--;
      setIndexes(copy);
    }
  }

  const deletePhoto = (e) => {
    let _id = e.target.dataset.id;
    let copy = { ...indexes };
    let images = products.filter(product => product._id === _id)[0].images;
    let index = copy[_id];
    if (index === images.length - 1 && index > 0) {
      copy[_id] = index - 1;
      setIndexes(copy);
    }
    let filename = images[index].filename;
    images.splice(index, 1);

    Axios
      .put(`/api/products/${_id}`, { images })
      .then(response => {
        getProducts();

        storage.ref('products').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  const addDownload = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const index = e.target.dataset.index;
    const title = e.target.title.value;

    setLoading(true);

    console.log('start of upload');

    if (imageAsFile === '') {
      setLoading(false);
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
      return;
    };

    let randomizer = (Math.floor(Math.random() * (1000 - 1)) + 1).toString();
    let split = imageAsFile.name.split('.');
    const filename = split[0] + randomizer + split[1];

    const uploadTask = storage.ref(`/products/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('products').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let downloads = products[index].downloads;
          downloads.push({ title, fireBaseUrl, filename });

          Axios
            .put(`/api/products/${_id}`, { downloads })
            .then(response => {
              getProducts();
              setShowDownloads(_id);
              setImageAsFile('');
              setLoading(false);
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById(`form-downloads-${_id}`).reset();
  }

  const showDownloadsHandler = (e) => {
    let _id = e.target.dataset.id;

    if (showDownloads === _id) {
      setShowDownloads(null);
    } else {
      setShowDownloads(_id);
    }
  }

  const deleteDownload = (e) => {
    let _id = e.target.dataset.id;
    let index = parseInt(e.target.dataset.index);
    let prodIndex = parseInt(e.target.dataset.prodindex);
    let downloads = products[prodIndex].downloads;
    let filename = downloads[index].filename;

    downloads.splice(index, 1);

    Axios
      .put(`/api/products/${_id}`, { downloads })
      .then(response => {

        getProducts();

        storage.ref('products').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  const changeCategory = (e) => {
    let category = e.target.value;
    if (category === "All categories") {
      setSortedProducts(products);
    } else {
      let sorted = products.filter(product => product.category === category);
      setSortedProducts(sorted);
    }
  }

  return (
    <div>
      <AdminHeader toolbarHandler={props.toolbarHandler} showToolbar={props.showToolbar} logout={logout} />
      {
        !admin ? <LoadingScreen /> :
          <div className="page-admin">
            <h2>Products Manager</h2>
            <div className={loading ? "container-loader" : "container-loader hidden"}>
              <PulseLoader
                size={30}
                color={"#363636"}
                loading={loading}
              />
            </div>
            <form id="form-products" className="form-admin" onSubmit={handleFireBaseUpload}>
              <h4>Create new item</h4>
              <input className="input-products" style={{ "width": "80%" }} type="text" name="name" placeholder="Product Name" />
              <textarea className="input-products" style={{ "width": "80%", "height": "calc(30px + 8vw)" }} name="description" placeholder="Description" />
              <div className="input-products row" style={{ "width": "80%" }}>
                <input className="input-products" style={{ "width": "40%", "justifySelf": "flex-start", "marginLeft": "0", "marginRight": "auto" }} type="text" name="prodId" placeholder="Product ID" />
                <input className="input-products flex-end-horizontal" name="category" style={{ "width": "40%" }} type="text" list="categories" placeholder="Category"></input>
                <datalist className="input-products" id="categories">
                  {
                    Object.keys(categories).map(category => {
                      return (
                        <option>{category}</option>
                      )
                    })
                  }
                </datalist>
              </div>
              <div className="input-products row" style={{ "flexWrap": "wrap", "width": "80%", "marginBottom": "40px" }}>
                <input
                  className="input-file"
                  style={{ "marginBottom": "10px" }}
                  type="file"
                  onChange={handleImageAsFile}
                />
                <button className="button-products-submit">Upload Product</button>
              </div>
            </form>
            <select id="selector-category" onChange={changeCategory}>
              <option>All categories</option>
              {
                Object.keys(categories).map(category => {
                  return (
                    <option>
                      {category}
                    </option>
                  )
                })
              }
            </select>
            {sortedProducts.length ?
              sortedProducts.map((product, index) => {
                return (
                  <div className="row-products">
                    <div className="container-image-manager">
                      <div className="container-image-products">
                        <img className="image-products" src={product.images.length ? product.images[indexes[product._id]].fireBaseUrl : "/placeholder-image.png"} alt="product"></img>
                      </div>
                      <form className="form-edit-photos row" data-id={product._id} id={`form-add-photo-${product._id}`} onSubmit={addPhoto}>
                        <input
                          className="button-edit-photos"
                          type="file"
                          onChange={handleImageAsFile}
                        />
                        <button className="button-edit-photos flex-end-horizontal" style={{ "width": "30%" }} type="submit">Add Photo</button>
                      </form>
                      <div className="row" style={{ "marginBottom": "20px" }}>
                        <button className="button-edit-photos" data-id={product._id} onClick={previousPhoto} style={{ "marginRight": "10px" }}>Previous</button>
                        <button className="button-edit-photos" data-id={product._id} onClick={nextPhoto}>Next</button>
                        <span className="text-small" style={{ "justifySelf": "center", "margin": "0 auto" }}>{product.images.length ? (indexes[product._id] + 1) + '/' + product.images.length + ' images' : '0/0 images'}</span>
                        {
                          product.images.length ?
                            <button className="button-edit-photos flex-end-horizontal" data-id={product._id} onClick={deletePhoto}>Delete</button> : null
                        }
                      </div>
                    </div>
                    <div className="container-details">
                      <div className="details-products">
                        <p><b>Product Name: </b>{product.name}</p>
                        <p><b>Product ID: </b>{product.prodId}</p>
                        <p><b>Description: </b>{product.description}</p>
                        <p><b>Category: </b>{product.category}</p>
                        <div style={{ "display": "flex" }}>
                          <div style={{ "margin": "0 0 20px auto", "alignSelf": "flexEnd" }}>
                            <button className="button-edit-photos" data-id={product._id} onClick={showEditHandler} style={{ "marginRight": "10px" }}>Edit</button>
                            <button className="button-edit-photos" data-id={product._id} onClick={deleteHandler}>Delete</button>
                          </div>
                        </div>
                        {
                          showEdit === product._id ?
                            <form id={`form-products-edit-${product._id}`} data-id={product._id} onSubmit={editProductHandler} style={{ "display": "flex", "flexDirection": "column" }}>
                              <input className="input-edit-product" style={{ "marginBottom": "10px" }} type="text" name="name" placeholder="Product Name" />
                              <input className="input-edit-product" style={{ "marginBottom": "10px" }} type="text" name="prodId" placeholder="Product ID" />
                              <textarea className="input-edit-product" style={{ "marginBottom": "10px", "height": "calc(30px + 8vw)", "fontFamily": "Arial" }} name="description" placeholder="Description" />
                              <input className="input-edit-product" style={{ "marginBottom": "10px" }} name="category" type="text" list="categories" placeholder="Category"></input>
                              <datalist id="categories">
                                {
                                  Object.keys(categories).map(category => {
                                    return (
                                      <option>{category}</option>
                                    )
                                  })
                                }
                              </datalist>
                              <button className="button-edit-photos" type="submit" style={{ "margin": "0 0 20px auto", "alignSelf": "flexEnd" }}>Submit Changes</button>
                            </form> :
                            null
                        }
                      </div>
                      <div className="details-products">
                        <div style={{ "marginBottom": "10px", "display": "flex" }}>
                          <p>
                            <b>Features: </b>{product.features.length === 1 ? '1 feature' : product.features.length + ' features'}
                          </p>
                          <div style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto" }}>
                            {
                              showFeatures !== product._id && product.features.length ?
                                <button className="button-edit-photos" data-id={product._id} onClick={showFeaturesHandler}>Show</button> : null
                            }
                            {
                              showFeatures === product._id && product.features.length ?
                                <button className="button-edit-photos" data-id={product._id} onClick={showFeaturesHandler} style={{ "marginLeft": "10px" }}>Hide</button> : null
                            }
                          </div>
                        </div>
                        {product.features.length && showFeatures === product._id ?
                          <ul style={{ "marginTop": "0" }}>
                            {
                              product.features.map((feature, index) => {
                                return (
                                  <div className="input-products" style={{ "display": "flex", "marginBottom": "10px" }}>
                                    <li className="input-products" style={{ "width": "80%" }}>{feature}</li>
                                    <button className="button-edit-photos flex-end-horizontal" data-id={product._id} data-index={index} onClick={deleteFeature}>Delete</button>
                                  </div>
                                )
                              })
                            }
                          </ul> : null
                        }
                        {
                          product.features.length === 0 || showFeatures === product._id ?
                            <form id={`form-features-${product._id}`} onSubmit={addFeature} data-id={product._id} style={{ "display": "flex", "width": "100%", "marginBottom": "10px", "marginTop": "10px" }}>
                              <input className="input-products" style={{ "width": "80%", "justifySelf": "flex-start", "margin": "0 auto 0 0" }} type="text" name="feature" placeholder="Feature" required></input>
                              <button className="button-edit-photos flex-end-horizontal" type="submit">Add</button>
                            </form> : null
                        }
                        <div style={{ "marginBottom": "10px", "marginTop": "10px", "display": "flex" }}>
                          <p>
                            <b>Specs: </b>{product.specs.length === 1 ? '1 spec' : product.specs.length + ' specs'}
                          </p>
                          <div style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto" }}>
                            {
                              showSpecs !== product._id && product.specs.length ?
                                <button className="button-edit-photos flex-end-horizontal" data-id={product._id} onClick={showSpecsHandler}>Show</button> : null
                            }
                            {
                              showSpecs === product._id && product.specs.length ?
                                <button className="button-edit-photos flex-end-horizontal" data-id={product._id} onClick={showSpecsHandler} style={{ "marginLeft": "10px" }}>Hide</button> : null
                            }
                          </div>
                        </div>
                        {product.specs.length && showSpecs === product._id ?
                          <ul style={{ "marginTop": "0" }}>
                            {
                              product.specs.map((spec, index) => {
                                return (
                                  <div className="input-products" style={{ "display": "flex", "marginBottom": "10px" }}>
                                    <li className="input-products" style={{ "width": "80%" }}>{spec}</li>
                                    <button className="button-edit-photos flex-end-horizontal" data-id={product._id} data-index={index} onClick={deleteSpec}>Delete</button>
                                  </div>
                                )
                              })
                            }
                          </ul> : null
                        }
                        {
                          product.specs.length === 0 || showSpecs === product._id ?
                            <form id={`form-specs-${product._id}`} onSubmit={addSpec} data-id={product._id} style={{ "display": "flex", "width": "100%", "marginBottom": "20px", "marginTop": "10px" }}>
                              <input className="input-products" style={{ "width": "80%", "justifySelf": "flex-start", "margin": "0 auto 0 0" }} type="text" name="spec" placeholder="Spec" required></input>
                              <button className="button-edit-photos flex-end-horizontal" type="submit">Add</button>
                            </form> : null
                        }
                        <div style={{ "marginBottom": "10px", "marginTop": "10px", "display": "flex" }}>
                          <p>
                            <b>Downloads: </b>{product.downloads.length === 1 ? '1 download' : product.downloads.length + ' downloads'}
                          </p>
                          <div style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto" }}>
                            {
                              showDownloads !== product._id && product.downloads.length ?
                                <button className="button-edit-photos flex-end-horizontal" data-id={product._id} onClick={showDownloadsHandler}>Show</button> : null
                            }
                            {
                              showDownloads === product._id && product.downloads.length ?
                                <button className="button-edit-photos flex-end-horizontal" data-id={product._id} onClick={showDownloadsHandler} style={{ "marginLeft": "10px" }}>Hide</button> : null
                            }
                          </div>
                        </div>
                        {product.downloads.length && showDownloads === product._id ?
                          <ul style={{ "marginTop": "0" }}>
                            {
                              product.downloads.map((download, index) => {
                                return (
                                  <div style={{ "display": "flex", "marginBottom": "10px" }}>
                                    <li className="input-products" style={{ "width": "80%" }}>
                                      <a href={download.fireBaseUrl} target="_blank">
                                        {download.title}
                                      </a>
                                    </li>
                                    <button className="button-edit-photos flex-end-horizontal" data-id={product._id} data-index={index} data-prodindex={index} onClick={deleteDownload}>Delete</button>
                                  </div>
                                )
                              })
                            }
                          </ul> : null
                        }
                        {
                          product.downloads.length === 0 || showDownloads === product._id ?
                            <form id={`form-downloads-${product._id}`} data-id={product._id} data-index={index} className="column" onSubmit={addDownload} style={{ "display": "flex", "width": "100%", "marginBottom": "20px", "marginTop": "10px" }}>
                              <input className="input-products" style={{ "width": "80%", "justifySelf": "flex-start", "margin": "0 auto 10px 0" }} type="text" placeholder="Title" name="title" required />
                              <div className="row" style={{ "width": "100%" }}>
                                <input className="button-edit-photos" type="file" onChange={handleImageAsFile} style={{ "width": "60%", "justifySelf": "flex-start", "margin": "0 auto 0 0" }} />
                                <button className="button-edit-photos flex-end-horizontal" type="submit">Add</button>
                              </div>
                            </form> : null
                        }
                      </div>
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
      }
    </div>
  )
}

export default ProductManager;