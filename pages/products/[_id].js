import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const ProductDetails = () => {

  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState('modal-hidden');
  const router = useRouter();
  const { _id } = router.query;
  // console.log('here', _id );
  
  useEffect(() => {
    if (_id) {
      Axios
        .get(`/api/products/${_id}`)
        .then(response => {

          console.log('id', _id);
          console.log('here',response.data);
          setProduct(response.data);
        })
        .catch(err => console.error(err));
    }
  }, [_id])

  const modalHandler = (e) => {
    if (showModal) {
      setAnimation('fadeout');
      setAnimation('modal-hidden');
      setShowModal(false);
      document.body.style.overflow = "auto";
    } else {
      setAnimation('active');
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  }

  const toContact = () => {
    Router.push('/contact');
  }

  const selectPhoto = (e) => {
    let index = parseInt(e.target.dataset.index);

    setIndex(index);
  }

  return (
    <div className="page-admin">
      <div onClick={modalHandler} className={animation === "active" ? "modal active" : `modal ${animation}`} >
        <img onClick={modalHandler} className={animation === "active" ? "modal-image active" : `modal-image ${animation}`} src={product && product.images.length ? product.images[index].fireBaseUrl : '/placeholder-image.png'} alt="modal_image" />
        <div className={animation === "active" ? "modal-background" : `modal-background ${animation}`}></div>
      </div>
      <h2>Product Details</h2>
      <div className="row-about">
        <div className="column">
          <div className="container-image-about-admin" style={{ "alignSelf": "flexStart", "margin": "0 0 20px 0" }}>
            <img onClick={modalHandler} className="image-about" src={product && product.images.length ? product.images[index].fireBaseUrl : '/placeholder-image.png'} alt="product-view" />
          </div>
          <div className="row" style={{ "flexWrap": "wrap", "justifyContent": "spaceEvenly" }}>
            {
              product ?
                product.images.map((image, index) => {
                  return (
                    <div style={{ "height": "75px", "width": "75px", "margin": "0 auto 20px auto" }}>
                      <img data-index={index} onClick={selectPhoto} style={{ "height": "100%", "width": "100%", "objectFit": "cover" }} src={image.fireBaseUrl} alt="product_thumb" />
                    </div>
                  )
                }) : null
            }
          </div>
        </div>
        <div className="column" style={{ "maxWidth": "90vw" }}>
          <p className="paragraph-about">
            <b>{product ? product.name : null}</b>
          </p>
          <p className="paragraph-about">
            <b>Product ID: </b>{product ? product.prodId : null}
          </p>
          <p className="paragraph-about" style={{ "display": "flex", "alignItems": "flexStart" }}>
            <b>Price: </b>
            <button className="button-see-products" onClick={toContact}>Email for pricing</button>
          </p>
          <p className="paragraph-about">
            {product ? product.description : null}
          </p>
          <p className="paragraph-about" style={{ "marginBottom": "0" }}>
            <b>Features: </b>
          </p>
          <ul className="paragraph-about">
            {
              product ?
                product.features.map(feature => {
                  return (
                    <li style={{ "width": "80%" }}>
                      {feature}
                    </li>
                  )
                }) : null
            }
          </ul>
          <p className="paragraph-about" style={{ "marginBottom": "0" }}>
            <b>Specifications: </b>
          </p>
          <ul className="paragraph-about">
            {
              product ?
                product.specs.map(spec => {
                  return (
                    <li style={{ "width": "80%" }}>
                      {spec}
                    </li>
                  )
                }) : null
            }
          </ul>
          {
            product && product.downloads.length ?
              <p className="paragraph-about" style={{ "marginBottom": "0" }}>
                <b>Downloads: </b>
              </p> : null
          }
          <ul className="paragraph-about">
            {
              product ?
                product.downloads.map(download => {
                  return (
                    <li style={{ "width": "80%" }}>
                      <a href={download.fireBaseUrl} target="_blank">{download.title}</a>
                    </li>
                  )
                }) : null
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;