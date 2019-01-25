const cookieParser = require('cookie-parser');
const { authenticate } = require('@feathersjs/authentication').express;
const checkBranchOwner = require('../hooks/check-branch-owner');



module.exports = function(app){
    /**************************
   * RECIPE DB
   * 
   **************************/
  
  /**
   * GET 
   * /recipes
   */
  app.get('/recipes', async (req, res) => {
    const result = await app.service('recipe').find();
    res.json(result);
  });

   /**
   * POST 
   * /recipes
   */
  app.post('/recipes', cookieParser(), authenticate('jwt'), async (req, res, next) => {
    console.log(req.body)
    const {user} = req
    const params = {
      user,  query: {}
    };
    const result = await app.service('recipe').create(req.body, params);
    
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });

   /**
   * GET 
   * /recipe/:id
   */
  app.get('/recipe/:_id', async (req, res) => {
    const {_id} = req.params;
    const result = await app.service('recipe').get(_id);
    res.json(result);
  });

  /**
   * GET 
   * /:username/recipes
   */
  app.get('/:username/recipes', async (req, res) => {
    const username = req.params.username
    const result = await app.service('recipe').find({"owner":username});
    res.json(result)
  });

  /**
   * GET 
   * /:username/recipe/:_id
   */
  app.get('/:username/recipe/:_id', async (req, res, next) => {

    const {username, _id, branch} = req.params;
    const params = {
      _id,  query: {
        "_id":_id,
        "branches.$.branchName": 'default'
      }
    };

    const result = await app.service('recipe').get(_id, params);
    res.json(result)
  });

  /**
   * GET 
   * /:username/recipe/:_id/:branch
   * 
   */
  app.get('/:username/recipe/:_id/:branch', async (req, res, next) => {
    const {username, _id, branch} = req.params;
    
    const params = {
      _id,  query: {
        "_id":_id,
        "branches.$.branchName": branch
      }
    };

    const result = await app.service('recipe').get(_id, params);
    res.json(result)
  });
  
  /**  
   * PATCH
   * /:username/recipe/:_id/:branch
  */
  app.patch('/:username/recipe/:_id/:branch', cookieParser(), authenticate('jwt'), async (req, res, next) => {
    const {user, body} = req
    const {_id, branch} = req.params
    
    const params = {
      "user": user,  
      _id,
      "branches.$.branchName": branch
    };
    
    const result = await app.service('recipe').patch( _id, body, params);
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data)
  });
}