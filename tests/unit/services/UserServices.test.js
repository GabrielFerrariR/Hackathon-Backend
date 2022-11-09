const chai = require("chai");
const sinon = require("sinon");
const BadRequest = require("../../../src/errors/BadRequest");
const Conflict = require("../../../src/errors/Conflict");
const Unauthorized = require("../../../src/errors/Unauthorized");

const { expect } = chai;

const UserService = require("../../../src/services/UserService");
const [userMockDBResponse, userMockRequest] = require("../../mocks/userMock");

describe('User Service', () => {
  const userService = new UserService();

  describe('create method, on a successful request',() => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "create")
        .resolves(userMockDBResponse);
      sinon.stub(userService, "validateUniqueEmail").resolves(true);
      sinon.stub(userService, "validateUniqueUsername").resolves(true) ;   
    })
    after(sinon.restore)
    it('should return a object with user created on db', async () => {
      const result = await userService.create(userMockRequest);
      expect(result).to.be.equal(userMockDBResponse)
    })
  })
  describe('create method, on fail request',() => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "create")
        .resolves(userMockDBResponse); 
    })
    afterEach(sinon.restore)
    it('should throw an BadRequest if pass an invalid schema', async () => {
      try {
        sinon.stub(userService, "validateUniqueEmail").resolves(true);
        sinon.stub(userService, "validateUniqueUsername").resolves(true) ;  
        await userService.create({ invalidSchema: "invalid"});
        expect(false).to.be.true
      } catch (error) {
        expect(error).to.be.instanceOf(BadRequest);
        expect(error.message).to.be.have.string('is required');
      }
    })

    it('should throw an Conflict if pass already used email', async () => {
      sinon.stub(userService.model, "readEmail").resolves(true);
      sinon.stub(userService, "validateUniqueUsername").resolves(true) ;  
      try {
        await userService.create(userMockRequest);
        expect(false).to.be.true
      } catch (error) {
        expect(error).to.be.instanceOf(Conflict);
        expect(error.message).to.be.have.string('Email already in use');
      }
    })


    it('should throw an Conflict if pass already used username', async () => {
      sinon.stub(userService, "validateUniqueEmail").resolves(true);  
      sinon.stub(userService.model, "readUsername").resolves(true);
      try {
        await userService.create(userMockRequest);
        expect(false).to.be.true
      } catch (error) {
        expect(error).to.be.instanceOf(Conflict);
        expect(error.message).to.be.have.string('Username already in use');
      }
    })
  })

  describe('read method, on a successful request', () => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "read")
        .resolves([userMockDBResponse]);   
    });
    after(sinon.restore);

    it('should return an array of users', async () => {
      const result = await userService.read();
      expect(result).to.be.deep.equal([userMockDBResponse])
    })
  }
  )
  // describe('readById method')
  describe('readById method, on a successful request', () => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "readById")
        .resolves(userMockDBResponse);   
    });
    after(sinon.restore);
    
    it('should return an user', async () => {
      const result = await userService.readById(userMockDBResponse._id);
      expect(result).to.be.equal(userMockDBResponse)
    })
  }
  )
  describe('update method, on a successful request', () => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "update")
        .resolves(userMockDBResponse);   
    });
    after(sinon.restore);
    
    it('should return an updated user', async () => {
      const result = await userService.update(userMockRequest);
      expect(result).to.be.equal(userMockDBResponse)
    })
  }
  )
  describe('delete method, on a successful request', () => {
    beforeEach(async () => {
      sinon
        .stub(userService.model, "delete")
        .resolves(userMockDBResponse);   
    });
    after(sinon.restore);
    
    it('should return an user', async () => {
      const result = await userService.delete(userMockDBResponse._id);
      expect(result).to.be.equal(userMockDBResponse)
    })
  }
  )

  describe('validateLogin method, on a successful request', () => {
    beforeEach(async () => {
      sinon.stub(userService.model, "readLogin").resolves(userMockDBResponse);
    })
    afterEach(sinon.restore)
    it('should return a valid user', async () => {
      const result = await userService.validateLogin(userMockRequest);
      expect(result).to.be.equal(userMockDBResponse)
    })
  })

  describe('validateLogin method, on a fail request', () => {
    beforeEach(async () => {
      sinon.stub(userService.model, "readLogin").resolves(false);
    })
    afterEach(sinon.restore)
    it('should return an Unauthorized error', async () => {
      try {
        await userService.validateLogin(userMockRequest);
        expect(false).to.be.true;
      } catch (error) {
        expect(error).to.be.instanceof(Unauthorized)
        expect(error.message).to.be.equal('The username or password is incorrect')
      }
    })
  })
})