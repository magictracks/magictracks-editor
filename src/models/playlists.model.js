// playlists-model.js - A mongoose model
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
  
  const playlists = new Schema({
    title: {
      type: String,
      required: false
    },
    featureType:{
      type: String,
      required: false,
      default:"playlists"
    },
    description: {
      type: String,
      required: false
    },
    images:[
      {
        type: String,
        required: false,
        default:[]
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
    tags: [{
        type: String,
        default: [],
        required: false,
      }],
    keywords: [{
      type: String,
      default: [],
      required: false
    }],
    links: [{
      type: Schema.Types.ObjectId,
      ref: 'links',
      default: [],
      required: false
    }],
    references:[{
      type: Schema.Types.ObjectId,
      ref: 'playlistrefs',
      default: [],
      required: false
    }],
    parent: parentSchema
  }, {
    timestamps: true
  });

  return mongooseClient.model('playlists', playlists);
};
