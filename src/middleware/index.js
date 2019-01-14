
const ingredientHelpers = require('./ingredient-helpers');
const recipeHelpers = require('./recipe-helpers');
const stepHelpers = require('./step-helpers');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {

  /** 
   * PING 
   * check if the server is running
  */
  app.get('/ping', async (req, res) => {
    res.json({"message": ":)"});
  });

  /** 
   * See helpers for express routes
   */
  ingredientHelpers(app);
  recipeHelpers(app);
  stepHelpers(app);

};