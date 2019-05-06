import React, { useState, useEffect } from "react";
import { wpInstance } from "../../Axios/Axios";
import Card from "../../../Components/Card/Card";

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
    if (!portfolioDataLoaded) getPortfolioData();
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

  const getPortfolioData = () => {
    //Gets all the posts and stores in state
    wpInstance
      .get("/wp/v2/portfolio/")
      .then(res => {
        setPortfolioData(res.data);
        setPortfolioDataLoaded(true);
      })

      //If an error occurs, saves the error message in state and sets hasError to true
      .catch(err => {
        setErrorMessage(err.message);
        setHasError(true);
      });
  };

  let renderPortfolios = null;
  if (portfolioDataLoaded & !hasError) {
    renderPortfolios = (
      <div>
        {portfolioData.map(post => {
          const title = post.title.rendered;
          const excerpt = post.excerpt.rendered;
          return (
            <Card
              textColor="#5681A0"
              key={post.id}
              linkURL={`/portfolio/${post.id}`}
            >
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            </Card>
          );
        })}
      </div>
    );
  }

  let renderPage = null;
  if (pageDataLoaded) {
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;

    renderPage = (
      <div className={style.Portfolio}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {renderPortfolios}
      </div>
    );
  }

  //If an error has occured while fetching, shows an error message
  const renderError = (
    <React.Fragment>
      <h3>Något gick fel, försök igen senare</h3>
      <small>{errorMessage}</small>
    </React.Fragment>
  );

  //While fetching is going on, shows a loding indicator
  const renderLoading = <h3>Laddar...</h3>;

  if (renderPage) return renderPage;
  else if (hasError) return renderError;
  else return renderLoading;
};

export default Portfolio;
