const chai = require("chai");
const sinon = require("sinon");

const subtracks = require('../../../src/enums/subtracks');
const tracks = require('../../../src/enums/tracks');
const BadRequest = require('../../../src/errors/BadRequest');
const helper = require('../../../src/helpers');

const { expect } = chai;

const ContentService = require("../../../src/services/ContentService");
const [contentMockDBResponse, contentMockRequest, likeRequest] = require("../../mocks/contentMock");

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
  describe("like method, on a successful request", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "like").resolves(likeRequest);
    });
    after(sinon.restore);

    it("should return an object with _id and likes", async () => {
      const result = await contentService.likeContent(likeRequest._id);
      expect(result).to.be.deep.equal(likeRequest);
    });
  });

  describe("like method, if passed a wrong id", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "like").resolves(false);
    });
    after(sinon.restore);

    it("should return an object with _id and likes", async () => {
      try {
        await contentService.likeContent("fake id");
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequest);
        expect(error.message).to.be.have.string("Content not found.");
      }
    });
  });

  describe("dislike method, on a successful request", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "dislike").resolves(likeRequest);
    });
    after(sinon.restore);

    it("should return an object with _id and likes", async () => {
      const result = await contentService.dislikeContent(likeRequest._id);
      expect(result).to.be.deep.equal(likeRequest);
    });
  });

  describe("dislike method, if passed a wrong id", () => {
    beforeEach(async () => {
      sinon.stub(contentService.model, "dislike").resolves(false);
    });
    after(sinon.restore);

    it("should return an object with _id and likes", async () => {
      try {
        await contentService.dislikeContent("fake id");
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequest);
        expect(error.message).to.be.have.string("Content not found.");
      }
    });
  });
});
