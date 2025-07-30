/*-------------------- Configuration ---------------------*/
const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// ---------------------- CREATE ---------------------//


// ---------------------- READ ---------------------//

//GET_calendar
// router.get("/calendar", async (req,res) => {
//     try {
//     const currentUser = await User.findById(req.session.user._id);
//     res.render("events/calendar.ejs", {
//         calendar: currentUser.calendar,
//     });
//     } catch (error) {
//     console.log(error);
//     res.redirect('/');
//     }
// });


router.get("/calendar", async (req,res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render("events/calendar/ejs");
});

// ---------------------- UPDATE ---------------------//
// ---------------------- DELETE ---------------------//

/*-------------------- Module ---------------------*/
module.exports = router;
