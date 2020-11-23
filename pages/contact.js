import model from '../database/model.js';
import { useState } from 'react';
import Axios from 'axios';
import Head from 'next/head';

const Contact = (props) => {

  const [animation, setAnimation] = useState('fadeout');
  const [response, setResponse] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    let name = e.target.name.value;
    let email = e.target.email.value;
    let subject = e.target.subject.value;
    let message = e.target.message.value;

    Axios
      .post('/api/contact/email', { name, email, subject, message })
      .then(response => {
        setResponse(response.data);
        setAnimation('active');
        setTimeout(() => {
          setAnimation('fadeout');

          setTimeout(() => {
            setResponse('');
          }, 500)
        }, 2000);
      })
      .catch(err => setResponse(response.data));

    document.getElementById('form-contact-client').reset();
  }

  return (
    <div className="page-admin">
      <Head>
        <title>Contact Us | United Medi-Care Inc.</title>
      </Head>
      <h2>Contact Us</h2>
      <div className="row-contact">
        {
          props.about ?
            <div className="container-contact">
              <a href={`tel:+1-${props.about.phone}`}>
                <img className="icon-contact" src="./phone_icon.svg" alt="phone" />
              </a>
              <a style={{ "textDecoration": "none", "color": "inherit" }} href={`tel:+1-${props.about.phone}`}>
                {"(" + props.about.phone.substr(0, 3) + ") " + props.about.phone.substr(4)}
              </a>
              <a href={`mailto:${props.about.email}`}>
                <img className="icon-contact" src="./email_icon.svg" alt="email" />
              </a>
              <a style={{ "textDecoration": "none", "color": "inherit" }} href={`mailto:${props.about.email}`}>
                {props.about.email}
              </a>
            </div> : null
        }
        <div style={{ "margin": "0 auto", "display": "flex", "flexDirection": "column" }}>
          <form id="form-contact-client" className="form-contact-client" onSubmit={submitForm}>
            <h4 className="header-contact">Send us an email</h4>
            <input required className="input-contact" name="name" placeholder="Your name"></input>
            <input required className="input-contact" name="email" type="email" placeholder="Your email"></input>
            <input required className="input-contact" name="subject" placeholder="Subject"></input>
            <textarea required className="input-contact" style={{ "height": "calc(70px + 2vw)" }} name="message" placeholder="Your message"></textarea>
            <button className="button-contact" type="submit">Send message</button>
          </form>
          <h4 style={{ "margin": "20px auto", "fontSize": "16px", "transition": "all 0.35s ease", "height": "16px" }} className={animation}>{response}</h4>
        </div>
      </div>
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