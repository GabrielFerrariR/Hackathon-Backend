const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

chai.use(chaiHttp);

const { expect } = chai;

const UserController = require("../../../src/controllers/UserController");
const [userMockDBResponse, userMockRequest] = require("../../mocks/userMock");

describe("User controller class", () => {
  const controller = new UserController();
  const req = {};
  const res = {};
  const next = () => {};

  describe("create method, on a successful request", () => {
    beforeEach(async () => {
      req.body = userMockRequest;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(controller.service, "create").resolves(userMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 201", async () => {
      await controller.create(req, res, next);
      expect(res.status.calledWith(201)).to.be.true;
    });
  });

  describe("read method, on a successful request", () => {
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(controller.service, "read").resolves([userMockDBResponse]);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.read(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return an array of users", async () => {
      await controller.read(req, res, next);
      expect(res.json.calledWith([userMockDBResponse])).to.be.true;
    });
  });

  describe("readById method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: userMockDBResponse._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(controller.service, "readById").resolves(userMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.readById(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return an user with an id", async () => {
      await controller.readById(req, res, next);
      expect(res.json.calledWith(userMockDBResponse)).to.be.true;
    });
  });

  describe("update method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: userMockDBResponse._id };
      req.body = userMockRequest;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(controller.service, "update").resolves(userMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe("delete method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: userMockDBResponse._id };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(controller.service, "delete").resolves([]);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.delete(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });
  describe("toggleCompletedComponent method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: userMockDBResponse._id, contentId: 1 };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      sinon.stub(controller.service, "toggleCompletedContent").resolves(null);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.toggleCompletedContent(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });
});
