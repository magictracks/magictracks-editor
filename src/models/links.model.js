// links-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;

  const keyWordSchema = new Schema({
    totalWords: {
      type: Number,
      required: false
    },
    relevance: [{
      type: Object,
      default: [],
      required: false
    }],
    terms:[{
      type: String,
      default:[],
      required: false
    }],
    image: {
      type: String,
      required: false
    },
    amphtml: {
      type: String,
      required: false
    },
    canonical: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  })

  const links = new Schema({
    title: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true,
      unique: true // TODO: change to TRUE
    },
    featureType: {
      type: String,
      required: false,
      default: "links"
    },
    description: {
      type: String,
      required: false
    },
    keywords: keyWordSchema,
    images: [{
      type: String,
      default: [],
      required: false
    }],
    image: {
      type: String,
      required: false
    },
    logo: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    publisher: {
      type: String,
      required: false
    },
    references: [{
      type: Schema.Types.ObjectId,
      ref: 'linkrefs',
      default: [],
      required: false
    }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('links', links);
};
