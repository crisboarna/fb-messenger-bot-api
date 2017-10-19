# fb-messenger-bot-api
#### NodeJS Facebook Messenger API
[![version](https://img.shields.io/npm/v/fb-messenger-bot-api.svg)](http://npm.im/fb-messenger-bot-api)
[![travis build](https://img.shields.io/travis/crisboarna/fb-messenger-bot-api.svg)](https://travis-ci.org/crisboarna/fb-messenger-bot-api)
[![codecov coverage](https://img.shields.io/codecov/c/github/crisboarna/fb-messenger-bot-api.svg)](https://codecov.io/gh/crisboarna/fb-messenger-bot-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d87ae38dea34aa09d0daa0ab81b81cd)](https://www.codacy.com/app/crisboarna/fb-messenger-bot-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crisboarna/fb-messenger-bot-api&amp;utm_campaign=Badge_Grade)
[![dependency status](https://img.shields.io/david/crisboarna/fb-messenger-bot-api.svg)](https://david-dm.org/crisboarna/fb-messenger-bot-api)
[![MIT License](https://img.shields.io/npm/l/fb-messenger-bot-api.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
[![Greenkeeper](https://badges.greenkeeper.io/crisboarna/fb-messenger-bot-api.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```
npm install fb-messenger-bot-api
```
## Setup

Import
```javascript
const MessengerClient = require('fb-messenger-bot-api');
```
Initialize
```javascript
const fbClient = new MessengerClient(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const fbClient = new MessengerClient(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```

## Creating facebook app
[See facebook tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)

## Messenger Profile
### Setting Greeting Message
```javascript
fbClient.setGreetingMessage('Message that will be visible first thing when opening chat window with your bot/page')
.then(...)
```