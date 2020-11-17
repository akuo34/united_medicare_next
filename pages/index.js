import model from '../database/model.js';

export default function Home() {

  return (
    <div className="page-admin">
      <h2>About the company</h2>
      <div className="row-about">
        {
          props.about && props.about.images.length ?
            <div className="column-about">
              {
                props.about.images.map(image => {
                  return (
                    <div className="container-image-about">
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
      about: JSON.parse(JSON.stringify(response[0]))
    },
    revalidate: 10
  }
}