/*-------------------- Configuration ---------------------*/
const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

/*-------------------- Router logic ---------------------*/

// router.get('/', (req,res) => {
//     res.render('items/display-items.ejs');
// });


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('items/display-items.ejs', {
            catalog: currentUser.catalog,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//GET_ new item
router.get('/new', async (req,res) =>{
    res.render('items/new.ejs');
});

/*-------------------- Module ---------------------*/
module.exports = router;