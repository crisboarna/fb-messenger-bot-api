/* eslint-disable semi */
'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const requestSpy = sinon.spy();
const sendMessage = proxyquire('../util/utils', {'request': requestSpy});
const facebook = proxyquire('./profile', {'../util/utils': sendMessage});

describe('Profile', () => {
  let client;
  const TEST_TOKEN = 'TEST_TOKEN';
  const TEST_TEXT = 'TEST_TEXT';
  const TEST_CALLBACK = () => {};

  beforeEach(() => {
    requestSpy.reset();
    client = new facebook.Profile(TEST_TOKEN);
  });

  describe('constructor', () => {
    it('should create request with only access token given token no proxy', () => {
      const correctPayload = {
        json: {
          greeting: {
            text: 'TEST_TEXT'
          },
          setting_type: 'greeting'
        },
        method: 'POST',
        qs: { access_token: 'TEST_TOKEN' },
        url: 'https://graph.facebook.com/v2.6/me/thread_settings'
      };

      client = new facebook.Profile(TEST_TOKEN);

      const result = client.setGreetingMessage(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should create request with access token and proxy', () => {
      const correctPayload = {
        json: {
          greeting: {
            text: 'TEST_TEXT'
          },
          setting_type: 'greeting'
        },
        method: 'POST',
        proxy: 'http://TEST_TEXT:TEST_TEXT',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: 'https://graph.facebook.com/v2.6/me/thread_settings'
      };

      client = new facebook.Profile(TEST_TOKEN, {hostname: TEST_TEXT, port: TEST_TEXT});

      const result = client.setGreetingMessage(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('throw error given bad proxy object', () => {
      expect(() => new facebook.Profile(TEST_TOKEN, TEST_TEXT)).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.Profile(TEST_TOKEN, {host: TEST_TEXT, port: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.Profile(TEST_TOKEN, {hostname: TEST_TEXT, prt: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });
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

  describe('setGetStartedAction', () => {
    const correctPayload = {
      json: {
        call_to_actions: [
          {
            payload: TEST_TEXT
          }
        ],
        setting_type: 'call_to_actions',
        thread_state: 'new_thread'
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/thread_settings'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.setGetStartedAction(TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.setGetStartedAction(TEST_TEXT, TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('setPersistentMenu', () => {
    const correctPayload = {
      json: {
        persistent_menu: [
          {
            call_to_actions: [TEST_TEXT],
            locale: 'default'
          }
        ],
        setting_type: 'call_to_actions',
        thread_state: 'existing_thread'
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/messenger_profile'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.setPersistentMenu([TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.setPersistentMenu([TEST_TEXT], TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
