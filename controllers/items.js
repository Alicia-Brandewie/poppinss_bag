/*-------------------- Configuration ---------------------*/
const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

/*-------------------- CREATE _ Router logic ---------------------*/


//POST_ new item
router.post ('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.catalog.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/items`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



/*-------------------- READ _ Router logic ---------------------*/

//GET_login page
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('items/display-catalog.ejs', {
            catalog: currentUser.catalog,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//GET_ new item
router.get('/new', async (req,res) =>{
    res.render('items/new.ejs')
});






/*-------------------- UPDATE _ Router logic ---------------------*/

/*-------------------- DELETE _ Router logic ---------------------*/


/*-------------------- Module ---------------------*/
module.exports = router;