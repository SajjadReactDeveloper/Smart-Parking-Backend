const Complaint = require('../models/Complaints');

exports.addComplaint = async(req, res) => {
    try {
        // const {category, subCategory, type, title, description, userId} = req.body;
        const {type, title, description, userId} = req.body;

        // const complaint = new Complaint({
        //     category, subCategory, type, title, description, userId
        // })
        const complaint = new Complaint({
            type, title, description, userId
        })
        complaint.save();
        res.json({msg: "Your Complaint has been registered"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.find({status: "Active"});
        res.json(complaint)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.a = async (req, res) => {
    console.log("Hello");
    res.json('Hello')
}

exports.viewSpecificComplaint = async (req, res) => {
    try {
        console.log(req.params.id)
        const complaint = await Complaint.find({userId: req.params.id});
        res.json(complaint)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewAllComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.find({});
        res.json(complaint)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.getStatus = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        res.json(complaint);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteComplaint = async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.changeStatus = async(req, res) => {
    try {
        await Complaint.findByIdAndUpdate(req.params.id, {status: "closed"});
        res.json({msg: "Status Updated"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}