/* eslint-disable semi */
'use strict';

import { sendMessage, deepCopyPayload, requestOptions } from '../util/utils';

export class Page {
  constructor (pageId, token, proxyData) {
    this._pageId = pageId;
    this._requestData = {};
    this._requestData.token = token;
    if (proxyData != null) {
      if (Object.prototype.toString.call(proxyData) === '[object Object]' && proxyData.hasOwnProperty('hostname') && proxyData.hasOwnProperty('port')) {
        if (proxyData.hostname.indexOf('http') === 0) {
          this._requestData.proxy = `${proxyData.hostname}:${proxyData.port}`;
        } else {
          this._requestData.proxy = `http://${proxyData.hostname}:${proxyData.port}`;
        }
      } else {
        throw new Error('Invalid Proxy given, expected hostname and port');
      }
    }
  }

  imageUrl (imageUrl) {
    this._url = imageUrl;
    return this;
  }

  imageCaption (imageCaption) {
    this._caption = imageCaption;
    return this;
  }

  postMessage (postMessage) {
    this._postMessage = postMessage;
    return this;
  }

  postUrl (postUrl) {
    this._postUrl = postUrl;
    return this;
  }

  sendImage (cb) {
    const options = deepCopyPayload(requestOptions);
    options.url += `${this._pageId}/photos`;
    options.method = 'POST';
    options.json = {caption: this._caption, url: this._url};
    return sendMessage(options, this._requestData, cb);
  }

  sendPost (cb) {
    const options = deepCopyPayload(requestOptions);
    options.url += `${this._pageId}/feed`;
    options.method = 'POST';
    options.json = {message: this._postMessage, link: this._postUrl};
    return sendMessage(options, this._requestData, cb);
  }
}
