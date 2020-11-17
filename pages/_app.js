import '../styles/globals.css'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../contexts/auth';

const MyApp = ({ Component, pageProps }) => {

  const [showToolbar, setShowToolbar] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, [])

  const toolbarHandler = () => {
    if (showToolbar) {
      setShowToolbar(false);
    } else {
      setShowToolbar(true);
    }
  }

  const scrollHandler = () => {
    setShowButton(false);

    let isScrolling;
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      setShowButton(true);
    }, 66);
  }

  return (
    <div>
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
          <Link href="/">
            <a onClick={() => toolbarHandler(false)} className="link dropdown">About</a>
          </Link>
          <Link href="/products">
            <a onClick={() => toolbarHandler(true)} className="link dropdown">Products</a>
          </Link>
          <Link href="/contact">
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
          scrollHandler={scrollHandler}
          showButton={showButton}
        />
      </AuthProvider>
    </div>
  )
}

export default MyApp
