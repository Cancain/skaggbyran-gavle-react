import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { wpInstance } from "../../Axios/Axios";

const SinglePost = props => {
  const [post, setPost] = useState();
  const [postLoaded, setPostLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!postLoaded) getPost();
  });

  const getPost = () => {
    const postId = props.match.params.id;
    wpInstance
      .get(`/posts/${postId}`)
      .then(res => {
        setPost(res.data);
        setPostLoaded(true);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setHasError(true);
      });
  };

  if (postLoaded) {
    const title = post.title.rendered;
    const content = post.content.rendered;
    console.log(object);
    return (
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link to="/">Tillbaka</Link>
      </div>
    );
  } else if (hasError) {
    return (
      <React.Fragment>
        <h3>Något gick fel, försök igen senare</h3>
        <small>{errorMessage}</small>
      </React.Fragment>
    );
  }
  return <h3>Laddar...</h3>;
};

export default SinglePost;
