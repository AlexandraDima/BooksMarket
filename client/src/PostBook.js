import React, { Component } from "react";

class PostBook extends Component {
  constructor(props) {
    super(props); // This line is calling the constructor in the super class.
    
    //Initializing the state that contains the category and the book object
    //I have only added only the title field, to test if the methods will work
    this.state = {
        category: "",
        book: {
          title:""
        }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onClick = this.onClick.bind(this);
  
  }
  
  //Method that is called each time the category is selected 
   onCategoryChange(event) {
      console.log("change category", event.target.value);
      this.setState({
        ...this.state,
        category: event.target.value
      })
   }

   //Method that is called each time the title is added as an input
   onTitleChange(event) {
    this.setState({
      book: {
        ...this.state.book,
        title: event.target.value
        
      } 
    })
     console.log("change title", event.target.value);
   }
   

  //Method to save all data to the server that is calling the postBook method with category and book parameters
  onClick(event) {
    event.preventDefault();
    this.props.postBook(this.state.category, this.state.book); 
    
  }

  render() {
    return (
      <div className="card col-lg-8 align-center m-5">
      <div className="card-body">
      <form  onClick={event => this.onClick(event)}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input className="form-control" id="exampleFormControlInput1" value={this.state.book.title} onChange={event => this.onTitleChange(event)} placeholder="Enter book title"></input>
      </div>

      {/*I should find a way to get the categoryId dynamically, instead of manually typing the categoryId value  */}
     <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Category</label>
        <select className="form-control" id="exampleFormControlSelect1"  onChange={event => this.onCategoryChange(event)}>
          <option value="5dfcb86050c64a00173afb6b">Graphic design</option>
          <option value="5dfcb8bc50c64a00173afb6f">Programming</option>
          <option value="5dfcb8c250c64a00173afb70">Virtual reality</option>
        </select>
      </div>

      <div>
        <button
                    type="submit"
                    className="btn btn-info mb-2"
                    onClick={event => this.onClick(event)}
                  >
                  Post book
                  </button>
      </div>
</form>






      </div>
    </div>





    );
  }
}

export default PostBook;
