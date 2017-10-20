/* eslint-disable semi */
'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const requestSpy = sinon.spy();
const sendMessage = proxyquire('../util/utils', {'request': requestSpy});
const facebook = proxyquire('./client', {'../util/utils': sendMessage});

describe('Client', () => {
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
    client = new facebook.MessagingClient(TEST_TOKEN);
  });

  describe('constructor', () => {
    it('should create request with only access token given token no proxy', () => {
      const correctPayload = {
        method: 'GET',
        qs: {
          access_token: 'TEST_TOKEN',
          fields: 'TEST_TEXT'
        },
        url: `https://graph.facebook.com/v2.10/${TEST_ID}`
      };

      client = new facebook.MessagingClient(TEST_TOKEN);

      const result = client.getUserProfile(TEST_ID, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should create request with access token and proxy', () => {
      const correctPayload = {
        method: 'GET',
        qs: {
          access_token: 'TEST_TOKEN',
          fields: `${TEST_TEXT}`
        },
        url: `https://graph.facebook.com/v2.10/${TEST_ID}`,
        proxy: `http://${TEST_TEXT}:${TEST_TEXT}`
      };

      client = new facebook.MessagingClient(TEST_TOKEN, {hostname: TEST_TEXT, port: TEST_TEXT});

      const result = client.getUserProfile(TEST_ID, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should create request with access token and proxy with full http path', () => {
      const correctPayload = {
        method: 'GET',
        qs: {
          access_token: 'TEST_TOKEN',
          fields: `${TEST_TEXT}`
        },
        url: `https://graph.facebook.com/v2.10/${TEST_ID}`,
        proxy: `http://${TEST_TEXT}:${TEST_TEXT}`
      };

      client = new facebook.MessagingClient(TEST_TOKEN, {hostname: `http://${TEST_TEXT}`, port: TEST_TEXT});

      const result = client.getUserProfile(TEST_ID, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('throw error given bad proxy object', () => {
      expect(() => new facebook.MessagingClient(TEST_TOKEN, TEST_TEXT)).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.MessagingClient(TEST_TOKEN, {host: TEST_TEXT, port: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.MessagingClient(TEST_TOKEN, {hostname: TEST_TEXT, prt: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });
  });

  describe('markSeen', () => {
    const correctPayload = {
      json: {
        recipient: {
          id: 0
        },
        sender_action: 'mark_seen'
      },
      method: 'POST',
      qs: {
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
    };

    it('returns promise given no cb and generates correct payload', () => {
      const result = client.markSeen(TEST_ID);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.markSeen(TEST_ID, TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('toggleTyping', () => {
    describe('on', () => {
      const correctPayload = {
        json: {
          recipient: {
            id: 0
          },
          sender_action: 'typing_on'
        },
        method: 'POST',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: 'https://graph.facebook.com/v2.10/me/messages'
      };

      it('returns promise given no cb and generates correct payload', () => {
        const result = client.toggleTyping(TEST_ID, true);

        expect(typeof result.then).to.be.equal('function');
        expect(typeof result.catch).to.be.equal('function');
        sinon.assert.calledOnce(requestSpy);
        sinon.assert.calledWith(requestSpy, correctPayload);
      });

      it('given cb no promise returned and correct payload generated', () => {
        const result = client.toggleTyping(TEST_ID, true, TEST_CALLBACK);

        expect(typeof result).to.equal('undefined');
        sinon.assert.calledOnce(requestSpy);
        sinon.assert.calledWith(requestSpy, correctPayload);
      });
    });

    describe('off', () => {
      const correctPayload = {
        json: {
          recipient: {
            id: 0
          },
          sender_action: 'typing_off'
        },
        method: 'POST',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: 'https://graph.facebook.com/v2.10/me/messages'
      };

      it('returns promise given no cb and generates correct payload', () => {
        const result = client.toggleTyping(TEST_ID, false);

        expect(typeof result.then).to.be.equal('function');
        expect(typeof result.catch).to.be.equal('function');
        sinon.assert.calledOnce(requestSpy);
        sinon.assert.calledWith(requestSpy, correctPayload);
      });

      it('given cb and no toggle then no promise returned and correct payload generated', () => {
        const result = client.toggleTyping(TEST_ID, TEST_CALLBACK);

        expect(typeof result).to.equal('undefined');
        sinon.assert.calledOnce(requestSpy);
        sinon.assert.calledWith(requestSpy, correctPayload);
      });

      it('given cb no promise returned and correct payload generated', () => {
        const result = client.toggleTyping(TEST_ID, false, TEST_CALLBACK);

        expect(typeof result).to.equal('undefined');
        sinon.assert.calledOnce(requestSpy);
        sinon.assert.calledWith(requestSpy, correctPayload);
      });
    });
  });

  describe('getUserProfile', () => {
    const correctPayload = {
      method: 'GET',
      qs: {
        access_token: 'TEST_TOKEN',
        fields: `${TEST_TEXT},${TEST_TEXT}`
      },
      url: `https://graph.facebook.com/v2.10/${TEST_ID}`
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.getUserProfile(TEST_ID, [TEST_TEXT, TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('returns promise given no cb and no fields and generates correct request payload', () => {
      const correctPayload = {
        method: 'GET',
        qs: {
          access_token: 'TEST_TOKEN',
          fields: `first_name`
        },
        url: `https://graph.facebook.com/v2.10/${TEST_ID}`
      };

      const result = client.getUserProfile(TEST_ID);

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
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
    };

    it('returns a promise and creates correct request payload', () => {
      const result = client.sendTextMessage(TEST_ID, TEST_TEXT);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and proper request payload generated', () => {
      const result = client.sendTextMessage(TEST_ID, TEST_TEXT, TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
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
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
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
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
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

  describe('sendGenericTemplateMessage', () => {
    const correctPayload = {
      json: {
        message: {
          attachment: {
            payload: {
              elements: [TEST_TEXT],
              template_type: 'generic'
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
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.sendGenericTemplateMessage(TEST_ID, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.sendGenericTemplateMessage(TEST_ID, [TEST_TEXT], TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('sendListMessage', () => {
    const correctPayload = {
      json: {
        message: {
          attachment: {
            payload: {
              buttons: ['TEST_TEXT'],
              elements: ['TEST_TEXT'],
              template_type: 'list',
              top_element_style: 'large'
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
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
    };

    it('returns promise given no cb and no correct firstElementType generates correct request payload', () => {
      const result = client.sendListMessage(TEST_ID, [TEST_TEXT], TEST_TEXT, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('returns promise given no cb and no firstElementType and generates correct request payload', () => {
      const result = client.sendListMessage(TEST_ID, [TEST_TEXT], TEST_TEXT, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('returns promise given no cb and compact firstElementType and generates correct request payload', () => {
      const correctPayload = {
        json: {
          message: {
            attachment: {
              payload: {
                buttons: ['TEST_TEXT'],
                elements: ['TEST_TEXT'],
                template_type: 'list',
                top_element_style: 'compact'
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
          access_token: 'TEST_TOKEN'
        },
        url: 'https://graph.facebook.com/v2.10/me/messages'
      };

      const result = client.sendListMessage(TEST_ID, [TEST_TEXT], 'compact', [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.sendListMessage(TEST_ID, [TEST_TEXT], TEST_TEXT, [TEST_TEXT], TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('sendQuickReplyMessage', () => {
    const correctPayload = {
      json: {
        message: {
          text: TEST_TEXT,
          quick_replies: [TEST_TEXT]
        },
        recipient: {
          id: TEST_ID
        }
      },
      method: 'POST',
      qs: {
        access_token: 'TEST_TOKEN'
      },
      url: 'https://graph.facebook.com/v2.10/me/messages'
    };

    it('returns promise given no cb and generates correct request payload', () => {
      const result = client.sendQuickReplyMessage(TEST_ID, TEST_TEXT, [TEST_TEXT]);

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should make request with correct payload given non-text input', () => {
      let correctPayload = {
        json: {
          message: {
            attachment: {
              attachment: {
                payload: { elements: ['TEST_TEXT'], template_type: 'generic' },
                type: 'template'
              }
            },
            quick_replies: ['TEST_TEXT']
          },
          recipient: {
            id: TEST_ID
          }
        },
        method: 'POST',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: 'https://graph.facebook.com/v2.10/me/messages'
      };

      client.sendQuickReplyMessage(TEST_ID, [TEST_TEXT], [TEST_TEXT]);

      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      const result = client.sendQuickReplyMessage(TEST_ID, TEST_TEXT, [TEST_TEXT], TEST_CALLBACK);

      expect(result).to.equal(undefined);
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
