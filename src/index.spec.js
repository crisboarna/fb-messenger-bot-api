/* eslint-disable semi */
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const requestSpy = sinon.spy();
const MessengerClient = proxyquire('./index', {'request': requestSpy});

describe('MessengerClient', () => {
  let client;
  const TEST_TOKEN = 'TEST_TOKEN';
  const TEST_TEXT = 'TEST_TEXT';
  const TEST_CALLBACK = () => {
  };

  beforeEach(() => {
    requestSpy.reset();
    client = new MessengerClient(TEST_TOKEN);
  });

  describe('setGreetingMessage', () => {
    const correctPayload = {
      json: {
        greeting: {
          text: TEST_TEXT
        },
        setting_type: 'greeting'
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/thread_settings'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.setGreetingMessage(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      let result = client.setGreetingMessage(TEST_TEXT, TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
