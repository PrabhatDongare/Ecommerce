const express = require('express');
const router = express.Router();

const { showCategory, editAddCategory, editDeleteCategory, generateCategory } = require('../Controller/CategoryController')
const fetchuser = require('../middleware/fetchuser')

router.get("/show", fetchuser, showCategory);  // this will have pagination
router.post("/editAdd", fetchuser,editAddCategory); // used for add cd value
router.delete("/editDelete", fetchuser,editDeleteCategory); // used for delete cb value
router.post("/generate", generateCategory);

module.exports = router;
