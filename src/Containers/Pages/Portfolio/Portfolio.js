import React, { useState, useEffect } from "react";
import { wpInstance } from "../../Axios/Axios";

import style from "./Portfolio.module.css";

const Portfolio = props => {
  const [pageData, setPageData] = useState();
  const [pageDataLoaded, setPageDataLoaded] = useState(false);

  const [portfolioData, setPortfolioData] = useState();
  const [portfolioDataLoaded, setPortfolioDataLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("In useEffect");
    if (!pageDataLoaded) getPageData();
    console.log(pageData);
  });

  const getPageData = () => {
    //Gets the page with id 6 (the "Portfolio" page) and stores in state
    wpInstance
      .get("/wp/v2/pages/25")
      .then(res => {
        setPageData(res.data);
        setPageDataLoaded(true);
      })

      //If an error occurs, saves the error message in state and sets hasError to true
      .catch(err => {
        setErrorMessage(err.message);
        setHasError(true);
      });
  };

  let renderPage = null;
  if (pageDataLoaded) {
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;

    renderPage = (
      <div className={style.Portfolio}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  const renderLoading = (
    <React.Fragment>
      <h3>Loading...</h3>
      <small>{errorMessage}</small>
    </React.Fragment>
  );

  if (renderPage) return renderPage;
  else if (hasError) return <p>Error</p>;
  else return renderLoading;
};

export default Portfolio;
