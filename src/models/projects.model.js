// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;

  const projectSchema = new Schema({
    title: {
      type: String,
      default: 'New Project Title',
      required: false,
    },
    description: {
      type: String,
      default: 'New project description',
      required: false,
    },
    collaborators: [{
      type: String,
      default: [],
      required: false,
    }],
    playlists: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'playlists',
      default: []
    }]
  })

  const projects = new Schema({
    branches: [{
      branchName: {
        type: String,
        required: true,
        default: 'master'
      },
      data: projectSchema
    }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('projects', projects);
};
