/* eslint-disable semi */
'use strict';

export class ValidateWebhook {
  static validate (req, res) {
    const verifyToken = process.env.FB_VERIFICATION_TOKEN;
    const fbTokenType = verifyToken != null;
    const verifyTokenType = req != null && typeof req.query !== 'undefined' && typeof req.query['hub.verify_token'] !== 'undefined';

    if (fbTokenType && verifyTokenType) {
      if (req.query['hub.verify_token'] === verifyToken) {
        res.status(200).send(req.query['hub.challenge']);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  }
}
