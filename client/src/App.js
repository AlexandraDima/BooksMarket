import React, {Component} from "react";
import {Router} from "@reach/router";
import Category from "./Category";
import Categories from "./Categories";
import PostBook from "./PostBook";
import Book from "./Book";
import Nav from "./Nav";
import Admin from "./Admin";
import AuthService from "./AuthService";
import Login from "./Login";

class App extends Component {
  //Initialize the state data of categories
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    //This helps building the state
    super(props);

    // Initialize the auth service with the path of the API authentication route.
    this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    this.state = {
      categories: []
    }; 
  }


  //Using async method to get the data from API
  async getData() {
    const resp = await this.Auth.fetch(`${this.API_URL}/categories/`);
    const data = await resp.json();
   this.setState({
    categories: data
  }); 
  }

  //Function to get the category ID
  getCategory(id) {
    //  go over all elements in 'this.state.category' and find the element
    // that matches 'e.id === Number(id)' where 'e' is one of the objects in 'this.state.categories'
    return this.state.categories.find(e => e._id === id); // And then return it
  }

 
  //Function to post new category
  postCategory(category) {
    this.postData(category);
  }

  //Post method to post a new category to API
  postData(category) {
    let url = `${this.API_URL}/categories/`;
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
          category: category
          //books:[]
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.Auth.getToken()
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new category:");
        console.log(json);
        this.getData();
      });

  }

    //Function to post new book
    postBook(categoryId,book) {
      this.postBookData(categoryId,book);
    }

  //Method to post new book to API
  postBookData(categoryId, book) {
    let url = `${this.API_URL}/categories/`
      .concat(categoryId)
      .concat("/books");

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
         // category:category,
          book:book
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.Auth.getToken()
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new book:");
        console.log(json);
        this.getData();
      });
  }

    //Function to delete a category
    deleteCategory(categoryId) {
      this.deleteCategoryData(categoryId);
    }
    
  //Delete a category API
  deleteCategoryData(categoryId) {
    let url = `${this.API_URL}/categories/`
      .concat(categoryId);

    fetch(url, {
        method: "DELETE",
        
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.Auth.getToken()
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log("Result of deleting:");
        console.log(json);
        this.getData();
      });
  }
  /****************Login functionality**************************************/
  //Login method 
  async login(username, password) {
    try {
      const resp = await this.Auth.login(username, password);
      console.log("Authentication:", resp.msg);
      this.getData();
    } catch (e) {
      console.log("Login", e);
    }
  }

  //Logout method
  async logout(event) {
    event.preventDefault();
    this.Auth.logout();
    await this.setState({
      userCredentials: [],
      categories: []
    });
  }


  render() {
    return (
      <main className="container">
        {/*  <Nav> is not a target for routing, so we put it outside of <Router>
         *  It will appear as a header on each page.
          //Login is part of the nav component
         */}
        
        <Nav login = {(username, password) => this.login(username, password)}
            onClick = {
              event => {
                this.logout(event);
              }
            }
            />
      
          <div className="jumbotron">
            <div className="d-flex flex-row-reverse p-5">
              <div className="d-none d-sm-block">

            
                <h1>
                  The best place
                  <br></br>to find your books
                </h1>
                <h5>
                  BooksMarket is a books library website
                </h5>
              </div>
            </div>
          </div>

        <Router>
          <Category
            path="/category/:id"
            categories={this.state.categories}
            getCategory={id => this.getCategory(id)}
                     />
      
          <Book path="/books/:bookId"
            categories={this.state.categories}
           getCategory={id => this.getCategory(id)}
          
          ></Book>

          <Categories
            path="/"
            categories={this.state.categories}
          ></Categories>

          <Login path = "/login"
                login = {(username, password) => this.login(username, password)} >
          </Login>

          <Admin path = "/admin"
          categories={this.state.categories}
          getCategory={id => this.getCategory(id)}
          postCategory={category => this.postCategory(category)}
          deleteCategory={categoryId => this.deleteCategory(categoryId)}
          login = {(username, password) => this.login(username, password)} 
          >
          </Admin>

          <PostBook path ="/postbook"
                categoryId={this.props.id}
                getCategory={id => this.getCategory(id)}
                postBook={(categoryId, book) =>
                  this.postBook(categoryId, book)
                }
              />
        </Router>
      </main>
    );
  }
}

export default App;