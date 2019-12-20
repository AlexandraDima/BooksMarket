import React, { Component } from "react";
import { Link } from "@reach/router";


class Book extends Component {
  constructor(props) {
    super(props);
  }

  //Component for displaying the bookId 
  render() {
    let listBook = "";
    const category = this.props.getCategory(this.props.id);
 
    if (category) { 
      if (category.books) {
        listBook = category.books.map((book) => (
          <div key={book._id} id={book._id} className="list-group container">
           <div className="">
              <div className="col-lg-4 bg-light">
              <h1>Title: {book.title} </h1>
               <ul>
                   <li>Author: {book.author}</li>
                   <li>Seller: {book.sellerName}</li>
                   <li>Category: {book.category}</li>
                   <li>Price: {book.price}</li>
               </ul>  
              </div>
              </div>
          </div>
        ));
      }
    }
    


    return (
      <div className="m-5"> 
        <div>
          <h3>Book details</h3>
          <div className="row list-group-horizontal-md mb-3">       
            {listBook.length === 0 ? <p>No Book found!</p> : listBook}
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

export default Book;
