import React, { useState, useEffect } from "react";
import { wpInstance } from "../Axios/Axios";
import Link from "../../Components/UI/RouterLink/RouterLink";

import style from "./Navigation.module.css";

const Navigation = props => {
  const [menu, setMenu] = useState();
  const [menuLoaded, setMenuLoaded] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!menuLoaded) getMenu();
  });

  const getMenu = () => {
    wpInstance
      .get("/menus/v1/menus/MainNav")
      .then(res => {
        setMenu(res.data);
        setMenuLoaded(true);
      })
      .catch(err => {
        setHasError(true);
        setErrorMessage(err.message);
      });
  };

  const getPageSlug = url => {
    //Split URL by "/" into array
    const splitURL = url.split("/");

    //Remove all "falsy elements", this is to remove the last empty part of the URL
    const filteredURL = splitURL.filter(Boolean);

    //Get the last part of the URL, the slug used to get the page link
    const slug = "/" + filteredURL[filteredURL.length - 1];
    return slug;
  };

  let mobileMenu = null;
  if (menuLoaded) {
    mobileMenu = menu.items.map(menuItem => {
      const slug = getPageSlug(menuItem.url);
      return (
        <Link
          to={slug}
          key={menuItem.ID}
          isButton
          backgroundColor={"#B9D1E1"}
          color="black"
          text={menuItem.title}
          width="92%"
          fontSize="1.7rem"
          margin="5px auto 0 auto"
          borderRadius="0"
        />
      );
    });
  }

  let renderMenu = mobileMenu;

  const renderError = (
    <React.Fragment>
      <h3>Något gick fel, försök igen senare</h3>
      <small>{errorMessage}</small>
    </React.Fragment>
  );

  const renderLoading = <h3>Laddar...</h3>;

  //Final rendering
  if (menuLoaded) return <div className={style.Navigation}>{renderMenu}</div>;
  else if (hasError) return renderError;
  else return renderLoading;
};

export default Navigation;
