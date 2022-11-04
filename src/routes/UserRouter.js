const CustomRouter = require("./Router");
const UserController = require("../controllers/UserController");

const userRouter = new CustomRouter();
const userController = new UserController();

userRouter.addController(userController);

module.exports = userRouter.router;
