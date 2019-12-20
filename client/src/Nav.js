import React, { Component } from "react";
import { Link } from "@reach/router";
import Login from "./Login";
import AuthService from "./AuthService";

class Nav extends Component {
  constructor(props) {
    //This helps building the state
    super(props);

   // Initialize the auth service with the path of the API authentication route.
   this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
   this.logout = this.logout.bind(this);
   this.state = {
    categories: [],
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
  
  };
 }

  async logout(event) {
    event.preventDefault();
    this.Auth.logout();
    await this.setState({
      userCredentials: {},
      categories: []
    });
    }

  render() {
    console.log(this.state.userCredentials.username );
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
         BooksMarket
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <div className="navbar-nav mr-auto">
            {/*If statement for displaying different button links based on the loggedIn user 
            If the username is admin - the button will lead him to the admin area to add or remove categories
            If the username is client - the button will lead him to the client area to post a new book
            Else, if the user is not logged in, none of the buttons will be displayed
            */}
            {(this.Auth.getUsername() === "admin")  ? 
            <Link className="nav-item nav-link active btn btn-info mb-1" to="/admin">
              Admin
            </Link> : ((this.Auth.getUsername() === "client") ? <Link className="nav-item nav-link active btn btn-info mb-1" to="/postbook">
              Post book
            </Link> : "")
            }
          </div>
          
     
          <div className="navbar-nav my-2 my-lg-0">
          {this.Auth.getUsername() ? (
              <small className="text-light">
                Logged in: {this.Auth.getUsername()}{" "}
                <button
                  className="btn btn-info mb-1"
                  onClick={event => {
                    this.logout(event);
                  }}
                >
                  Logout
                </button>
              </small>
            ) : (
              <Login
                login={(username, password) =>
                  this.props.login(username, password)
                }
              />
            )}
          </div>
      
        </div>
      </nav>
    );
  }
}

export default Nav;
