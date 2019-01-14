// playlists-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const generate = require('project-name-generator');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;

  const ingredientRef = new Schema({
    branchName: {
      type: String,
      required: false,
    },
    ingredient: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'ingredient'
    }
  })

  const branchSchema = new Schema({
    branchName: {
      type: String,
      required: false,
      unique: false // TODO: change to unique true?
    },
    branchOwner: {
      type: String,
      required: false
    },
    description: {
      type: String,
      default: 'an informative description of this playlist otherwise the root description will be used'
    },
    images:[{
      type:String,
      default:[]
    }],
    ingredients: [ingredientRef]
  })

  const step = new Schema({
    branches: [branchSchema],
    title: {
      type: String,
      default: 'New Step'
    },
    description: {
      type: String,
      default: 'New step description'
    },
    featureType: {
      type: String,
      required: false,
      default: "step"
    },
    uniqueName: {
      type: String,
      default: ""
    },
    owner: {
      type: String,
      required: false
    },
    collaborators: [{
      type: String,
      default: [],
      required: false
    }],
    // TODO: should this be urls to the JSON endpoint for the link/project/playlist?? 
    suggested: [{
      type: String,
      default: [],
    }],
    selectedColor: {
      type: Number,
      default: 0
    },
    origin:{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'step' // TODO: add origin on create - if copied/forked, set ObjectId of project origin
    },
    colors: {
      type: Array,
      default: ["#FF725C", "#FFD700", "#FF80CC", "9EEBCF", "#CDECFF", "#A463F2"],
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('step', step);
};