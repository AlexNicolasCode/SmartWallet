const User = require('../model/userModel');
// Handle index actions
exports.index = (req, res) => {
    User.get((err, result) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: result
        });
    });
};