/* eslint-disable semi */
'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const requestSpy = sinon.spy();
const MessengerClient = proxyquire('./index', {'request': requestSpy});

describe('MessengerClient', () => {
  let client;
  const TEST_ID = 0;
  const TEST_TOKEN = 'TEST_TOKEN';
  const TEST_TEXT = 'TEST_TEXT';
  const TEST_CALLBACK = () => {};
  const TEST_BUTTONS = [
    {
      'type': 'postback',
      'payload': TEST_TEXT,
      'title': TEST_TEXT
    },
    {
      'type': 'postback',
      'payload': TEST_TEXT,
      'title': TEST_TEXT
    }
  ];

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

  describe('getUserProfile', () => {
    const correctPayload = {
      method: 'GET',
      qs: {
        access_token: TEST_TOKEN,
        fields: `${TEST_TEXT},${TEST_TEXT}`
      },
      url: `https://graph.facebook.com/v2.6/${TEST_ID}`
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.getUserProfile(TEST_ID, [TEST_TEXT, TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.getUserProfile(TEST_ID, [TEST_TEXT, TEST_TEXT], TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('sendTextMessage', () => {
    const correctPayload = {
      json: {
        message: {
          text: TEST_TEXT
        },
        recipient: {
          id: TEST_ID
        }
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/messages'
    };

    it('returns a promise and creates correct request payload', () => {
      const result = client.sendTextMessage(TEST_ID, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload)
    });

    it('given cb no promise returned and proper request payload generated', () => {
      const result = client.sendTextMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload)
    });
  });

  describe('sendImageMessage', () => {
    const correctPayload = {
      json: {
        message: {
          attachment: {
            payload: {
              is_reusable: true,
              url: TEST_TEXT
            },
            type: 'image'
          }
        },
        recipient: {
          id: TEST_ID
        }
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/messages'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.sendImageMessage(TEST_ID, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.sendImageMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('sendButtonsMessage', () => {
    const correctPayload = {
      json: {
        message: {
          attachment: {
            payload: {
              buttons: TEST_BUTTONS,
              template_type: 'button',
              text: TEST_TEXT
            },
            type: 'template'
          }
        },
        recipient: {
          id: TEST_ID
        }
      },
      method: 'POST',
      qs: {
        access_token: TEST_TOKEN
      },
      url: 'https://graph.facebook.com/v2.6/me/messages'
    };

    it('returns a promise and generates correct request payload given no cb', () => {
      const result = client.sendButtonsMessage(TEST_ID, TEST_TEXT, TEST_BUTTONS);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.sendButtonsMessage(TEST_ID, TEST_TEXT, TEST_BUTTONS, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
