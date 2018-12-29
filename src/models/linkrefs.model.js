// linkrefs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const parentSchema = new Schema({
    id: {
      type: String,
      required: false
    },
    featureType:{
      type: String,
      required: false
    } // should be "playlists" or "projects"
  })

  const linkrefs = new Schema({
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    url:{
      type: String,
      required: false
    },
    featureType: {
      type: String,
      required: false,
      default:"linkrefs"
    },
    tags: [{
      type: String,
      default: [],
      required: false
    }],
    images: [{
      type: String,
      default: [],
      required: false
    }],
    owner:{
      type: Schema.Types.ObjectId,
      required: false,
      ref:'users'
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users',
      default:[]
    }],
    source:{
      type: Schema.Types.ObjectId,
      ref: 'links',
      required: true
    },
    parent: parentSchema // details for the parent container
  }, {
    timestamps: true
  });

  return mongooseClient.model('linkrefs', linkrefs);
};
