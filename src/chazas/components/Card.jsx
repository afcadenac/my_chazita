import React from "react";


import "../../styles.css";

function Card({ imageSource, title, text, url }) {
  return (
    <div className="card mb-3 cardstyle">
  <div className="row g-0 imgp">
    <div className="col-md-4 allcard">
      <img src={imageSource} className="img-fluid rounded-start imag" alt="..."/>
    </div>
    <div className="col-md-8 ">
      <div className="card-body ">
        <h5 className="card-title ">{title}</h5>
        <p className="card-text ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel molestiae ad quod reiciendis assumenda</p>
        <p className="card-text "><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
  );
}



export default Card;