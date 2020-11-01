import Link from 'next/link';

const Admin = () => {
  return <Link href='/admin/login'><a>Login</a></Link>
}

export default Admin;


// import React, { useState, useEffect } from 'react';
// // import {
// //   BrowserRouter as Router,
// //   Switch,
// //   Route,
// //   // Link
// // } from "react-router-dom";
// import Link from 'next/link'
// import Axios from 'axios';

// import Login from '../../components/Login';
// // import Products from '../products';
// import ProductManager from '../../components/Products';
// // import AboutManager from './AboutManager';

// // const Admin = ({ Component, pageProps }) => {
// const Admin = (props) => {
    
//   // const [user, setUser] = useState(null);
//   const [showToolbar, setShowToolbar] = useState(false);

//   useEffect(() => {
//     Axios
//       .get('http://localhost:9000/read-cookie')
//       .then(response => {
//         console.log(response.data);
//         props.setUser(response.data.screen)
//       })
//       .catch(err => console.error(err));

//   }, []);

//   const auth = (username, password) => {
//     Axios
//       .get('http://localhost:9000/authenticate', { auth: { username, password } })
//       // .get('/authenticate', { auth: { username, password } })
//       .then(response => {
//         console.log(response.data)
//         props.setUser(response.data.screen)
//       })
//       .catch(err => {
//         alert('incorrect login');
//         console.error(err)
//       });
//   };

//   const signInHandler = (e) => {
//     e.preventDefault();

//     const email = e.target.login.value;
//     const password = e.target.password.value;

//     auth(email, password);

//     document.getElementById('form-login').reset();
//   };

//   const toolbarHandler = () => {
//     if (showToolbar) {
//       setShowToolbar(false);
//     } else {
//       setShowToolbar(true);
//     }
//   }

//   const returnHome = () => {
//     window.location = '/';
//   }

//   const logout = () => {
//     Axios
//       .get('http://localhost:9000/clear-cookie')
//       .then(() => {
//         // eslint-disable-next-line no-restricted-globals
//         location.reload();
//         console.log('logged out as admin')
//       })
//       .catch(err => console.error(err));
//   }

//   return (
//     <div>
//       <h3>Admin Console</h3>
//       {
//         props.user === 'admin' ?
//           <div>
//             {/* <Router> */}
//               <div className="container-page">
//                 <div className="toolbar-main admin">
//                   <div className="header-company">
//                     <span onClick={returnHome} className="link trademark">United Medi-Care Inc.</span>
//                   </div>
//                   <div className="container-links">
//                     <Link href="/admin/about">
//                       <a className="link">About</a>
//                     </Link>
//                     <Link href="/admin">
//                       <a className="link">Products</a>
//                     </Link>
//                     <span onClick={logout} className="link">Logout</span>
//                   </div>
//                   <img onClick={toolbarHandler} className="hamburger" src="/hamburger_button_white.svg" alt="hamburger button" />
//                 </div>
//                 <div className={showToolbar ? "container-links-small-device" : "container-links-small-device hidden"}>
//                   <Link onClick={toolbarHandler} className="link dropdown" href="/admin/about">About</Link>
//                   <Link onClick={toolbarHandler} className="link dropdown" href="/admin">Products</Link>
//                   <span onClick={logout} className="link dropdown">Log out</span>
//                 </div>
//                 <ProductManager /> 
//               </div>
//           </div>
//           :
//           props.user === 'auth' ?
//             <Login signInHandler={signInHandler} /> : null
//       }
//     </div>
//   )
// }

// export default Admin;