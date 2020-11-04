import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Home() {

  const [about, setAbout] = useState(null);

  useEffect(() => {
    Axios
      .get('http://52.8.24.75:3000/api/about')
      .then(response => setAbout(response.data[0]))
      .catch(err => console.error(err));

  }, []);

  return (
    <div className="page-admin">
      <h2>About the company</h2>
      <div className="row-about">
          { about && about.images.length ?
        <div className="column-about">
          { about && about.images.length ?
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
        </div> : null
          }
        <p className="paragraph-about" style={{ "lineHeight": "26px" }}>
          {
            about ?
              about.about : null
          }
        </p>
      </div>
    </div>
  );
}
