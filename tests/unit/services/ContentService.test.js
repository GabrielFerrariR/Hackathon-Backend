const chai = require("chai");
const sinon = require("sinon");

const subtracks = require('../../../src/enums/subtracks');
const tracks = require('../../../src/enums/tracks');
const BadRequest = require('../../../src/errors/BadRequest');
const helper = require('../../../src/helpers');

const { expect } = chai;

const ContentService = require("../../../src/services/ContentService");
const [contentMockDBResponse, contentMockRequest] = require("../../mocks/contentMock");

describe("Content Service", () => {
  const contentService = new ContentService();

  describe("create method, on a successful request", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "create").resolves(contentMockDBResponse);
      sinon.stub(helper, "getPreviewData").resolves(true);
    });
    afterEach(sinon.restore);

    it("should return a object with content created on db", async () => {
      const result = await contentService.create(contentMockRequest);
      expect(result).to.be.equal(contentMockDBResponse);
    });
  });
  describe("create method, on fail request", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "create").resolves(contentMockDBResponse);
    });
    afterEach(sinon.restore);
    it("should throw a BadRequest if pass an invalid schema", async () => {
      try {
        await contentService.create({ invalidSchema: "invalid" });
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequest);
        expect(error.message).to.be.have.string("is required");
      }
    });
  });

  describe("read method, on a successful request", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "read").resolves([contentMockDBResponse]);
    });
    after(sinon.restore);

    it("should return an array of contents", async () => {
      const result = await contentService.read({ track: tracks.fullstack, subtrack: subtracks.basics });
      expect(result).to.be.deep.equal([contentMockDBResponse]);
    });
  });
});
