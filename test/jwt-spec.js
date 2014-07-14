var jwt = require('../lib/jwt')

describe('JSON Web Token', function() {
  describe('with Symmetric Key', function() {
    var rawToken = 'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lKcWIyNXVlV0lpTENKaGRXUWlPaUoxY200NllYVmthV1Z1WTJVaUxDSmxlSEFpT2pFek1EQTRNVGt6T0RBc0ltaDBkSEE2THk5bGVHRnRjR3hsTG1OdmJTOXBjMTl5YjI5MElqcDBjblZsZlEuUkRWMDVMalZFMzgzNXY0NFFyNjZ0dG03ek9zWGV1Qm5tVUlSMC02YkZGTQ';
    var key = 'pSXeMohHqCpxD3bFrpDLFx9JtKZTDcvn0Tfyd2HZFhw=';
    var token = {
        header: { typ: 'JWT', alg: 'HS256' },
        payload: { iss: 'jonnyb', aud: 'urn:audience', exp: 1300819380, "http://example.com/is_root": true }
      };

    describe('when decoding', function() {
      var decodedToken = jwt.decodeToken(rawToken);

      it('should decode the header', function() {
        decodedToken.header.typ.should.equal('JWT');
        decodedToken.header.alg.should.equal('HS256');
      });

      it('should decode the payload', function() {
        decodedToken.payload.iss.should.equal('jonnyb');
        decodedToken.payload.aud.should.equal('urn:audience');
        decodedToken.payload.exp.should.equal(1300819380);
      });

      it('should validate signature', function() {
        jwt.isSignatureValid(decodedToken, key).should.be.true;
      });

      it ('should validate the audience', function() {
        jwt.isAudienceValid(decodedToken, 'urn:audience').should.be.true;
        jwt.isAudienceValid(decodedToken, 'urn:incorrect').should.be.false;
      });

      it('should validate expiry', function() {
        jwt.isExpired(decodedToken).should.be.true;
      });
    });

    describe('when encoding', function() {
      it('should encode and sign the token', function() {
        var encodedToken = jwt.encodeToken(token, key);
        encodedToken.should.equal(rawToken);
      });
    });
  });

});

