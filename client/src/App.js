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
      /*
      userCredentials: [{
        username: "admin",
        password: "123",
        admin: true
      },
      {
        username: "client",
        password: "123",
        admin: false
      }
    ]
      */
    };
  
  }

  /*
  
  componentDidMount() {
    //console.log("qwe");
    this.getData();
  }
  */
  //Using async await
  async getData() {
    const resp = await this.Auth.fetch(`${this.API_URL}/categories/`);
    const data = await resp.json();

   this.setState({
    categories: data
  });
  
    
  }

  //Function to get the category ID
  getCategory(id) {
    //  go over all elements in 'this.state.question' and find the element
    // that matches 'e.id === Number(id)' where 'e' is one of the objects in 'this.state.questions'
    return this.state.categories.find(e => e._id === id); // And then return it
  }

    //Function to get the book ID
    getBook(id) {
      // that matches 'e.id === Number(id)' where 'e' is one of the objects in 'this.state.questions'
      return this.state.categories.books.find(b => b._id === id); // And then return it
    }

  //Function to post new category
  postCategory(category) {
   
    this.postData(category);
  }

  //Post method to post a new category
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

  //Function to post new book
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
        console.log("Result of posting a new answer:");
        console.log(json);
        this.getData();
      });
  }

    //Function to delete a category
    deleteCategory(categoryId) {
      this.deleteCategoryData(categoryId);
    }
    
  //Delete a category
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
  async login(username, password) {
    try {
      const resp = await this.Auth.login(username, password);
      console.log("Authentication:", resp.msg);
      this.getData();
    } catch (e) {
      console.log("Login", e);
    }
  }

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
                BooksMarket is a books library site
              
              </h5>
            </div>
          </div>
        </div>

        <Router>
          {/*
            Find the question id and return the path
            GetQuestion() function has to be called from inside the Question state component
             */}
          <Category
            path="/category/:id"
            getCategory={id => this.getCategory(id)}
            getBook={id => this.getBook(id)}
            postBook={(categoryId, book) =>
              this.postBook(categoryId, book)
            }
                     />
      
          <Book path="/books/:bookId"
           getCategory={id => this.getCategory(id)}
           getBook={id => this.getBook(id)}
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