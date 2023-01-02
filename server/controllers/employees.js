import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

// Register Employee
export const register = async (req, res) => {
    try {
        const { fullName, empID, email, password, cnic, contactNo } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newEmployee = new Employee({fullName, empID, email, password: passwordHash,
            cnic, contactNo
        });

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
        const { email, password } = req.body;
        const Employee = await Employee.findOne({ email: email });
        if (!Employee) return res.status(400).json({ msg: "Employee does not exist." });

        const isMatch = await bcrypt.compare(password, Employee.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

        const token = jwt.sign({ id: Employee._id }, process.env.JWT_SECRET);
        delete Employee.password;
        res.status(200).json({ token, Employee });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}