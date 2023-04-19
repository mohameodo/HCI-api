const mongoose = require("mongoose");
const watchHistorySchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);

module.exports = WatchHistory;
