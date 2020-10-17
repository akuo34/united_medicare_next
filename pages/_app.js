import '../styles/globals.css'
import Link from 'next/link'
import React, { useState } from 'react';

const MyApp = ({ Component, pageProps }) => {

  const [showToolbar, setShowToolbar] = useState(false);

  const toolbarHandler = (products) => {
    if (products) {
      window.location = '/products';
    }
    if (showToolbar) {
      setShowToolbar(false);
    } else {
      setShowToolbar(true);
    }
  }

  return (
    <div>
      <div className="App">
        <div className="container-page">
          <div className="toolbar-main">
            <div className="header-company">
              <Link href="/">
                <a className="link trademark">United Medi-Care Inc.</a>
              </Link>
            </div>
            <div className="container-links">
              <Link href="/">
                <a className="link">About</a>
              </Link>
              {/* <Link className="link" onClick={refreshProducts} href='/products'>Products</Link> */}
              <Link href='/products'>
                <a className="link">Products</a>
              </Link>
              <Link href="/contact">
                <a className="link">Contact</a>
              </Link>
            </div>
            <img onClick={() => toolbarHandler(false)} className="hamburger" src="/hamburger_button_white.svg" alt="hamburger button" />
          </div>
          <div className={showToolbar ? "container-links-small-device" : "container-links-small-device hidden"}>
            <Link onClick={() => toolbarHandler(false)} href="/">
              <a className="link dropdown">About</a>
            </Link>
            <Link onClick={() => toolbarHandler(true)} href="/products">
              <a className="link dropdown">Products</a>
            </Link>
            <Link onClick={() => toolbarHandler(false)} href="/contact">
              <a className="link dropdown">Contact</a>
            </Link>
          </div>
          <div style={{ "height": "10vh" }}>
          </div>
          <div onClick={() => toolbarHandler(false)} className={showToolbar ? "clickable-bg" : "clickable-bg-hidden"}>
          </div>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
