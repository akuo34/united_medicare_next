import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import styles from '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import Link from 'next/link'

export default function Home() {

  const [about, setAbout] = useState(null);

  useEffect(() => {
    Axios
      .get('/admin/api/about')
      .then(response => setAbout(response.data[0]))
      .catch(err => console.error(err));

  }, []);

  // const refreshProducts = () => {
  //   window.location = '/products';
  // }

  return (
    <div className="page-admin">
    <h2>About the company</h2>
    <div className="row-about">
      <div className="column">
        {
          about ?
          about.images.map(image => {
            return (
              <div className="container-image-about">
                {
                  about ?
                    <img className="image-about" src={image.fireBaseUrl} alt="about" /> : null
                }
              </div>
            )
          }) : null
        }
      </div>
      <p className="paragraph-about" style={{ "lineHeight": "26px" }}>
        {
          about ?
            about.about : null
        }
      </p>
    </div>
  </div>
  );





  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Create Next App</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
  //       <h1 className={styles.title}>
  //         Learn <a href="https://nextjs.org">Next.js!</a>
  //       </h1>

  //       <p className={styles.description}>
  //         Get started by editing{' '}
  //         <code className={styles.code}>pages/index.js</code>
  //       </p>

  //       <div className={styles.grid}>
  //         <a href="https://nextjs.org/docs" className={styles.card}>
  //           <h3>Documentation &rarr;</h3>
  //           <p>Find in-depth information about Next.js features and API.</p>
  //         </a>

  //         <a href="https://nextjs.org/learn" className={styles.card}>
  //           <h3>Learn &rarr;</h3>
  //           <p>Learn about Next.js in an interactive course with quizzes!</p>
  //         </a>

  //         <a
  //           href="https://github.com/vercel/next.js/tree/master/examples"
  //           className={styles.card}
  //         >
  //           <h3>Examples &rarr;</h3>
  //           <p>Discover and deploy boilerplate example Next.js projects.</p>
  //         </a>

  //         <a
  //           href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //           className={styles.card}
  //         >
  //           <h3>Deploy &rarr;</h3>
  //           <p>
  //             Instantly deploy your Next.js site to a public URL with Vercel.
  //           </p>
  //         </a>
  //       </div>
  //     </main>

  //     <footer className={styles.footer}>
  //       <a
  //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Powered by{' '}
  //         <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
  //       </a>
  //     </footer>
  //   </div>
  // )
}
