import React from "react";
import "../Css/Components/TotalBusiness.css";
const TotalBusiness = () => {
  const total = [
    {
      title1: "Number of Availaible Parking Slots: 10 ",
    }
  ];
  return (
    <>
      <div className="row_boxes">
        {total.map((totalitems, index) => {
          return (
            <div className="row_boxes_inner" key={index}>
              <div className="first">
                <p className="number">{totalitems.number}</p>
                <p className="title">{totalitems.title1}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TotalBusiness;
