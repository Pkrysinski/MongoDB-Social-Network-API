const { Schema, model } = require('mongoose');
const { Thought } = require('.');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText:  {
        type: String, 
        required: true, 
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: string,
        required: true, 
    },
    reactions: {
        type: string,
        required: true, 
    },
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })
  // Setter to set the first and last name
  // PAK TODO - Might not need this?
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
