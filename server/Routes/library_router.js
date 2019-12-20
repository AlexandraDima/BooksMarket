module.exports = dbObject => {
  const express = require("express");
  const router = express.Router();

  ///Adding route handlers
  //Each route handler takes care of a combination of a request method and a path

  //Read categories
  router.get("/", (request, response) => {
    dbObject.getCategories().then(categories => response.json(categories));
  });

  //Read category id and books
  router.get("/:categoryId", (request, response) => {
    const categoryId = request.params.categoryId;
    dbObject.getCategory(categoryId).then(category => response.json(category));
  });

  ///Post category
  router.post("/", (request, response) => {
    let category = {
      category: request.body.category,
      books: []
    };
    dbObject
      .postCategory(category)
      .then(newCategory => response.json(newCategory));
  });

  //Delete category
  router.delete("/:categoryId", (request, response) => {
    const categoryId = request.params.categoryId;
    dbObject.deleteCategory(categoryId).then(category => response.json(category.remove()))
   });

    //Read books 
    router.get("/:categoryId/books", (request, response) => {
      const categoryId = request.params.categoryId;
      dbObject.getBooks(categoryId).then(category => response.json(category));
      
    });

   
     //Read book id --It's displaying an empty book object so far 
  router.get("/:categoryId/books/:bookId", (request, response) => {
    let categoryId = request.params.categoryId;
    let bookId = request.params.bookId;
    dbObject.getBook(categoryId,bookId).then(book => response.json(book));
  });


  ///Post a new book for a specific category id
  router.post("/:categoryId/books", (request, response) => {
    // To add books, we need the id of the category, and some books text from the request body.
    dbObject
      .postBook(request.params.categoryId, request.body) // request.body is a book object
      .then(updatedBook => response.json(updatedBook));
  });
  return router; // Really important to return the router back when this module is required.
};
