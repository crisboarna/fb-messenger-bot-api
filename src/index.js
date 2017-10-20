/* eslint-disable semi */
'use strict';

import request from 'request';

const requestOptions = {
  url: 'https://graph.facebook.com/v2.6/',
  qs: {
    access_token: undefined
  },
  method: undefined
};

const greetingSettingPayload = {
  'setting_type': 'greeting',
  'greeting': {
    'text': undefined
  }
};

const getStartedSettingPayload = {
  'setting_type': 'call_to_actions',
  'thread_state': 'new_thread',
  'call_to_actions': [
    {
      'payload': undefined
    }
  ]
};

const persistentMenuSettingPayload = {
  'setting_type': 'call_to_actions',
  'thread_state': 'existing_thread',
  'persistent_menu': [
    {
      'locale': 'default',
      'call_to_actions': []
    }
  ]
};

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

const deepCopyPayload = function deepCopyPayload (payloadType) {
  return JSON.parse(JSON.stringify(payloadType));
};

const sendMessage = function sendMessage (options, token, cb) {
  options.qs.access_token = token;

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

const sendConfigurationMessage = function sendConfigurationMessage (payload, token, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/thread_settings';
  options.method = 'POST';
  options.json = payload;
  return sendMessage(options, token, cb);
};

const sendPersistentMenuMessage = function sendPersistentMenuMessage (payload, token, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/messenger_profile';
  options.method = 'POST';
  options.json = payload;
  return sendMessage(options, token, cb);
};

const sendDisplayMessage = function sendDisplayMessage (id, payload, token, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/messages';
  options.method = 'POST';
  options.json = {recipient: {id: id}};
  options.json.message = payload;
  return sendMessage(options, token, cb);
};

export class Client {
  constructor (token) {
    this._token = token;
  }

  setGreetingMessage (greetingMessage, cb) {
    const jsonPayload = deepCopyPayload(greetingSettingPayload);
    jsonPayload.greeting.text = greetingMessage;
    return sendConfigurationMessage(jsonPayload, this._token, cb);
  }

  setGetStartedAction (getStartedPayload, cb) {
    const jsonPayload = deepCopyPayload(getStartedSettingPayload);
    jsonPayload.call_to_actions[0].payload = getStartedPayload;
    return sendConfigurationMessage(jsonPayload, this._token, cb);
  }

  setPersistentMenu (menuEntries, cb) {
    const jsonPayload = deepCopyPayload(persistentMenuSettingPayload);
    jsonPayload.persistent_menu[0].call_to_actions = menuEntries;
    return sendPersistentMenuMessage(jsonPayload, this._token, cb);
  }

  getUserProfile (id, fieldsArray, cb) {
    const options = deepCopyPayload(requestOptions);
    options.url += id;
    options.qs.fields = fieldsArray.join(',');
    options.method = 'GET';
    return sendMessage(options, this._token, cb);
  }

  sendTextMessage (id, text, cb) {
    const jsonPayload = deepCopyPayload(textMessagePayload);
    jsonPayload.text = text;
    return sendDisplayMessage(id, jsonPayload, this._token, cb);
  }

  sendImageMessage (id, imageUrl, cb) {
    const jsonPayload = deepCopyPayload(imageMessagePayload);
    jsonPayload.attachment.payload.url = imageUrl;
    return sendDisplayMessage(id, jsonPayload, this._token, cb);
  }

  sendButtonsMessage (id, text, buttons, cb) {
    const jsonPayload = deepCopyPayload(buttonsMessagePayload);
    jsonPayload.attachment.payload.buttons = buttons;
    jsonPayload.attachment.payload.text = text;
    return sendDisplayMessage(id, jsonPayload, this._token, cb)
  }

  sendGenericTemplateMessage (id, elements, cb) {
    const jsonPayload = deepCopyPayload(genericMessagePayload);
    jsonPayload.attachment.payload.elements = elements;
    return sendDisplayMessage(id, jsonPayload, this._token, cb);
  }
}
