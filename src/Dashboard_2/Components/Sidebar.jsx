import React from "react";
import "../Css/Components/Sidebar.css";
import {
  AiOutlineDashboard,
  AiOutlineShareAlt,
  AiOutlineShoppingCart,
  AiOutlineBook
} from "react-icons/ai";
import { GrCatalogOption } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
const Sidebar = () => {
  const sidemenus = [
    {
      menu_name: "Number Plate Recognition",
      menu_icon: AiOutlineBook,
      menu_link: "numplate"
    },
    {
      menu_name: "Mild Accident Detection",
      menu_icon: AiOutlineShoppingCart,
      menu_link: "accidentdetect"
    },
    {
      menu_name: "Empty Parking Slot Detection",
      menu_icon: AiOutlineShareAlt,
      menu_link: "parkslot"
    }
  ];

  const links = [
    {
      menu_name:"Home Page",
      menu_link:'/'
    }
  ];

  return (
    <>
      <div className="sidebar">
        <div className="brand">
          <ul>
            {links.map((value) => {
              return (
                <li className={value.active ? "active" : ""}>
                  <a href= {value.menu_link}>
                    {value.menu_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="links">
          <ul>
            {sidemenus.map((value) => {
              return (
                <li className={value.active ? "active" : "false"}>
                  <a href= {value.menu_link}>
                    {value.menu_name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
