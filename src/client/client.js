/* eslint-disable semi */
'use strict';

import { sendMessage, deepCopyPayload, requestOptions } from '../util/utils';

const textMessagePayload = {
  text: undefined
};

const imageMessagePayload = {
  'attachment': {
    'type': 'image',
    'payload': {
      'is_reusable': true,
      'url': undefined
    }
  }
};

const buttonsMessagePayload = {
  'attachment': {
    'type': 'template',
    'payload': {
      'template_type': 'button',
      'text': undefined,
      'buttons': undefined
    }
  }
};

const genericMessagePayload = {
  'attachment': {
    'type': 'template',
    'payload': {
      'template_type': 'generic',
      'elements': undefined
    }
  }
};

const quickReplyPayload = {
  'quick_replies': undefined
};

const sendDisplayMessage = function sendDisplayMessage (id, payload, requestData, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/messages';
  options.method = 'POST';
  options.json = {recipient: {id: id}};
  options.json.message = payload;
  return sendMessage(options, requestData, cb);
};

export class MessagingClient {
  constructor (token, proxyData) {
    this._requestData = {};
    this._requestData.token = token;
    if (proxyData != null) {
      if (Object.prototype.toString.call(proxyData) === '[object Object]' && proxyData.hasOwnProperty('hostname') && proxyData.hasOwnProperty('port')) {
        this._requestData.proxy = proxyData.hostname.indexOf('http') > 0 ? `${proxyData.hostname}:${proxyData.port}` : `http://${proxyData.hostname}:${proxyData.port}`
      } else {
        throw new Error('Invalid Proxy given, expected hostname and port');
      }
    }
  }

  getUserProfile (id, fieldsArray, cb) {
    const options = deepCopyPayload(requestOptions);
    options.url += id;

    let fields;
    if (fieldsArray == null) {
      fields = 'first_name';
    } else {
      fields = fieldsArray.join(',');
    }

    options.qs.fields = fields;
    options.method = 'GET';
    return sendMessage(options, this._requestData, cb);
  }

  sendTextMessage (id, text, cb) {
    const jsonPayload = deepCopyPayload(textMessagePayload);
    jsonPayload.text = text;
    return sendDisplayMessage(id, jsonPayload, this._requestData, cb);
  }

  sendImageMessage (id, imageUrl, cb) {
    const jsonPayload = deepCopyPayload(imageMessagePayload);
    jsonPayload.attachment.payload.url = imageUrl;
    return sendDisplayMessage(id, jsonPayload, this._requestData, cb);
  }

  sendButtonsMessage (id, text, buttons, cb) {
    const jsonPayload = deepCopyPayload(buttonsMessagePayload);
    jsonPayload.attachment.payload.buttons = buttons;
    jsonPayload.attachment.payload.text = text;
    return sendDisplayMessage(id, jsonPayload, this._requestData, cb)
  }

  sendGenericTemplateMessage (id, elements, cb) {
    const jsonPayload = deepCopyPayload(genericMessagePayload);
    jsonPayload.attachment.payload.elements = elements;
    return sendDisplayMessage(id, jsonPayload, this._requestData, cb);
  }

  sendQuickReplyMessage (id, payload, quickReplies, cb) {
    const jsonPayload = deepCopyPayload(quickReplyPayload);
    const payloadType = typeof payload === 'string' ? 'text' : 'attachment';

    if (payloadType !== 'text') {
      const elements = deepCopyPayload(genericMessagePayload);
      elements.attachment.payload.elements = payload;
      payload = elements;
    }

    jsonPayload[payloadType] = payload;
    jsonPayload.quick_replies = quickReplies;

    return sendDisplayMessage(id, jsonPayload, this._requestData, cb);
  }
}
