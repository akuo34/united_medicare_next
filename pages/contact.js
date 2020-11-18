// import React, { useState } from 'react';
// import Axios from 'axios';
import model from '../database/model.js';

const Contact = (props) => {
  // const [about, setAbout] = useState([]);

  // useEffect(() => {
  //   Axios
  //     .get('/api/about')
  //     .then(response => setAbout(response.data))
  //     .catch(err => console.error(err));
  // }, [])

  return (
    <div className="page-admin">
      <h2>Contact Us</h2>
      {
        props.about ?
        <div className="container-contact">
          <img className="icon-contact" src="./phone_icon.svg" alt="phone" />
          <span>{"(" + props.about.phone.substr(0, 3) + ") " + props.about.phone.substr(4)}</span>
          <img className="icon-contact" src="./email_icon.svg" alt="email" />
          <span>{props.about.email}</span>
        </div> : null
      }
    </div>
  )
}

export default Contact;

export async function getStaticProps() {
  let response = await model.getAbout();

  if (response.length) {
    return {
      props: {
        about: JSON.parse(JSON.stringify(response[0]))
      },
      revalidate: 10
    }
  } else {
    return {
      props: {

      }
    }
  }
}