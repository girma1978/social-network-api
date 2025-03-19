import { Schema, Types } from 'mongoose';
import { formatDate } from '../utils/dateFormat';

// Reaction Schema (will be used as a subdocument)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => formatDate(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

export default reactionSchema;