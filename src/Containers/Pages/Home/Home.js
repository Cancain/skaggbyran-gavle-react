import React, { useEffect, useState } from "react";
import { wpInstance } from "../../Axios/Axios";

import Card from "../../../Components/Card/Card";

import style from "./Home.module.css";

const Home = props => {
  const [pageData, setPageData] = useState();
  const [pageDataLoaded, setPageDataLoaded] = useState(false);

  const [postData, setPostData] = useState();
  const [postDataLoaded, setPostDataLoaded] = useState(false);

  useEffect(() => {
    console.log("in useEffect");
    if (!pageDataLoaded) {
      wpInstance
        .get("/pages/6")
        .then(res => {
          setPageData(res.data);
          setPageDataLoaded(true);
        })
        .catch(err => console.log(err));
    }

    if (!postDataLoaded) {
      wpInstance
        .get("/posts/")
        .then(res => {
          setPostData(res.data);
          setPostDataLoaded(true);
        })
        .catch(err => console.log(err));
    }
  });

  if (pageDataLoaded && postDataLoaded) {
    // console.log(postData);
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;
    return (
      <div className={style.Home}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          {postData.map(post => {
            const title = post.title.rendered;
            const excerpt = post.excerpt.rendered;
            // const imgUrl = post._links.wp:attachment;
            console.log(imgUrl);
            return (
              <Card textColor="#5681A0" key={post.id}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
  return <h3>Laddar...</h3>;
};

export default Home;
