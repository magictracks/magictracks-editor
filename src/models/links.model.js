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
    terms: [{
      type: String,
      default: [],
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

  const branchSchema = new Schema({
    branchName: {
      type: String,
      required: false
    },
    branchOwner: {
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
    },
    images: [{
      type: String,
      default: [],
      required: false
    }]
    // TODO: include link to parent?
  });

  const links = new Schema({
    branches: [branchSchema],
    title: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true,
      unique: true // TODO: change to TRUE
    },
    uniqueName: {
      type:String,
      default: ""
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
    creator: {
      type: String,
      required: false
    },
    // TODO: should this be urls to the JSON endpoint for the link/project/playlist?? 
    suggested: [{
      type: String,
      default: [],
    }],
    selectedColor: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: ["#FF725C", "#FFD700", "#FF80CC", "9EEBCF", "#CDECFF", "#A463F2"],
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('links', links);
};
