const fs = require('fs');

module.exports = async(req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(500).json({msg: "No Files were Uploaded"});
        }
        const file = req.files.file;
        // if(file.size > 5000 * 5000){
        //     removeTmp(file.tempFilePath);
        //     res.status(500).json({msg: "Size too Large"});
        // }
        if(file.mimetype != 'image/jpeg' && file.mimetype != 'image/png'){
            removeTmp(file.tempFilePath);
            res.status(500).json({msg: "File Format is incorrect"});
        }
        next();
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}