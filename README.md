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

## Table of Contents
* [Features](#features)
* [Setup](#setup)
* [Sending Messages](#sending-messages)
  * [Text Message](#text-message)
  * [Image Message](#image-message)
  * [Buttons Message](#buttons-message)
  * [Quick Reply Message](#quick-reply-message)
  * [Generic Template List ( Horizontal Scroll List)](#generic-template-list-(-horizontal-scroll-list-))
  * [List Message ( Vertical Scroll List)](#list-message-(-vertical-scroll-list-))
  * [Mark as Seen](#mark-as-seen)
  * [Toggle Writing Bubble](#toggle-writing-bubble)
  * [User Profile](#user-profile)
* [Setting Messenger Profile](#setting-messenger-profile)
  * [Setting Greeting Message](#setting-greeting-message)
  * [Setting Get Started Button](#setting-get-started-button)
  * [Setting Persistent Menu](#setting-persistent-menu)
* [Sending Facebook Page Posts](#sending-facebook-page-posts)
  * [Page Image Posts](#page-image-posts)
  * [Page Link Posts](#page-link-posts)
* [Validating Facebook Webhook](#validating-facebook-webhook)
* [Complete Example](#complete-example)
* [Creating Facebook App](#creating-facebook-app)

## Features
* Promises and callback support on all functions, if no callback provided, promise returned, allows you to manage flow as you desire AND to <b>ensure message ordering</b><br />
* Supports proxying
* ES6+ code
* Using latest Facebook API v2.10

## Setup

Import
```javascript
const facebook = require('fb-messenger-bot-api');
```

## Sending Messages
Initialize
```javascript
const client = new facebook.Client(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const client = new facebook.Client(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided
### Text Message

```javascript
client.sendTextMessage(senderId, <MESSAGE>)
    .then((result) => ...)
```
### Image Message
```javascript
client.sendImageMessage(senderId, <IMAGE_URL>)
    .then((result) => ...)
```
This method will have the image cached by facebook so every receiver after the first will get it quickly.

### Buttons Message
```javascript
client.sendButtonsMessage(senderId, <BUTTONS TEXT> [<ARRAY OF BUTTONS>])
    .then((result) => ...)
```
[Buttons format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button)

### Quick Reply Message
```javascript
client.sendQuickReplyMessage(senderId, <TEXT>, [<QUICK_REPLIES>])
    .then((result) => ...)
```
[Quick Reply format](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

### Generic Template Message ( Horizontal Scroll List )
```javascript
client.sendGenericTemplate(senderId, [ELEMENTS])
    .then((result) => ...)
```
[Generic Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)

### List Message ( Vertical Scroll List )
```javascript
client.sendListMessage(senderId, [ELEMENTS], <firstElementStyle>, [FINAL_BUTTONS])
    .then((result) => ...)
```
`firstElementStyle` is optional. If not provided defaults to `large`

[List Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/list)

### Mark as Seen
```javascript
client.markSeen(senderId);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.

### Toggle writing bubble
```javascript
client.toggleTyping(senderId, <true/false>);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.
Defaults to `false` if no boolean parameter provided.

### User Profile
```javascript
client.getUserProfile(senderId,[<PROPERTIES>])
    .then((result) => ...)
```
Valid properties: `first_name`,`last_name`,`profile_pic`,`locale`,`timezone`,`gender`,`is_payment_enabled`,`last_ad_referral`
If none are given defaults to `first_name` only.

## Setting Messenger Profile
Initialize
```javascript
const client = new facebook.Profile(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const client = new facebook.Profile(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
### Setting Greeting Message
```javascript
client.setGreetingMessage('Message that will be visible first thing when opening chat window with your bot/page')
.then((result) => ...)
```

### Setting Get Started button
```javascript
client.setGetStartedAction(senderId, payload)
    .then((result) => ...)
```
`payload` is the value that will be first sent when new user sends first message, once per user interaction

### Setting Persistent Menu
```javascript
client.setPersistentMenu(senderId, [<MENU_ENTRIES>])
    .then((result) => ...)
```
This is a burger menu appearing next to the chat input field where users can click and get direct interaction shortcuts to specific functionality of the bot.
[Persistent menu format](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu)

## Sending Facebook Page Posts
Initialize
```javascript
const page = new facebook.Page(process.env.PAGE_ID, process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const page = new facebook.Page(process.env.PAGE_ID, process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided

Requires a never expiring `publishing_actions` token that can be obtained by following [this](https://www.rocketmarketinginc.com/blog/get-never-expiring-facebook-page-access-token/ ) guide.

### Page Image Posts
```javascript
page.imageUrl(`<URL>`).imageCaption(`<CAPTION>`).sendImage(`<CALLBACK>`);
```

`<URL>` is the url of the image being posted

`<CAPTION>` is the text you want on top of the image

`<CALLBACK>` is optional callback otherwise promise is returned

### Page Link Posts
```javascript
page.postUrl(`<URL>`).postMessage(`<MESSAGE>`).sendPost(`<CALLBACK>`);
```

`<URL>` is the url of the link being posted

`<MESSAGE>` is the text you want on top of the link

`<CALLBACK>` is optional callback otherwise promise is returned

## Validating Facebook Webhook
```javascript
const facebook = require('fb-messenger-bot-api');
const router = require('express').Router();
router.get('/api/webhook',facebook.ValidateWebhook.validate);
```
Example based on usage with Express Router, can use any other middleware which passes in the req and response objects.
Assumes verification token set under `process.env.FB_VERIFICATION_TOKEN`.

Alternatively, if you want to pass in your set token in a different manner or under different name you can use 
```javascript
ValidateWebhook.validateWithToken(req, res, <TOKEN>);
```

This allows you to obtain the value as you wish and still use it as above with the help of currying.
```javascript
...
const validateWebhook = function validateWebhook(token) {
  return (req, res) => facebook.ValidateWebhook.validateWithToken(req, res, token);
}
const validator = validateWebhook(<TOKEN>);
router.get('/api/webhook/',validator);
```
## Complete example
```javascript
const router = require('express').Router();
const facebook = require('fb-messenger-bot-api');
const client = new facebook.Client(process.env.PAGE_ACCESS_TOKEN);
...
router.get('/api/webhook',facebook.ValidateWebhook.validate);
...
client.markSeen(senderId)
  .then(() => client.toggleTyping(senderId,true))
  .catch((err) => console.log(error));
...
//promise based reaction on message send confirmation
client.sendTextMessage(senderId, 'Hello')
    .then((result) => console.log(`Result sent with: ${result}`));
...
//callback based reaction on message confirmation
client.sendTextMessage(senderId, 'Hello',(result) => console.log(`Result sent with: ${result}`));
...
//silent message sending
client.sendTextMessage(senderId,'Hello');
```

## Creating Facebook app
[See Facebook Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)