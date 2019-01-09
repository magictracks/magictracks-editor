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

  const linkRef = new Schema({
    branchName: {
      type: String,
      required: false,
    },
    link: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'links'
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
    links: [linkRef]
  })

  const playlists = new Schema({
    branches: [branchSchema],
    title: {
      type: String,
      default: 'New Playlist'
    },
    description: {
      type: String,
      default: 'New Playlist description'
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
  }, {
    timestamps: true
  });

  return mongooseClient.model('playlists', playlists);
};
