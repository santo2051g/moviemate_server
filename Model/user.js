import mongoose from "mongoose";

const credSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // add unique to avoid duplicates
  password: { type: String, required: true },
  role: { type: String, default: "public" },
});


const Cred = mongoose.model("moviemate_cred", credSchema);

export default Cred;