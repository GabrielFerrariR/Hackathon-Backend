const CustomRouter = require("./Router");
const UserController = require("../controllers/UserController");

class UserRouter extends CustomRouter {
  constructor() {
    super();

    this.addController = this.addController.bind(this);
  }

  addController(controller, route = controller.route) {
    this.router.post(route, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readById);
    this.router.put(`${route}/:id`, controller.update);
    this.router.patch(`${route}/:id/:contentId`, controller.toggleCompletedContent);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

module.exports = CustomRouter;

const userRouter = new UserRouter();
const userController = new UserController();

userRouter.addController(userController);

module.exports = userRouter.router;
