import React from "react";
import './PageNotFound.css';
import {Link} from "react-router-dom";
import {TEXT} from "../../utils/constants";


function PageNotFound() {
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">{TEXT.errorCodePageNotFound}</h1>
      <p className="page-not-found__subtitle">{TEXT.pageNotFound}</p>
      <Link className="page-not-found__link" to="/">{TEXT.back}</Link>

    </section>
  );
}

export default PageNotFound;