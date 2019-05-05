import React, { useState, useEffect } from "react";
import { wpInstance } from "../Axios/Axios";

const Navigation = props => {
  const [menus, setMenus] = useState();
  const [menusLoaded, setMenusLoaded] = useState(false);

  useEffect(() => {
    if (!menusLoaded) getMenus();
  });

  const getMenus = () => {
    wpInstance
      .get("/menus/v1/menus/MainNav")
      .then(res => {
        setMenus(res.data);
        console.log(menus);
        setMenusLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setMenusLoaded(true);
      });
  };

  let renderMenu = <h3>Laddar meny...</h3>;
  if (menusLoaded) {
    renderMenu = menus.items.map(menuItem => {
      return <a>test</a>;
    });
  }

  return (
    <div>
      <h1>Navigation</h1>
      {renderMenu}
    </div>
  );
};

export default Navigation;
