/* eslint-disable semi */
'use strict';

import request from 'request';

const sendMessage = function sendMessage (options, requestData, cb) {
  options.qs.access_token = requestData.token;
  if (requestData.hasOwnProperty('proxy')) {
    options.proxy = requestData.proxy;
  }

  if (typeof cb !== 'function') {
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          if (!((!!body) && (body.constructor === Object))) {
            let bodyObject = JSON.parse(body);
            if (bodyObject.error) {
              reject(bodyObject.error.message);
            } else {
              resolve(body);
            }
          } else {
            resolve(body);
          }
        }
      })
    })
  } else {
    request(options, (err, res, body) => {
      if (err) return cb(err);
      if (body.error) return cb(body.error);
      cb(null, body);
    });
  }
};

const deepCopyPayload = function deepCopyPayload (payloadType) {
  return JSON.parse(JSON.stringify(payloadType));
};

const requestOptions = {
  url: 'https://graph.facebook.com/v2.10/',
  qs: {
    access_token: undefined
  },
  method: undefined
};

export { sendMessage, deepCopyPayload, requestOptions };
