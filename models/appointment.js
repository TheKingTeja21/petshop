const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");

// Function to check video duration
export const checkVideoDuration = async (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const duration = metadata.format.duration;
        resolve(duration <= 10);
      }
    });
  });
};

const AppointmentSchema = new mongoose.Schema(
  {
    userId:{ type:mongoose.Schema.Types.ObjectId, ref:"User"},
    ownerName: { type: String, required: true },
    category: { type: String, required: true },
    petBreed: { type: String, required: true },
    age: { type: Number, required: true },
    media: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          if (v.endsWith(".mp4")) {
            try {
              return await checkVideoDuration(v);
            } catch (error) {
              return false;
            }
          }
          return true;
        },
        message: () => `Video duration must not be more than 10 seconds!`,
      },
    },
    aadharNo: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 12-digit Aadhar number!`,
      },
      required: true,
    },
    phoneNo: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit phone number!`,
      },
      required: true,
    },
    currentAddress: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    howManyDays: {
      type: Number,
      required: true,
      validate: {
        validator: function () {
          if (this.fromDate && this.toDate) {
            const diffTime = Math.abs(this.toDate - this.fromDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return this.howManyDays === diffDays;
          }
          return true;
        },
        message: (props) => `The number of days (${props.value}) does not match the difference between the from and to dates!`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
