const mongoose = require("mongoose"); // We need the mongoose library

class Db {
  constructor() {
    const Schema = mongoose.Schema;

    //Define the structure of the library database, using Mongoose schema
    const categoriesSchema = new Schema({
      category: String,
      books: [{ title: String, category: String, author: String, price: Number, sellerName:String, sellerEmail: String }]
    });

    //Compile Mongoose schema into a Library model
    //We need the singular name of the model
    this.categoriesModel = mongoose.model("category", categoriesSchema);
  }

  async getCategories() {
    try {
      return await this.categoriesModel.find({});
    } catch (error) {
      console.error("getCategories:", error.message);
      return {};
    }
  }

  async getCategory(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
    } catch (error) {
      console.error("getCategory:", error.message);
      return {};
    }
  }

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

  
  async deleteCategory(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
      
    } catch (error) {
      console.error("deleteCategory:", error.message);
      return {};
    }
  }

  async getBooks(categoryId) {
    try {
      return await this.categoriesModel.findById(categoryId);
    } catch (error) {
      console.error("getBooks:", error.message);
      return {};
    }
  }


  getBook(categoryId, bookId) {
    const category = this.getCategory(categoryId);
    try {
      return category.books.find(book => book._id == bookId);
    } catch (error) {
      console.error("getBook:", error.message);
      return {};
    }
  }

  
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
   * This method adds a bunch of test data if the database is empty.
   * @param count The amount of questions to add.
   * @returns {Promise} Resolves when everything has been saved.
   */
  async randomBooks(count = 1) {
    let l = (await this.getCategories()).length;
    console.log("Question collection size:", l);
    if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
            let category = new this.categoriesModel({
                category: 'Graphic design',
                books: [
                    {title: "Book1", author: "Bla bla", category: "Graphic design", price: 20, sellerName: "Ale", email: "admin@gmail.com"},
                    {title: "Book2", author: "Bla bla", category: "Graphic design", price: 45, sellerName: "ale", email: "admin@gmail.com"},
                ]
            });
            promises.push(category.save());
        }
        return Promise.all(promises);
    }
  }
}

// We are exporting an async function named 'ConnectDb'.
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
