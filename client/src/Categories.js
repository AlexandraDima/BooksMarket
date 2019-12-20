import React, { Component } from "react";
import { Link } from "@reach/router";


class Categories extends Component {
    //Component for displaying the list of categories

  render() {
    let contentCategories;
    if (this.props.categories) {
      contentCategories = this.props.categories.map(category => (
        <div key={category._id} className="card bg-cards text-center p-3">
          <i className="fa fa-list fa-2x" aria-hidden="true"></i>
          <h3 className="card-title">
            <Link to={`/category/${category._id}`}>{category.category}</Link>
          </h3>
        </div>
      ));
    }
    return (
      <div>
        <div className="titleWebsite col-lg-8 p-4">
          <h1>Categories</h1>
        </div>
        <div className="card-columns">{contentCategories}</div>
      
     
      </div>
  
    );
  }
}

export default Categories;
