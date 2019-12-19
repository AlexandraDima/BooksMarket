import React, { Component } from "react";
import { Link } from "@reach/router";
import PostCategory from "./PostCategory";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

 deleteCategory(event) {
 // let id = event.currentTarget.dataset.id;
  this.props.deleteCategory(this.props.id);
  }
  render() {
    let contentCategories;
    if (this.props.categories) {
      console.log("i am going to render again");
      contentCategories = this.props.categories.map(category => (
        <div key={category._id} id={category._id} className="card bg-cards text-center p-3">
          <h3 className="card-title">

           {category.category}
          </h3>
          <button
                  className="btn btn-info mb-1"
                  onClick={() =>
                    this.props.deleteCategory(category._id)
                  }
                >
                  Delete
                </button>
        </div>
      ));
    }
    return (
      <div>
        <div className="titleWebsite col-lg-8 p-4">
          <h1>Categories</h1>
        </div>
        <div className="card-columns">{contentCategories}</div>
        <div className="m-5">
          <PostCategory postCategory={category => this.props.postCategory(category)} />
        </div>
      </div>
    );
  }
}

export default Admin;
