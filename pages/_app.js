import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head';
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
      <Head>
        <title>United Medi-Care Inc.</title>
        <meta name="Description" content="United Medi-Care, Inc. was founded in 1989 as a wholesale distributor of emergency medical supplies and equipment to EMS providers, first responders, EMTs, and paramedics to include fire departments, hospitals, governmental agencies, schools, CPR instructors, as well as businesses. The company was reorganized in 2015 as a partnership entity and reincorporated again in 2020. Since 1989, United Medi-Care, Inc. has been an authorized distributor for many major brands. From everyday disposable items to extensive capital equipment, we offer products across all categories to include training manikins, laryngeal masks, laryngeal tubes, tube holders, resuscitators, CPR breathing barriers, AED, backboards, immobilizers, extrication collars, splints, slings, and tourniquets, wound dressing bandages, uterine manipulators etc. Our PPE categories includes N95 Respirators, Surgical N95 Respirators, Isolation Gowns, KN95 Masks, and Nitrile Gloves. We take pride in offering exceptional products at the most competitive resale prices. United Medi-Care, Inc. has everything you need to prepare yourself for most emergencies. United Medi-Care, Inc. also provides a full spectrum of services to manage our customer’s product sourcing or OEM manufacturing from Asia." />
      </Head>
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
