const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

chai.use(chaiHttp);

const { expect } = chai;

const LoginController = require("../../../src/controllers/LoginController");
const [userMockDBResponse, _, loginMockRequest] = require("../../mocks/userMock");

describe("Login controller class", () => {
  const controller = new LoginController();
  const req = {};
  const res = {};
  const next = () => {};

  describe("create method, on a successful request", () => {
    beforeEach(async () => {
      req.body = loginMockRequest;
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      sinon.stub(controller.service, "validateLogin").resolves(userMockDBResponse);
    });

    afterEach(() => sinon.restore());

    it("should return a status 200", async () => {
      await controller.create(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
    });
  });
});
