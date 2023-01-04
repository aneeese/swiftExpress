import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    memberID: String,
    membershipPrice: Number,
    membershipPercentage: Number,
    start_date: String,
    end_date: String,
    cardNo: Number,
    securitykey: Number,
    cardExpiry: String
});

const Member = mongoose.model("Member", memberSchema);
export default Member;