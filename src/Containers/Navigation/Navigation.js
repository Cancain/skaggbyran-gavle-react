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
        console.log(menu);
        setMenuLoaded(true);
      })
      .catch(err => {
        setHasError(true);
        setErrorMessage(err.message);
      });
  };

  let renderMenu = null;
  if (menuLoaded) {
    renderMenu = menu.items.map(menuItem => {
      return (
        <Link
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
