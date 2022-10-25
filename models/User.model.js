const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    
    photoUser: {
      type: String,
      enum: ["avatar1", "avatar2", "avatar3"],
    },
    favorites:[
      {
      type: Schema.Types.ObjectId,
      ref: "Product",
      },]
      
  },
  {
    
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
