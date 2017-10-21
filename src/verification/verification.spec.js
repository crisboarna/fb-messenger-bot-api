/* eslint-disable semi */
'use strict';

import sinon from 'sinon';
import { ValidateWebhook } from './verification';

describe('ValidateWebhook', () => {
  const TEST_CORRECT_TOKEN = 'TEST_CORRECT';
  const TEST_INCORRECT_TOKEN = 'TEST_INCORRECT';
  const TEST_CHALLENGE = 'TEST_CHALLENGE';
  const res = {};
  const statusSpy = sinon.spy();
  res.send = sinon.spy();
  res.status = (value) => { statusSpy(value); return res };
  res.sendStatus = sinon.spy();
  const req = {
    query: {
      'hub.verify_token': TEST_CORRECT_TOKEN,
      'hub.challenge': TEST_CHALLENGE
    }
  };

  beforeEach(() => {
    statusSpy.reset();
    res.send.reset();
    res.sendStatus.reset();
  });

  describe('validate', () => {
    it('should send 403 given no token', () => {
      ValidateWebhook.validate(req, res);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given invalid token', () => {
      ValidateWebhook.validate(req, res, TEST_INCORRECT_TOKEN);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given no req verify token', () => {
      const req = {
        query: {
          'hub.challenge': TEST_CHALLENGE
        }
      };

      ValidateWebhook.validate(req, res);
      process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given token mismatch', () => {
      process.env.FB_VERIFICATION_TOKEN = TEST_INCORRECT_TOKEN;
      ValidateWebhook.validate(req, res);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 200 given correct verification', () => {
      process.env.FB_VERIFICATION_TOKEN = TEST_CORRECT_TOKEN;
      ValidateWebhook.validate(req, res);
      sinon.assert.notCalled(res.sendStatus);
      sinon.assert.calledOnce(statusSpy);
      sinon.assert.calledOnce(res.send);
      sinon.assert.calledWith(res.send)
    });
  });

  describe('validateWithToken', () => {
    it('should send 403 given no token', () => {
      ValidateWebhook.validateWithToken(req, res);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given invalid token', () => {
      ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given no req verify token', () => {
      const req = {
        query: {
          'hub.challenge': TEST_CHALLENGE
        }
      };

      ValidateWebhook.validateWithToken(req, res, TEST_CORRECT_TOKEN);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 403 given token mismatch', () => {
      ValidateWebhook.validateWithToken(req, res, TEST_INCORRECT_TOKEN);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 403);
      sinon.assert.notCalled(statusSpy);
      sinon.assert.notCalled(res.send);
    });

    it('should send 200 given correct verification', () => {
      ValidateWebhook.validate(req, res, TEST_CORRECT_TOKEN);
      sinon.assert.notCalled(res.sendStatus);
      sinon.assert.calledOnce(statusSpy);
      sinon.assert.calledOnce(res.send);
      sinon.assert.calledWith(res.send)
    });
  });
});
