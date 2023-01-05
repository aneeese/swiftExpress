import Employee from "../models/Employee.js";
import { sendMail } from "../send_email.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Employee
export const register = async (req, res) => {
    try {
        const { fname, lname, emp_id, cnic, email, phoneNo, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newEmployee = new Employee({ avatar: { data: req.file.originalname, contentType: req.file.mimetype },
        fname, lname, emp_id, email, password: passwordHash, cnic, phoneNo });

        newEmployee.save((error) => {
            if (error) res.send(error);
            else res.send("Successfully saved!");
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Logging in
export const login = async (req, res) => {
    try {
        const { emp_id, password } = req.body;
        const Emp = await Employee.findOne({ emp_id: emp_id });
        if (!Emp) return res.status(400).json({ msg: "Employee does not exist." });

        const isMatch = await bcrypt.compare(password, Emp.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

        const token = jwt.sign({ id: Emp._id }, process.env.JWT_SECRET);
        delete Emp.password;
        res.status(200).json({ token, Emp });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Forget Password
export const forgetPass = async (req, res) => {
    try {
        const { emp_id, email } = req.body;
        const Emp = await Employee.findOne({ emp_id: emp_id });
        if (!Emp) return res.status(400).json({ msg: "Employee does not exist." });
        sendMail("aneese421@gmail.com", email);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}