// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;

  const playlistRef = new Schema({
    branchName: {
      type: String,
      required: false,
    },
    playlist: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'playlists'
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
      required: true,
    },
    description: {
      type: String,
      default: 'an informative description of this project otherwise the root description will be used'
    },
    playlists: [playlistRef] // playlistReference
  })

  const projects = new Schema({
    branches: [branchSchema],
    title: {
      type: String,
      default: 'New Project'
    },
    description: {
      type: String,
      default: 'New Project description'
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

  return mongooseClient.model('projects', projects);
};
