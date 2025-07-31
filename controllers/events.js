/*-------------------- Configuration ---------------------*/
const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// ---------------------- CREATE ---------------------//
//POST_ new event
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.calendar.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/events`);
        // res.redirect("events/calendar.ejs", {
        // calendar: currentUser.calendar,
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// ---------------------- READ ---------------------//

//GET_calendar
router.get("/", async (req,res) => { // using single / because base route for this controller 
    try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("events/calendar.ejs", {
        calendar: currentUser.calendar,
    });
    } catch (error) {
    console.log(error);
    res.redirect('/');
    }
});



// router.get("/calendar", async (req,res) => {
//     const currentUser = await User.findById(req.session.user._id);
//     res.render("events/calendar.ejs");
// });



//GET_ new event
router.get('/new', async (req, res) => {
    res.render('events/new.ejs')
});


//GET_to show-event.ejs
// router.get('/:eventId', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//         const showItem = currentUser.calendar.id(req.params.eventId);
//         res.render('events/show-event.ejs', {
//             addedEvent: showEvent,
//         });
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// });


//GET_item to edit
// router.get('/:calendarId/edit', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id); //find current user
//         const catalog = currentUser.calendar.id(req.params.calendarId);//find clicked item//
//         res.render('events/edit.ejs', {
//             addedEvent: calendar,
//         });       
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// });

// ---------------------- UPDATE ---------------------//
// ---------------------- DELETE ---------------------//

/*-------------------- Module ---------------------*/
module.exports = router;
