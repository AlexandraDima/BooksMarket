const mongoose = require("mongoose"); // We need the mongoose library

class Db {
  constructor() {
    const Schema = mongoose.Schema;

    //Define the structure of the library database, using Mongoose schema
    const categoriesSchema = new Schema({
      category: String,
      books: [{ title: String, category: String, author: String, price: Number, sellerName:String, sellerEmail: String }]
    });

    //Compile Mongoose schema into a Library/categories model
    //We need the singular name of the model
    this.categoriesModel = mongoose.model("category", categoriesSchema);
  }

  //Using Asynchrounous methods to return promises insteasd of values directly
  //Promise object - eventual completion or failure of an asynchrounous operation, getting its resulting value in return


  //Get all categories
  async getCategories() {
    try {
      return await this.categoriesModel.find({});
    } catch (error) {
      console.error("getCategories:", error.message);
      return {};
    }
  }

  
  //Get one categoryId
  async getCategory(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
    } catch (error) {
      console.error("getCategory:", error.message);
      return {};
    }
  }

   //Post one category
  async postCategory(newCategory) {
    // TODO: Error handling
    let category = new this.categoriesModel(newCategory);
    try {
      return category.save();
    } catch (error) {
      console.error("postCategory:", error.message);
      return {};
    }
  }

    //Delete one category
  async deleteCategory(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
      
    } catch (error) {
      console.error("deleteCategory:", error.message);
      return {};
    }
  }

    //Get all books for a specific categoryId
  async getBooks(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
    } catch (error) {
      console.error("getBooks:", error.message);
      return {};
    }
  }

  //Get a BookId for a specific categoryId --- It finds the BookId, but it's displaying an empty book object
  async getBook(categoryId, bookId) {
    let category = this.categoriesModel.findById(categoryId);
    
    try {
      console.log(bookId);
      return await category.books.find(book => book._id == bookId);
     
    } catch (error) {
      console.error("getBook:", error.message);
      return {};
    }
  }

  //Post a book for a specific categoryId
  async postBook(categoryId, book) {
    // TODO: Error handling
    const category = await this.getCategory(categoryId);
    category.books.push(book);
    try {
      return category.save();
    } catch (error) {
      console.error("postBook:", error.message);
      return {};
    }
  }


  /** Random test data to the database
   * This method adds a category and some books data if the database is empty.
   * @param count The amount of books to add.
   * @returns {Promise} Resolves when everything has been saved
   */
  async randomBooks(count = 1) {
    let l = (await this.getCategories()).length;
    console.log("Library collection size:", l);
    if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
            let category = new this.categoriesModel(
              {
                  category: 'Graphic design',
                  books: [
                      {title: "Thinking With Type", author: "Ellen Lupton", category: "Graphic design", price: 20, sellerName: "Alexandra", email: "alexandra@gmail.com"},
                      {title: "Elements of Graphic Design", author: "Alex White", category: "Graphic design", price: 45, sellerName: "maria", email: "maria@gmail.com"},
                      {title: "A Designer's Art", author: "Paul Rand", category: "Graphic design", price: 45, sellerName: "maria", email: "maria@gmail.com"}
                  ]
               
            });
            promises.push(category.save());
        }
        return Promise.all(promises);
    }
  }

}


// Exporting an async function named 'ConnectDb'.
// It only resolves when the database connection is ready.
// It resolves with an Db object instantiated from the class above.
// The Db object is used for all data access in this app.
module.exports.connectDb = async () => {
  const url = process.env.MONGO_URL || "mongodb://localhost/categories-db";
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Library database connected");
      return new Db();
    })
    .catch(error => {
      console.error(error);
    });
};
