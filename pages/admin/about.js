import React, { useState, useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import Axios from 'axios';
import AdminHeader from '../../components/adminHeader';
import LoadingScreen from '../../components/loadingScreen';
import { storage } from '../../firebase/firebase';
import { useAuth } from '../../contexts/auth';

const AboutManager = (props) => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [about, setAbout] = useState({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { logout, admin } = useAuth();

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = () => {
    Axios
      .get('/api/about')
      .then(response => {
        if (response.data.length && index > response.data[0].images.length - 1 && index > 0) {
          setIndex(index - 1);
        }

        if (response.data.length) {
          setAbout(response.data[0])
        } else {
          setAbout({});
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

    const about = e.target.about.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;

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

    const uploadTask = storage.ref(`/about/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let images = [{ fireBaseUrl, filename }];
          let request = { images, about, phone, email };

          Axios
            .post('/api/about', request)
            .then(response => {
              getAbout();
              setImageAsFile('');
              setLoading(false);
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-about').reset();
  };

  const addPhoto = (e) => {
    e.preventDefault();

    const _id = about._id;

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

    const uploadTask = storage.ref(`/about/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          let images = about.images;
          images.push({ filename, fireBaseUrl });

          Axios
            .put(`/api/about/${_id}`, { images })
            .then(response => {
              getAbout();
              setImageAsFile('');
              setLoading(false);
              setIndex(about.images.length - 1);
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-about-add-photo').reset();
  }

  const nextPhoto = () => {
    let images = about.images;

    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  }

  const previousPhoto = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const deletePhoto = (e) => {
    let _id = about._id;
    let images = about.images;
    let filename = images[index].filename;
    images.splice(index, 1);

    Axios
      .put(`/api/about/${_id}`, { images })
      .then(response => {
        getAbout();

        storage.ref('about').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  const editAboutHandler = (e) => {
    e.preventDefault();
    let _id = about._id;
    let bio = e.target.about.value;
    let phone = e.target.phone.value;
    let email = e.target.email.value;

    let request = { about: bio, phone, email };

    for (let key in request) {
      if (request[key] === '') {
        delete request[key];
      }
    }

    Axios
      .put(`/api/about/${_id}`, request)
      .then(response => {
        getAbout();
      })
      .catch(err => console.error(err))

    document.getElementById('form-about-edit').reset();
  }

  const deleteHandler = () => {
    let _id = about._id;

    Axios
      .delete(`/api/about/${_id}`)
      .then(response => {

        about.images.forEach(image => {
          storage.ref('about').child(image.filename).delete()
            .then(() => console.log('deleted from firebase'))
            .catch(err => console.error(err));
        })

        getAbout()
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <AdminHeader toolbarHandler={props.toolbarHandler} showToolbar={props.showToolbar} logout={logout} />
      {
        !admin ? <LoadingScreen /> :
          <div className="page-admin">
            <h2>About Manager</h2>
            <div className={loading ? "container-loader" : "container-loader hidden"}>
              <PulseLoader
                size={30}
                color={"#363636"}
                loading={loading}
              />
            </div>
            {
              Object.keys(about).length === 0 ?
                <form id="form-about" className="form-admin" onSubmit={handleFireBaseUpload}>
                  <h4>Create new profile</h4>
                  <textarea className="input-products" name="about" placeholder="About" style={{ "height": "100px" }} />
                  <input className="input-products" type="email" name="email" placeholder="johndorian123@gmail.com"></input>
                  <input className="input-products" type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX"></input>
                  <div className="input-products row" style={{ "flexWrap": "wrap" }}>
                    <input
                      style={{ "marginBottom": "10px" }}
                      type="file"
                      onChange={handleImageAsFile}
                    />
                    <button style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto", "height": "21px" }}>Upload Photo</button>
                  </div>
                </form>
                :
                <div className="row-about">
                  <div className="column" style={{ "maxWidth": "90vw" }}>
                    <div className="container-image-about-admin">
                      <img className="image-about" src={about.images.length ? about.images[index].fireBaseUrl : "/placeholder-image.png"} alt="about"></img>
                    </div>
                    <form id="form-about-add-photo" onSubmit={addPhoto} className="row">
                      <input
                        style={{ "marginBottom": "10px", "width": "70%" }}
                        type="file"
                        onChange={handleImageAsFile}
                      />
                      <button type="submit" style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto", "height": "21px" }}>Add Photo</button>
                    </form>
                    <div className="row" style={{ "marginBottom": "20px" }}>
                      <button onClick={previousPhoto} style={{ "marginRight": "10px" }}>Previous</button>
                      <button onClick={nextPhoto}>Next</button>
                      <span style={{ "justifySelf": "center", "margin": "0 auto" }}>{about.images.length ? (index + 1) + '/' + about.images.length + ' images' : '0/0 images'}</span>
                      {
                        about.images.length ?
                          <button onClick={deletePhoto} style={{ "justifySelf": "flexEnd", "margin": "0 0 0 auto" }}>Delete</button> : null
                      }
                    </div>
                  </div>
                  <div className="column">
                    <p className="paragraph-about-admin">
                      <b>About: </b>{about.about}
                    </p>
                    <p><b>Email: </b>{about.email}</p>
                    <p><b>Phone: </b>{about.phone}</p>
                    <form id="form-about-edit" onSubmit={editAboutHandler} style={{ "display": "flex", "flexDirection": "column" }}>
                      <textarea style={{ "marginBottom": "10px", "height": "100px", "fontFamily": "Arial" }} name="about" placeholder="About" />
                      <input style={{ "marginBottom": "10px" }} type="email" name="email" placeholder="johndorian123@gmail.com"></input>
                      <input style={{ "marginBottom": "10px" }} type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX"></input>
                      <button style={{ "margin": "0 0 10px auto", "alignSelf": "flexEnd" }} type="submit">Submit Changes</button>
                    </form>
                    <button style={{ "margin": "0 0 20px auto" }} onClick={deleteHandler}>Delete</button>
                  </div>
                </div>
            }
          </div>
      }
    </div>
  )
}

export default AboutManager;