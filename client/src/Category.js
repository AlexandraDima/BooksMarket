import React, { Component } from "react";
import { Link } from "@reach/router";
import PostBook from "./PostBook";

class Category extends Component {
  constructor(props) {
    super(props);
 
  }

  render() {
    let title = " ";
    let listBooks = "";
    const category = this.props.getCategory(this.props.id);
    if (category) {
      title = category.category;
      if (category.books) {
        listBooks = category.books.map((book, id) => (
          <div key={book._id} id={book._id} className="list-group container">
           
           <div className="">
              <div className="col-lg-4 bg-light">

              <h1><Link to={`/books/${book._id}`}>{book.title}</Link></h1>
              
                
                
              </div>
              </div>
           
          </div>
        ));
      }
    }
    return (
      <div className="m-5">
        <div className="question card bg-cards text-center p-3 col-lg-4">
          <h2>Category</h2>
          <h4 className="card-title"> {title}</h4>
        </div>
        <div>
          <h3>Books</h3>
          <div className="row list-group-horizontal-md mb-3">
            {listBooks.length === 0 ? <p>No Books!</p> : listBooks}
          </div>

        </div>
        <div className="mt-5">
          <Link to="/">
            <i className="fa fa-long-arrow-left fa-1x circle-icon"> </i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Category;
