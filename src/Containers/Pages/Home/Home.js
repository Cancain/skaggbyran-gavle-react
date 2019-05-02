import React, { useEffect, useState } from "react";
import { wpInstance } from "../../Axios/Axios";

import Card from "../../../Components/Card/Card";

import style from "./Home.module.css";

const Home = props => {
  const [pageData, setPageData] = useState();
  let [pageDataLoaded, setPageDataLoaded] = useState(false);

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
  });

  if (pageDataLoaded) {
    console.log(pageData);
    const title = pageData.title.rendered;
    const content = pageData.content.rendered;
    return (
      <div className={style.Home}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Card width="20%" height="20%">
          <h1>Card</h1>
          <p>This is a card</p>
        </Card>
      </div>
    );
  }
  return <h3>Loading...</h3>;
};

export default Home;
