import React, { Component } from "react";

class PostCategory extends Component {
  constructor(props) {
    super(props); // This line is calling the constructor in the super class.

    this.state = {
      // When initializing the state in the constructor, we just create it as an object.
      input: "" // input is initialized to the empty string.
    };
  }

  ///Method used for the input
  onChange(event) {
    // We can only change state using this.setState() and replace the current state with something new.
    this.setState({
      input: event.target.value // Set the value in this.state to the current value of the input DOM element
      // The above event.target.value is vanilla JavaScript to get value from event DOM target
    });
  }

  //Method to make the button working
  onClick(event) {
    event.preventDefault();
    this.props.postCategory(this.state.input); // Add the category to the state ofcategories in App.js
    
  }

  render() {
    return (
      <div className="card col-lg-8">
        <div className="card-body">
          <form>
            <div className="form-row align-items-center">
              <div className="col-md-9">
                <input
                  onChange={event => this.onChange(event)}
                  type="text"
                  placeholder="Post a category"
                  className="form-control mb-2"
                />
              </div>
              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-info mb-2"
                  onClick={event => this.onClick(event)}
                >
                  Post category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostCategory;
