const express = require("express");
const router = express.Router();
router.use(require("./empRoleRoutes"));
router.use(require("./deptRoutes"));
router.use(require("./empRoutes"));
module.exports = router;