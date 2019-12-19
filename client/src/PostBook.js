import React, { Component } from "react";

class PostBook extends Component {
  constructor(props) {
    super(props); // This line is calling the constructor in the super class.

  this.state = {
  
      title: "", 
      price: ""
    
  
  };
  
  }
 
  ///Method used for the input
  onChange(event) {
   
   this.setState({
    [event.target.name] : event.target.value

  });


  }

  //Method to make the button working
  onClick(event) {
  
   // const category = this.props.getCategory(this.props.id);
    event.preventDefault();

    this.props.postBook(this.props.categoryId, this.state.title); 
    console.log(this.props.postBook);
    
  }

  render() {
    return (
      <div className="card col-lg-8 align-center m-5">
      <div className="card-body">
      <form  onClick={event => this.onClick(event)}>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input type="email" className="form-control" id="exampleFormControlInput1"  onChange={event => this.onChange(event)}  name="title"  placeholder="Enter book title"></input>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Price</label>
        <input type="email" className="form-control" id="exampleFormControlInput1"  onChange={event => this.onChange(event)} name="price" placeholder="Enter book price"></input>
      </div>

{/*
 <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Category</label>
        <select className="form-control" id="exampleFormControlSelect1"  onChange={event => this.onChange(event)}>
          <option value="programming">programming</option>
          <option value="Graphic design">Graphic design</option>
          <option value="Virtual reality">Virtual reality</option>
        </select>
      </div>
      
*/}
    
     
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
