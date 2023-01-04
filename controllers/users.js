import User from "../models/User.js";
import Member from "../models/Member.js";

// Create
export const createUser = (req, res) => {
    try {
        var packageInfo = {
            packageID: req.body.packageID,
            sourceCity: req.body.sourceCity,
            destinationCity: req.body.destinationCity,
            destPostalCode: req.body.destPostalCode,
            destAddress: req.body.destAddress,
            packageWeight: req.body.packageWeight,
            sensitivity: req.body.sensitivity,
            estimatedCost: req.body.estimatedCost,
            isDelivered: false
        }

        User.findOne({ usercnic: req.body.usercnic }, (error, user) => {
            if (error) console.log(error);
            else {
                if (user) {
                    if (user.isMember) {
                        Member.findOne({ memberID: req.body.usercnic }, (error, member) => {
                            //const money = member.membershipType;
                            packageInfo.estimatedCost = 150;
                            console.log("Estimateddd");
                        })
                    }
                    user.package.push(packageInfo);
                    user.save(() => res.send("Saved!!!!"));
                } else {
                    const newUser = new User({
                        fullName: req.body.fullName,
                        usercnic: req.body.usercnic,
                        userEmail: req.body.userEmail,
                        contactNo: req.body.contactNo,
                        isMember: false
                    });
                    newUser.save((error) => {
                        if (!error) {
                            newUser.package.push(packageInfo);
                            newUser.save();
                            res.send("Saved!!!");
                        } else res.send(error);
                    })
                }
            }
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}