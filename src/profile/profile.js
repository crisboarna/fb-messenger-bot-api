/* eslint-disable semi */
'use strict';

import { sendMessage, deepCopyPayload, requestOptions } from '../util/utils';

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

const sendConfigurationMessage = function sendConfigurationMessage (payload, requestData, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/thread_settings';
  options.method = 'POST';
  options.json = payload;
  return sendMessage(options, requestData, cb);
};

const sendPersistentMenuMessage = function sendPersistentMenuMessage (payload, requestData, cb) {
  const options = deepCopyPayload(requestOptions);
  options.url += 'me/messenger_profile';
  options.method = 'POST';
  options.json = payload;
  return sendMessage(options, requestData, cb);
};

export class Profile {
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

  setGreetingMessage (greetingMessage, cb) {
    const jsonPayload = deepCopyPayload(greetingSettingPayload);
    jsonPayload.greeting.text = greetingMessage;
    return sendConfigurationMessage(jsonPayload, this._requestData, cb);
  }

  setGetStartedAction (getStartedPayload, cb) {
    const jsonPayload = deepCopyPayload(getStartedSettingPayload);
    jsonPayload.call_to_actions[0].payload = getStartedPayload;
    return sendConfigurationMessage(jsonPayload, this._requestData, cb);
  }

  setPersistentMenu (menuEntries, cb) {
    const jsonPayload = deepCopyPayload(persistentMenuSettingPayload);
    jsonPayload.persistent_menu[0].call_to_actions = menuEntries;
    return sendPersistentMenuMessage(jsonPayload, this._requestData, cb);
  }
}
