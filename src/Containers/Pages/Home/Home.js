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
      .get("/pages/6")
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
    //Gets the page with id 6 (the "home" page) and stores in state
    wpInstance
      .get("/posts/")
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

  if (pageDataLoaded && postDataLoaded) {
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;

    //If all fetches goes well, renders the page content and post content
    return (
      <div className={style.Home}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
      </div>
    );

    //If an error has occured while fetching, shows an error message
  } else if (hasError) {
    return (
      <React.Fragment>
        <h3>Något gick fel, försök igen senare</h3>
        <small>{errorMessage}</small>
      </React.Fragment>
    );
  }

  //While fetching is going on, shows a loding indicator
  return <h3>Laddar...</h3>;
};

export default Home;
