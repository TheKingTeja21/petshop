const mongoose = require("mongoose");
const ffmpeg = require("fluent-ffmpeg");

// Function to check video duration
const checkVideoDuration = async (videoPath) => {
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
    acceptanceTime: { type: Date }, // New field to store the acceptance time
    rejectionReason: { type: String }, 
  },
  { timestamps: true }
);

// Virtual field to calculate the expiry time (24 hours after acceptance)
AppointmentSchema.virtual('expiryTime').get(function() {
  if (this.acceptanceTime) {
    const expiryTime = new Date(this.acceptanceTime);
    expiryTime.setHours(expiryTime.getHours() + 24);
    return expiryTime;
  }
  return null;
});

// Method to accept the appointment
AppointmentSchema.methods.acceptAppointment = function() {
  this.acceptanceTime = new Date();
  this.status = 'accepted';
  return this.save();
};

AppointmentSchema.methods.rejectAppointment = function() {
  this.status = 'rejected';
  return this.save();
};

module.exports = mongoose.model("Appointment", AppointmentSchema);
