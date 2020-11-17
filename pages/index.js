import model from '../database/model.js';

export default function Home(props) {

  return (
    <div className="page-admin">
      <h2>About the Company</h2>
      <div className="row-about">
        {
          props.about && props.about.images.length ?
            <div className="column-about">
              {
                props.about.images.map((image, key) => {
                  return (
                    <div key={key} className="container-image-about">
                      <img className="image-about" src={image.fireBaseUrl} alt="about" />
                    </div>
                  )
                })

              }
            </div> : null
        }
        {
          props.about && props.about.about ?
            <p className="paragraph-about" style={{ "lineHeight": "26px" }}>
              {props.about.about}
            </p> : null
        }
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let response = await model.getAbout();

  return {
    props: {
      about: response.length ? JSON.parse(JSON.stringify(response[0])) : null
    },
    revalidate: 10
  }
}