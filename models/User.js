import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    usercnic: String,
    userEmail: String,
    contactNo: String,
    isMember: Boolean,
    package: [
        {
            packageID: String,
            sourceCity: String,
            destinationCity: String,
            destPostalCode: String,
            destAddress: String,
            packageWeight: String,
            sensitivity: Boolean,
            estimatedCost: Number,
            isDelivered: Boolean
        }
    ]
});

const User = mongoose.model("User", userSchema);
export default User;