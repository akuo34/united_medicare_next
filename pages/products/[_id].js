import Router from 'next/router';
import { useState } from 'react';
import Slider from 'react-slick';
import Head from 'next/head';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import model from '../../database/model.js';

const ProductDetails = (props) => {

  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState('modal-hidden');

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

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    initialSlide: 0,
  };

  return (
    <div className="page-admin">
      <Head>
        <title>Product Details | United Medi-Care Inc.</title>
      </Head>
      <div onClick={modalHandler} className={animation === "active" ? "modal active" : `modal ${animation}`} >
        <img onClick={modalHandler} className={animation === "active" ? "modal-image active" : `modal-image ${animation}`} src={props.product && props.product.images.length ? props.product.images[index].fireBaseUrl : '/placeholder-image.png'} alt="modal_image" />
        <div className={animation === "active" ? "modal-background" : `modal-background ${animation}`}></div>
      </div>
      <h2>Product Details</h2>
      <div className="row-about">
        <div className="column">
          <div className="container-image-about-admin" style={{ "alignSelf": "flexStart", "margin": "0 0 20px 0" }}>
            <img onClick={modalHandler} className="image-product" src={props.product && props.product.images.length ? props.product.images[index].fireBaseUrl : '/placeholder-image.png'} alt="product-view" />
          </div>
          {
            props.product && props.product.images.length > 1 ?
              <Slider {...settings} className="slider">
                {
                  props.product.images.map((image, key) => {
                    return (
                      <div key={key}>
                        <img data-index={key} onClick={selectPhoto} style={{ "height": "100%", "width": "100%", "cursor": "pointer" }} src={image.fireBaseUrl} alt="product_thumb" />
                      </div>
                    )
                  })
                }
              </Slider> : null
          }
        </div>
        <div className="column" style={{ "maxWidth": "90vw" }}>
          <p className="paragraph-about">
            <b>{props.product ? props.product.name : null}</b>
          </p>
          <p className="paragraph-about">
            <b>Product ID: </b>{props.product ? props.product.prodId : null}
          </p>
          <p className="paragraph-about" style={{ "display": "flex", "alignItems": "flexStart" }}>
            <b>Price: </b>
            <button className="button-see-products" onClick={toContact}>Get quotes</button>
          </p>
          <p className="paragraph-about">
            {props.product ? props.product.description : null}
          </p>
          {
            props.product && props.product.features.length ?
              <div>
                <p className="paragraph-about" style={{ "marginBottom": "0" }}>
                  <b>Features: </b>
                </p>
                <ul className="paragraph-about">
                  {
                    props.product ?
                      props.product.features.map((feature, key) => {
                        return (
                          <li key={key} style={{ "width": "80%" }}>
                            {feature}
                          </li>
                        )
                      }) : null
                  }
                </ul>
              </div> : null
          }
          {
            props.product && props.product.specs.length ?
              <div>
                <p className="paragraph-about" style={{ "marginBottom": "0" }}>
                  <b>Specifications: </b>
                </p>
                <ul className="paragraph-about">
                  {
                    props.product ?
                      props.product.specs.map((spec, key) => {
                        return (
                          <li key={key} style={{ "width": "80%" }}>
                            {spec}
                          </li>
                        )
                      }) : null
                  }
                </ul>
              </div> : null
          }
          {
            props.product && props.product.downloads.length ?
              <p className="paragraph-about" style={{ "marginBottom": "0" }}>
                <b>Downloads: </b>
              </p> : null
          }
          <ul className="paragraph-about">
            {
              props.product ?
                props.product.downloads.map((download, key) => {
                  return (
                    <li key={key} style={{ "width": "80%" }}>
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

export async function getStaticPaths() {
  const products = await model.getProducts();

  const paths = products.map(product => ({
    params: { _id: product._id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  let response = await model.getOneProduct(params._id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(response))
    },
    revalidate: 10
  }
}