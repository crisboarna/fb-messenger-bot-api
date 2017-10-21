/* eslint-disable semi */
'use strict';

const verifyToken = function verifyToken (req, res, fbToken) {
  const fbTokenType = fbToken != null;
  const verifyTokenType = req != null && typeof req.query !== 'undefined' && typeof req.query['hub.verify_token'] !== 'undefined';

  if (fbTokenType && verifyTokenType) {
    if (req.query['hub.verify_token'] === fbToken) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};

export class ValidateWebhook {
  static validate (req, res) {
    const fbToken = process.env.FB_VERIFICATION_TOKEN;
    verifyToken(req, res, fbToken);
  }

  static validateWithToken (req, res, token) {
    verifyToken(req, res, token);
  }
}
