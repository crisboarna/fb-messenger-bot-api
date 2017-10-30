/* eslint-disable semi */
'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const requestSpy = sinon.spy();
const sendMessage = proxyquire('../util/utils', {'request': requestSpy});
const facebook = proxyquire('./page', {'../util/utils': sendMessage});

describe('Page', () => {
  let page;
  const TEST_PAGE_ID = 'TEST_PAGE_ID';
  const TEST_TOKEN = 'TEST_TOKEN';
  const TEST_TEXT = 'TEST_TEXT';
  const TEST_CALLBACK = () => {};

  beforeEach(() => {
    requestSpy.reset();
  });

  describe('constructor', () => {
    it('should create request with only access token given token no proxy', () => {
      const correctPayload = {
        json: {
          caption: TEST_TEXT,
          url: TEST_TEXT
        },
        method: 'POST',
        qs: { access_token: 'TEST_TOKEN' },
        url: `https://graph.facebook.com/v2.10/${TEST_PAGE_ID}/photos`
      };

      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN);

      const result = page.imageUrl(TEST_TEXT).imageCaption(TEST_TEXT).sendImage();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should create request with access token and proxy', () => {
      const correctPayload = {
        json: {
          caption: TEST_TEXT,
          url: TEST_TEXT
        },
        method: 'POST',
        proxy: 'http://TEST_TEXT:TEST_TEXT',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: `https://graph.facebook.com/v2.10/${TEST_PAGE_ID}/photos`
      };

      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN, {hostname: TEST_TEXT, port: TEST_TEXT});

      const result = page.imageUrl(TEST_TEXT).imageCaption(TEST_TEXT).sendImage();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('should create request with access token and proxy with full http path', () => {
      const correctPayload = {
        json: {
          caption: TEST_TEXT,
          url: TEST_TEXT
        },
        method: 'POST',
        proxy: 'http://TEST_TEXT:TEST_TEXT',
        qs: {
          access_token: 'TEST_TOKEN'
        },
        url: `https://graph.facebook.com/v2.10/${TEST_PAGE_ID}/photos`
      };

      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN, {hostname: `http://${TEST_TEXT}`, port: TEST_TEXT});

      const result = page.imageUrl(TEST_TEXT).imageCaption(TEST_TEXT).sendImage();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('throw error given bad proxy object', () => {
      expect(() => new facebook.Page(TEST_PAGE_ID, TEST_TOKEN, TEST_TEXT)).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.Page(TEST_PAGE_ID, TEST_TOKEN, {host: TEST_TEXT, port: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });

    it('throw error given bad proxy object properties', () => {
      expect(() => new facebook.Page(TEST_PAGE_ID, TEST_TOKEN, {hostname: TEST_TEXT, prt: TEST_TEXT})).to.throw();
      sinon.assert.notCalled(requestSpy);
    });
  });

  describe('sendImage', () => {
    const correctPayload = {
      json: {
        caption: TEST_TEXT,
        url: TEST_TEXT
      },
      method: 'POST',
      qs: {
        access_token: 'TEST_TOKEN'
      },
      url: `https://graph.facebook.com/v2.10/${TEST_PAGE_ID}/photos`
    };

    it('returns promise given no cb and generates correct request payload', () => {
      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN);

      const result = page.imageUrl(TEST_TEXT).imageCaption(TEST_TEXT).sendImage();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN);

      const result = page.imageUrl(TEST_TEXT).imageCaption(TEST_TEXT).sendImage(TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });

  describe('sendPost', () => {
    const correctPayload = {
      json: {
        message: TEST_TEXT,
        link: TEST_TEXT
      },
      method: 'POST',
      qs: {
        access_token: 'TEST_TOKEN'
      },
      url: `https://graph.facebook.com/v2.10/${TEST_PAGE_ID}/feed`
    };

    it('returns promise given no cb and generates correct request payload', () => {
      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN);

      const result = page.postMessage(TEST_TEXT).postUrl(TEST_TEXT).sendPost();

      expect(typeof result.then).to.be.equal('function');
      expect(typeof result.catch).to.be.equal('function');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });

    it('given cb no promise returned and correct payload generated', () => {
      page = new facebook.Page(TEST_PAGE_ID, TEST_TOKEN);

      const result = page.postMessage(TEST_TEXT).postUrl(TEST_TEXT).sendPost(TEST_CALLBACK);

      expect(typeof result).to.equal('undefined');
      sinon.assert.calledOnce(requestSpy);
      sinon.assert.calledWith(requestSpy, correctPayload);
    });
  });
});
