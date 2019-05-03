import React, { useState, useEffect } from "react";
import Link from "../../../Components/UI/RouterLink/RouterLink";

import { wpInstance } from "../../Axios/Axios";

const SinglePost = props => {
  const [post, setPost] = useState();
  const [postLoaded, setPostLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  const [images, setImages] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imageHasError, setImageHasError] = useState(false);
  const [imageError, setImageError] = useState();

  useEffect(() => {
    if (!postLoaded) getPost();
  });
  //Gets the post and adds to state
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

  const getImageURL = id => {
    wpInstance
      .get(`/media?parent=${id}`)
      .then(res => {
        setImages(res.data);
        setImgLoaded(true);
      })
      .catch(err => {
        setImageHasError(true);
        setImageError(err.message);
      });
  };

  //Maps through the image state and renders them
  let renderImages = null;
  if (imgLoaded) {
    renderImages = images.map(image => {
      const imgURL = image.media_details.sizes.medium.source_url;
      const title = image.title.rendered;
      const id = image.id;
      return <img key={id} src={imgURL} alt={title} />;
    });
  }

  if (postLoaded) {
    const title = post.title.rendered;
    const content = post.content.rendered;
    if (!imgLoaded) getImageURL(post.id);
    return (
      <div>
        <h1>{title}</h1>
        {!imageHasError ? (
          renderImages
        ) : (
          <React.Fragment>
            <p>Bild kunde tyvärr inte laddas</p>
            <small>{imageError}</small>
          </React.Fragment>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link to="/" text="Tillbaka" color="white" fontSize="1.3rem" isButton />
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
