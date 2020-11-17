import React, { useState, useEffect } from 'react';
import Router from 'next/router';

const Products = (props) => {

  const [categories, setCategories] = useState({});
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    setSortedProducts(props.products);

    let catcopy = { ...categories };
    props.products.forEach(product => {
      if (catcopy[product.category] === undefined) {
        catcopy[product.category] = 1;
      }
    })
    setCategories(catcopy);

  }, []);

  const viewProduct = (e) => {
    let _id = e.target.dataset.id;

    Router.push(`/products/${_id}`);
  }

  const changeCategory = (e) => {
    let category = e.target.value;
    if (category === "All categories") {
      setSortedProducts(products);
      setCurrentCategory(null);
    } else {
      let sorted = props.products.filter(product => product.category === category);
      setSortedProducts(sorted);
      setCurrentCategory(category)
    }
  }

  return (
    <div className="page-admin">
      <h2 className="buffer">{currentCategory === null ? "All Products" : currentCategory}</h2>
      {
        <select id="selector-category-client" onChange={changeCategory}>
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
      }
      <div className="grid">
        {
          sortedProducts.map((product, key) => {
            return (
              <div key={key} className="product-grid">
                <img className="image-grid" data-id={product._id} onClick={viewProduct} src={product.images.length ? product.images[0].fireBaseUrl : '/placeholder-image.png'} alt="product" />
                <div className="product-header-price">
                  <h4 data-id={product._id} onClick={viewProduct} className="product-name">{product.name}</h4>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products;

export async function getStaticProps() {
  let response = await model.getProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(response))
    },
    revalidate: 10
  }
}