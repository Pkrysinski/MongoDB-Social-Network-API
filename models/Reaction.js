const { Schema, model } = require('mongoose');
const { Reaction } = require('.');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionID: [
        {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        }
    ],
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,        
    },
    username: {
        type: string,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
reactionSchema
  // Getter
  .get(function () {
    return this.createdAt;
  });

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
