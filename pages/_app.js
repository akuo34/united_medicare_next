import '../styles/globals.css'
import Link from 'next/link'
import React, { useState } from 'react';
import { AuthProvider } from '../contexts/auth';

const MyApp = ({ Component, pageProps }) => {

  const [showToolbar, setShowToolbar] = useState(false);

  const toolbarHandler = () => {
    if (showToolbar) {
      setShowToolbar(false);
    } else {
      setShowToolbar(true);
    }
  }

  return (
    <div>
      <div className="container-page">
        <div className="toolbar-main">
          <div className="header-company">
            <Link href="http://52.8.24.75:3000">
              <a className="link trademark">United Medi-Care Inc.</a>
            </Link>
          </div>
          <div className="container-links">
            <Link href="http://52.8.24.75:3000">
              <a className="link">About</a>
            </Link>
            <Link href='http://52.8.24.75:3000/products'>
              <a className="link">Products</a>
            </Link>
            <Link href="http://52.8.24.75:3000/contact">
              <a className="link">Contact</a>
            </Link>
          </div>
          <img onClick={() => toolbarHandler(false)} className="hamburger" src="/hamburger_button_white.svg" alt="hamburger button" />
        </div>
        <div className={showToolbar ? "container-links-small-device" : "container-links-small-device hidden"}>
          <Link href="http://52.8.24.75:3000">
            <a onClick={() => toolbarHandler(false)} className="link dropdown">About</a>
          </Link>
          <Link href="http://52.8.24.75:3000/products">
            <a onClick={() => toolbarHandler(true)} className="link dropdown">Products</a>
          </Link>
          <Link href="http://52.8.24.75:3000/contact">
            <a onClick={() => toolbarHandler(false)} className="link dropdown">Contact</a>
          </Link>
        </div>
        <div style={{ "height": "10vh" }}>
        </div>
        <div onClick={() => toolbarHandler(false)} className={showToolbar ? "clickable-bg" : "clickable-bg-hidden"}>
        </div>
      </div>
      <AuthProvider>
        <Component {...pageProps}
          showToolbar={showToolbar}
          toolbarHandler={toolbarHandler}
        />
      </AuthProvider>
    </div>
  )
}

export default MyApp
