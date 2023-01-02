import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullName: String,
    empID: String,
    email: String,
    password: String,
    cnic: String,
    contactNo: String
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;