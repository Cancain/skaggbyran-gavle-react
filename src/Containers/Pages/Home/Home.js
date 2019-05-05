import React, { useEffect, useState } from "react";
import { wpInstance } from "../../Axios/Axios";

import Card from "../../../Components/Card/Card";

import style from "./Home.module.css";

const Home = props => {
  const [pageData, setPageData] = useState();
  const [pageDataLoaded, setPageDataLoaded] = useState(false);

  const [postData, setPostData] = useState();
  const [postDataLoaded, setPostDataLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!pageDataLoaded) getPageData();
    if (!postDataLoaded) getPostData();
  });

  const getPageData = () => {
    //Gets the page with id 6 (the "home" page) and stores in state
    wpInstance
      .get("/wp/v2/pages/6")
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

  const getPostData = () => {
    //Gets all the posts and stores in state
    wpInstance
      .get("/wp/v2/posts/")
      .then(res => {
        setPostData(res.data);
        setPostDataLoaded(true);
      })

      //If an error occurs, saves the error message in state and sets hasError to true
      .catch(err => {
        setErrorMessage(err.message);
        setHasError(true);
      });
  };

  let renderPosts = null;
  if (postDataLoaded & !hasError) {
    renderPosts = (
      <div>
        {postData.map(post => {
          const title = post.title.rendered;
          const excerpt = post.excerpt.rendered;
          return (
            <Card
              textColor="#5681A0"
              key={post.id}
              linkURL={`/post/${post.id}`}
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
  if (pageDataLoaded & !hasError) {
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;
    renderPage = (
      <div className={style.Home}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {renderPosts}
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

  //Final rendering
  if (renderPage != null) return renderPage;
  else if (hasError) return renderError;
  else return renderLoading;
};

export default Home;
