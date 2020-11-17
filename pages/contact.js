import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Contact = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    Axios
      .get('/api/about')
      .then(response => setAbout(response.data))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className="page-admin">
      <h2>Contact Us</h2>
      {
        about.length ?
        <div className="container-contact">
          <img className="icon-contact" src="./phone_icon.svg" alt="phone" />
          <span>{"(" + about[0].phone.substr(0, 3) + ") " + about[0].phone.substr(4)}</span>
          <img className="icon-contact" src="./email_icon.svg" alt="email" />
          <span>{about[0].email}</span>
        </div> : null
      }
    </div>
  )
}

export default Contact;