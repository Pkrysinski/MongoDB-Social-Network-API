const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .populate('reactions')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'thought created, but no user found with that ID' })
          : res.json({ message: 'thought created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },



  // Updates a thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },  

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted but no user with this id!',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        return Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((Thought) =>
        !Thought
          ? res
              .status(404)
              .json({ message: 'reaction created, but no thought found with that ID' })
          : res.json({ message: 'reaction created' })
      )
      .catch((err) => {
        console.error(err);
      });
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.thoughtId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : Thought.findOneAndUpdate(
            { reactions: req.params.id },
            { $pull: { reactions: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'Reaction deleted but no thought with this id!',
            })
          : res.json({ message: 'Reaction successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },  

};