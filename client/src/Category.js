import React, { Component } from "react";
import { Link } from "@reach/router";

class Category extends Component {
  constructor(props) {
    super(props);
  }

  //Component for displaying the books for a specific CategoryId
  render() {
    let title = " ";
    let listBooks = "";
    const category = this.props.getCategory(this.props.id);
    if (category) {
      title = category.category;
      if (category.books) {
        listBooks = category.books.map((book, id) => (
          <div key={book._id} id={book._id} className="card bg-cards text-center">
           <div className="card-title">
              <i className="fa fa-book fa-4x" aria-hidden="true"></i>  
                <h3><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
                <p>Author: {book.author}</p>
                <p>Price: {book.price}</p>
              </div>
           
          </div>
        ));
      }
    }
    return (
      <div className="m-5">
        <div className="question card bg-cards text-center p-3 col-lg-4">
          <h1>Category</h1>
          <h4 className="card-title"> {title}</h4>
        </div>
        <div className="m-5 text-center">
          <h3 className="m-5">Books we have in stock for {title} category</h3>
          <div className="card-columns mb-3">
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
