const Response = require('../models/ComplaintResponse');

exports.addResponse = async (req, res) => {
    try {
        const {userId, complaintId, response} = req.body;
        const newResponse = new Response({
            userId, complaintId, response
        })
        await newResponse.save();
        res.json({msg: "Response has been Send"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewSpecificResponse = async(req, res) => {
    try {
        const {userId, complaintId} = req.body;
        const response = await Response.findOne({$and: [{userId: userId}, {complaintId: complaintId}]});
        res.json(response)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}