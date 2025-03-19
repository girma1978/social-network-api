import { Schema, model } from 'mongoose';

const reactionSchema = new Schema({
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true },
    username: { type: String, required: true },
    reactions: [reactionSchema] // Array of subdocuments (reactions)
  },
  { toJSON: { virtuals: true }, id: false }
);

const Thought = model('Thought', thoughtSchema);

export default Thought;
