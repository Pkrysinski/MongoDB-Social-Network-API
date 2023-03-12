const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
    var RegExPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return RegExPattern.test(email)
};

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        unique: true, 
        required: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
        }
    ],
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
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the first and last name
  // PAK TODO - Might not need this?
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
