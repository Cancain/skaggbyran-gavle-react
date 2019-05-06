import React, { useState, useEffect } from "react";
import Link from "../../../../Components/UI/RouterLink/RouterLink";

import { wpInstance } from "../../../Axios/Axios";

const SinglePortfolio = props => {
  const [portfolio, setPortfolio] = useState();
  const [portfolioLoaded, setPortfolioLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  const [images, setImages] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgHasError, setImgHasError] = useState(false);
  const [imgError, setImgError] = useState();

  useEffect(() => {
    if (!portfolioLoaded) getPortfolio();
    if (!imgLoaded) getImages();
  });

  const getPortfolio = () => {
    const postId = props.match.params.id;
    wpInstance
      .get(`/wp/v2/portfolio/${postId}`)
      .then(res => {
        setPortfolio(res.data);
        setPortfolioLoaded(true);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setHasError(true);
      });
  };

  const getImages = () => {
    const postId = props.match.params.id;
    wpInstance
      .get(`/wp/v2/media?parent=${postId}`)
      .then(res => {
        setImages(res.data);
        setImgLoaded(true);
      })
      .catch(err => {
        setImgHasError(true);
        setImgError(err.message);
      });
  };

  const fillImageArray = () => {
    let img = [];
    images.forEach(image => {
      const imgURL = image.source_url;
      const title = image.title.rendered;
      const id = image.id;
      img.push(<img key={id} src={imgURL} alt={title} />);
    });
    return img;
  };

  const renderImgError = (
    <div style={{ border: "1px solid black", borderRadius: "7px" }}>
      <p>Bild kunde tyvärr inte laddas</p>
      <small>{imgError}</small>
    </div>
  );

  let renderImages = [];
  if (imgLoaded) renderImages = fillImageArray();
  else if (imgHasError) renderImages = [renderImgError];

  let renderPortfolio = null;
  if (portfolioLoaded) {
    const title = portfolio.title.rendered;
    const content = portfolio.content.rendered;
    console.log(portfolio);
    renderPortfolio = (
      <div>
        <h1>{title}</h1>
        {renderImages}
        {console.log(renderImages)}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link
          to="/portfolio"
          text="Tillbaka"
          color="white"
          fontSize="1.3rem"
          isButton
        />
      </div>
    );
  }

  const renderError = (
    <React.Fragment>
      <h3>Något gick fel, försök igen senare</h3>
      <small>{errorMessage}</small>
    </React.Fragment>
  );

  const renderLoading = <h3>Laddar...</h3>;

  //Final rendering
  if (renderPortfolio) return renderPortfolio;
  else if (hasError) return renderError;
  else return renderLoading;
};

export default SinglePortfolio;
