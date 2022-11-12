const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

chai.use(chaiHttp);

const { expect } = chai;

const ContentController = require("../../../src/controllers/ContentController");
const [contentMockDBResponse, contentMockRequest] = require("../../mocks/contentMock");

describe("Content controller class", () => {
  const controller = new ContentController();
  const req = {};
  const res = {};
  const next = () => {};

  describe("create method, on a successful request", () => {
    beforeEach(async () => {
      req.body = contentMockRequest;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(controller.service, "create").resolves(contentMockDBResponse);
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
      sinon.stub(controller.service, "read").resolves([contentMockDBResponse]);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.read(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return an array of users", async () => {
      await controller.read(req, res, next);
      expect(res.json.calledWith([contentMockDBResponse])).to.be.true;
    });
  });

  describe("readById method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: contentMockDBResponse._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(controller.service, "readById").resolves(contentMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.readById(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should return an user with an id", async () => {
      await controller.readById(req, res, next);
      expect(res.json.calledWith(contentMockDBResponse)).to.be.true;
    });
  });

  describe("update method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: contentMockDBResponse._id };
      req.body = contentMockRequest;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(controller.service, "update").resolves(contentMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe("delete method, on a successful request", () => {
    beforeEach(async () => {
      req.params = { id: contentMockDBResponse._id };
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
});
