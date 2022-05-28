const Message = require('../models/Message');
const User = require('../models/User');

exports.NewMessage = async(req, res) => {
    const dbMessage = req.body;
    console.log(dbMessage)
    Message.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send({msg: 'New Mesage'});
        }
    })
}

exports.searchUser = async(req, res) => {
    try {
        const {keyword} = req.body;
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.viewMessage = (req, res) => {
    Message.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data);
        }
    })
}


exports.specificMessage = async(req, res) => {
    try {
        const {receiver} = req.body;
        const complaint = await Message.find({$or: [{receiver: receiver}, {sender: receiver}]});
        res.json(complaint)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.specificMessageSort = async(req, res) => {
    try {
        const {receiver} = req.body;
        const count = await Message.find({receiver: receiver}).count({});
        const complaint = await Message.find({receiver: receiver}).skip(count - 1);
        res.json(complaint);
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteMessage = async(req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({msg: 'Deleted'});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.deleteAllMessages = async(req, res) => {
    try {
        const {id} = req.body;
        await Message.deleteMany({$or: [{receiver: id}, {sender: id}]});
        res.json({msg: 'Deleted'});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}