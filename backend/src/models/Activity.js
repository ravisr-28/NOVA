import mongoose from 'mongoose';
import { ACTIVITY_ACTION_VALUES } from '../utils/constants.js';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    action: {
      type: String,
      enum: ACTIVITY_ACTION_VALUES,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast project activity queries, newest first
activitySchema.index({ project: 1, createdAt: -1 });
activitySchema.index({ user: 1, createdAt: -1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
