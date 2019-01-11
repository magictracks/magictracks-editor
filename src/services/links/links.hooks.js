const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])
const got = require('got');
var analyze = require('schenkerian')

const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addOwner = require('../../hooks/add-owner.js');
const addDefaultBranch = require('../../hooks/add-default-branch.js');
const addUniqueName = require('../../hooks/add-unique-name.js');
const setRandomColor = require('../../hooks/set-random-color.js');

const getMetaDetails = function(){
  return async (context) => {
    const { params } = context;

        // Get Meta Tag details
        const { body: html, url } = await got(context.data.url)
        const metadata = await metascraper({ html, url })

        // do keyword analysis
        let keywordResults = await analyze({
          url: url,
          body: html
        })

        // Add data to context.data
        context.data = metadata;
        context.data.keywords = keywordResults

        // pull out the keywords
        if(keywordResults.relevance.length > 0){
          context.data.keywords.terms = keywordResults.relevance.map(item => item.term)
        }
        return context
  }
}

// const createLinkRef = function(){
//   return async (context) => {
//     // if a link already exists in the DB, then create a new reference to that link,
//     // add it to the references array of the link
//     // and return that new reference 

//     const { params, app } = context;
//     const linkrefs = app.service('linkrefs');

//     let existingFeature, 
//     newLinkRef,
//     patchedLink,
//     populatedLinkRef;

//     console.log("🌶🌶🌶", "This URL Already Exists")

//     existingFeature = await context.service.find({url:context.data.url});
//     existingFeature = existingFeature.data[0];

//     newLinkRef = await linkrefs.create({
//       title: existingFeature.title,
//       description: existingFeature.description,
//       url: existingFeature.url,
//       parent:{
//         id: null,
//         featureType: null
//       },
//       source: existingFeature._id
//     })

//     patchedLink =  await context.service.patch(existingFeature._id, {$push: {"references": newLinkRef._id}}) 
    
//     populatedLinkRef = await linkrefs.Model.findOne({_id:newLinkRef._id}).populate({
//       path: "source",
//     }).exec();

//     context.result = populatedLinkRef;

//     return context
//   }
// }


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'),
      getMetaDetails(), 
      addOwner(), 
      addDefaultBranch(), 
      addUniqueName(), 
      setRandomColor()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
