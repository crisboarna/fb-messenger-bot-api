'use strict';

const request = require('request');

const requestOptions = {
    url: 'https://graph.facebook.com/v2.6/',
    qs: {
        access_token: undefined,
    },
    method: undefined
};

const greetingSettingPayload = {
    'setting_type':'greeting',
    'greeting': {
        'text': undefined
    }
};

const sendMessage = function sendMessage(options, token, cb) {
    options.qs.access_token = token;

    if(typeof cb !== 'function') {
        return new Promise((resolve, reject) => {
            request(options,(err, res, body) => {
                if(err) {
                    reject(err);
                } else {
                    if( !( (!!body) && (body.constructor === Object) ) ){
                        let bodyObject = JSON.parse(body);
                        if(bodyObject.error) {
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

const sendConfigurationMessage = function sendConfigurationMessage(payload, token, cb) {
    const options = deepCopyPayload(requestOptions);
    options.url += 'me/thread_settings';
    options.method = 'POST';
    options.json = payload;
    return sendMessage(options, token, cb);
};

const deepCopyPayload = function deepCopyPayload(payloadType) {
    return JSON.parse(JSON.stringify(payloadType));
};

class FbMessengerAPI {
    constructor(token) {
        this._token = token;
    }

    setGreetingMessage(greetingMessage, cb) {
        const jsonPayload = deepCopyPayload(greetingSettingPayload);
        jsonPayload.greeting.text = greetingMessage;
        return sendConfigurationMessage(jsonPayload, this._token, cb);
    }
}

module.exports = FbMessengerAPI;