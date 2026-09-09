import mongoose from 'mongoose';
import { PROJECT_STATUS_VALUES } from '../utils/constants.js';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: PROJECT_STATUS_VALUES,
      default: 'planning',
    },
    deadline: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure owner is always in members array
projectSchema.pre('save', function () {
  if (this.owner && !this.members.some((m) => m.equals(this.owner))) {
    this.members.push(this.owner);
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
