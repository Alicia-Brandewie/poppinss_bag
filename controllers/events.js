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
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// ---------------------- READ ---------------------//

//GET_calendar
router.get("/", async (req, res) => {
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

router.get('/new', async (req, res) => {
    try {
            const currentUser = await User.findById(req.session.user._id);
            console.log(currentUser);
                res.render('events/new.ejs', {catalog:currentUser.catalog})
    } catch (error) {
            console.log(error);
            res.redirect('/');
    }
});

//GET_to show-event.ejs
router.get('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const showEvent = currentUser.calendar.id(req.params.eventId);
        res.render('events/show-event.ejs', {
            addedEvent: showEvent,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//GET_event to edit
router.get('/:calendarId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const calendar = currentUser.calendar.id(req.params.calendarId);
        res.render('events/edit.ejs', {
            addedEvent: calendar,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// ---------------------- UPDATE ---------------------//

//PUT_edited event into DB
router.put('/:calendarId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const calendar = currentUser.calendar.id(req.params.calendarId);
        calendar.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/events/${req.params.calendarId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// ---------------------- DELETE ---------------------//

//DELETE_remove addedItem
router.delete('/:calendarId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.calendar = currentUser.calendar.filter(event => event._id.toString() !== req.params.calendarId);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/events`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/*-------------------- Module ---------------------*/

module.exports = router;
