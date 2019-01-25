const cookieParser = require('cookie-parser');
const { authenticate } = require('@feathersjs/authentication').express;
const checkBranchOwner = require('../hooks/check-branch-owner');



module.exports = function(app){
    /******************************** 
    * GET /steps
    * 
    *******************************/

   /**  
    * GET 
    * /steps
    */

  app.get('/steps', async (req, res, next) => {
    const result = await app.service('step').find();
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });
    
  /**  
    * POST 
    * /stepS
    */
   app.post('/steps', cookieParser(), authenticate('jwt'), async (req, res, next) => {
    console.log(req.body)
    const {user} = req
    const params = {
      user,  query: {}
    };
    const result = await app.service('step').create(req.body, params);
    
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });

   /**  
    * GET 
    * /step/:id
    */
  app.get('/step/:_id', async (req, res, next) => {
    const {_id} = req.params;
    const result = await app.service('step').get(_id);
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });

  /**  
   * GET 
   * /:username/steps
   * 
  */
  app.get('/:username/steps', async (req, res, next) => {
    const {username} = req.params
    const result = await app.service('step').find({"owner":username});
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });
  
  /**  
   * GET 
   * /:username/step/:_id
   * 
  */
  app.get('/:username/step/:_id', async (req, res, next) => {
    const {username, _id} = req.params;
    const result = await app.service('step').get(_id, req.params);
    res.data = result;
    next();
  }, (req, res) => {
    res.json(res.data);
  });

  /**  
   * GET 
   * /:username/step/:_id/:branch
   * 
  */
  app.get('/:username/step/:_id/:branch', async (req, res, next) => {
    const {username, _id, branch} = req.params;
    
    const params = {
      _id,  query: {
        "_id":_id,
        "branches.$.branchName": branch
      }
    };

    const result = await app.service('step').get(_id, params);
    res.json(result)
  });

  /**  
   * PATCH 
   * /:username/step/:_id/:branch
   * 
  */
 app.patch('/:username/step/:_id/:branch', cookieParser(), authenticate('jwt'), async (req, res, next) => {
  const {user, body} = req
  const {_id, branch} = req.params
  
  const params = {
    "user": user,  
    _id,
    "branches.$.branchName": branch
  };

  const result = await app.service('step').patch( _id, body, params);
  res.data = result;
  next();
  }, (req, res) => {
    res.json(res.data)
  });
}