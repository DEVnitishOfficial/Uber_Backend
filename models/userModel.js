import { Schema, model } from "mongoose";
import { serverConfig } from "../config/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is Required"],
      custom_minLength: [5, "Name must be at least 5 characters"],
      custom_maxLength: [50, "Name must be less than 50 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please entre a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at lest eight character"],
      select: false,
    },
    role: {
      type: String,
      enum: ["RIDER", "DRIVER"],
      default: "RIDER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJWTToken: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      serverConfig.JWT_SECRET,
      {
        expiresIn: serverConfig.JWT_EXPIRY,
      }
    );
  },

  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },
};

const User = model('User',userSchema)

export default User;
