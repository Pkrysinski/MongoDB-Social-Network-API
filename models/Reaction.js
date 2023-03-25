const { Schema, model } = require('mongoose');

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
    userName: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  }
);

// Use a getter method to format the timestamp on query
reactionSchema
  // Getter
  .get(function () {
    return this.createdAt;
  });

// Initialize our User model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
