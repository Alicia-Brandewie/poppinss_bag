/*-------------------- Configuration ---------------------*/
const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

/*-------------------- CREATE _ Router logic ---------------------*/


//POST_ new item
router.post('/', async (req, res) => {
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
router.get('/new', async (req, res) => {
    res.render('items/new.ejs')
});



//GET_to show-item.ejs
router.get('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const showItem = currentUser.catalog.id(req.params.itemId);
        res.render('items/show-item.ejs', {
            addedItem: showItem,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


//GET_item to edit
router.get('/:catalogId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); //find current user
        const catalog = currentUser.catalog.id(req.params.catalogId);//find clicked item//
        res.render('/items/edit.ejs', {
            addedItem: catalog,
        });       //send change//
        res.redirect(`/users/${currentUser._id}/items/${req.catalogId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



/*-------------------- UPDATE _ Router logic ---------------------*/
//PUT_edited item into DB
// router.get('/', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id); //find current user
//         const catalog = currentUser.catalog.id(req.params.catalogId);//find clicked item//
//         catalog.set(req.body);
//         await currentUser.save();        //send change//
//         res.redirect(`/users/${currentUser._id}/items/${req.catalogId}`);
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//     }
// });


/*-------------------- DELETE _ Router logic ---------------------*/


/*-------------------- Module ---------------------*/
module.exports = router;