const db = require('../config/database');
exports.homepage = async (req, res) => {
    db.query('select * from hostels', (err, result) => {
        if (err) {
            return err;
        } else {
            res.render('./layouts/studentdashboard', {
                sampleData: result,
            })
        }
    })
}
exports.applicationDetails = async (req, res)=>{
    db.query('select * from applications', (err, result)=>{
        if (err) {
            return err;
        } else {
            res.render('./layouts/studentApplicationDetails', {
                sampleData: result
            })
        }
    })
}
exports.userDetails = async (req, res)=>{
    db.query('select * from users', (err, result)=>{
        if (err) {
            return err;
        } else {
            res.render('./layouts/studentdashboard', {
                sampleData: result
            })
        }
    })
}