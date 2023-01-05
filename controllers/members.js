import Member from "../models/Member.js";

// Create
export const createMember = (req, res) => {
    try {
        const newMember = new Member({
            memberID: req.body.memberID,
            membershipPrice: req.body.membershipPrice,
            membershipPercentage: req.body.membershipPercentage,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            cardNo: req.body.cardNo,
            securitykey: req.body.securitykey,
            cardExpiry: req.body.cardExpiry
        });
    
        newMember.save((error) => {
            if (error) res.send(error);
            else res.send("Successfully saved!");
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}