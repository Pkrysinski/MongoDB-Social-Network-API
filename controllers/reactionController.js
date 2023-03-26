const { Thought, Reaction } = require('../models');

module.exports = {

  // Create a reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((thought) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.thoughtID },
          { $addToSet: { reactions: reaction._id } },
          { new: true }
        );
      })
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'reaction created, but no thought found with that ID' })
          : res.json({ message: 'reaction created!' })
      )
      .catch((err) => {
        console.error(err);
      });
  }, 

  // Delete a reaction
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.id })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : Thought.findOneAndUpdate(
            { reactions: req.params.id },
            { $pull: { reactions: req.params.id } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Reaction deleted but no thought with this id!',
            })
          : res.json({ message: 'Reaction successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
