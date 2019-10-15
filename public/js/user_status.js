var express = require("express");
const router = express.Router();



router.get('/profile/getinfo', function(req, res) {
    check_member_token_and_status();
})