/* eslint-disable semi */
'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

describe('sendMessage', () => {
  const options = { qs: { access_token: undefined } };
  const requestData = { token: 0 };
  const TEST_ERROR = 'TEST_ERROR';
  const TEST_BODY = {success: 'SUCCESS_TEST'};
  const TEST_REQUEST = {};

  describe('callbacks', () => {
    const callbackSpy = sinon.spy();

    beforeEach(() => {
      callbackSpy.reset();
    });

    it('calls cb with error given error', () => {
      const request = (req, cb) => cb(TEST_ERROR);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, TEST_ERROR);
    });

    it('calls cb with body error given no error and body with error', () => {
      const request = (req, cb) => cb(null, TEST_REQUEST, {error: TEST_ERROR});
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, TEST_ERROR);
    });

    it('calls cb with body error given no error and body with error', () => {
      const request = (req, cb) => cb(null, TEST_REQUEST, TEST_BODY);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData, callbackSpy);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(callbackSpy);
      sinon.assert.calledWith(callbackSpy, null, TEST_BODY);
    });
  });

  describe('promises', () => {
    it('rejected promise given error', (done) => {
      const request = (req, cb) => cb(TEST_ERROR);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.catch((err) => {
        expect(err).to.be.equal(TEST_ERROR);
        done();
      });
    });

    it('resolves body constructor object', (done) => {
      const request = (req, cb) => cb(null, TEST_REQUEST, TEST_BODY);
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.then((res) => {
        expect(res).to.be.equal(TEST_BODY);
        done();
      });
    });

    it('resolves body string to object and resolves', (done) => {
      const request = (req, cb) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.then((res) => {
        expect(res).to.deep.equal(TEST_BODY);
        done();
      });
    });

    it('resolves body string to object and rejects given body has error', (done) => {
      const TEST_BODY = {error: {message: TEST_ERROR}};
      const request = (req, cb) => cb(null, TEST_REQUEST, JSON.stringify(TEST_BODY));
      const utils = proxyquire('./utils', {'request': request});

      const result = utils.sendMessage(options, requestData);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      result.catch((err) => {
        expect(err).to.be.equal(TEST_ERROR);
        done();
      });
    });
  });
});
