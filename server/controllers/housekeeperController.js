const db = require('../config/database');

exports.showApplications = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Housekeeper") {
            db.query('select * from applications', (err, result) => {
                if (err) {
                    return err;
                } else {
                    res.render('./layouts/housekeeperDashboard', {
                        link1: "Review applications",
                        link1Href: "/housekeeper",
                        link2: "Successful Applications",
                        link2Href: "/housekeeper/successfulapplications",
                        link3Href: "/housekeeper/userdetails",
                        sampleData: result,
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login');
    }
}
exports.viewApplications = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Housekeeper") {
            var id = req.params.id;
            db.query('select * from applications where ApplicationNo=?;', id, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/housekeeper"
                    })
                } else {
                    res.render('./layouts/housekeeperReviewApplications.ejs', {
                        link1: "Review applications",
                        link1Href: "/housekeeper",
                        link2: "Successful Applications",
                        link2Href: "/housekeeper/successfulapplications",
                        link3Href: "/housekeeper/userdetails",
                        sampleData: result,
                    });
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}
exports.reviewApplictions = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Housekeeper") {
            var status = req.body.Status;
            var id = req.params.appNo;
            let params = {
                Status: status
            }
            db.query('Update applications set? where ApplicationNo=?', [params, id], (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/housekeeper"
                    })
                } else {
                    db.query('select * from applications', (err, result) => {
                        if (err) {
                            return err;
                        } else {
                            res.render('./layouts/housekeeperDashboard', {
                                link1: "Review applications",
                                link1Href: "/housekeeper",
                                link2: "Successful Applications",
                                link2Href: "/housekeeper/successfulapplications",
                                link3Href: "/housekeeper/userdetails",
                                sampleData: result,
                            })
                        }
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}
exports.showSuccessfulApplications = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Housekeeper") {
            db.query('select * from applications where Status = "Accepted"', (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/housekeeper"
                    })
                } else {
                    res.render('./layouts/housekeeperSuccessfulApplications', {
                        link1: "Review applications",
                        link1Href: "/housekeeper",
                        link2: "Successful Applications",
                        link2Href: "/housekeeper/successfulapplications",
                        link3Href: "/housekeeper/userdetails",
                        sampleData: result,
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login');
    }
}
exports.viewUserDetails = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Housekeeper") {
            db.query('select * from users where username=?', req.session.user, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/matron"
                    })
                } else {
                    res.render('./layouts/matronUserDetails', {
                        link1: "Review applications",
                        link1Href: "/housekeeper",
                        link2: "Successful applications",
                        link2Href: "/housekeeper/successfulapplications",
                        link3Href: "/housekeeper/userdetails",
                        sampleData: result
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}