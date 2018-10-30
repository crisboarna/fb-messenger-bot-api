# fb-messenger-bot-api
#### NodeJS Facebook Messenger API
[![version](https://img.shields.io/npm/v/fb-messenger-bot-api.svg)](http://npm.im/fb-messenger-bot-api)
[![travis build](https://img.shields.io/travis/crisboarna/fb-messenger-bot-api.svg)](https://travis-ci.org/crisboarna/fb-messenger-bot-api)
[![codecov coverage](https://img.shields.io/codecov/c/github/crisboarna/fb-messenger-bot-api.svg)](https://codecov.io/gh/crisboarna/fb-messenger-bot-api)
[![dependency status](https://img.shields.io/david/crisboarna/fb-messenger-bot-api.svg)](https://david-dm.org/crisboarna/fb-messenger-bot-api)
[![Known Vulnerabilities](https://snyk.io/test/github/crisboarna/fb-messenger-bot-api/badge.svg?targetFile=package.json)](https://snyk.io/test/github/crisboarna/fb-messenger-bot-api?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d87ae38dea34aa09d0daa0ab81b81cd)](https://www.codacy.com/app/crisboarna/fb-messenger-bot-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crisboarna/fb-messenger-bot-api&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/npm/l/fb-messenger-bot-api.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
[![Greenkeeper](https://badges.greenkeeper.io/crisboarna/fb-messenger-bot-api.svg)](https://greenkeeper.io/)
[![code style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)

## Installation

```
npm install fb-messenger-bot-api
```

## Table of Contents
* [Documentation](#documentation)
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
* [Incoming Message Parser](#incoming-message-parser)  
* [Setting Messenger Profile](#setting-messenger-profile)
  * [Setting Greeting Message](#setting-greeting-message)
  * [Setting Get Started Button](#setting-get-started-button)
  * [Setting Persistent Menu](#setting-persistent-menu)
* [Sending Facebook Page Posts](#sending-facebook-page-posts)
  * [Page Image Posts](#page-image-posts)
  * [Page Link Posts](#page-link-posts)
* [Validating Facebook Webhook](#validating-facebook-webhook)
  * [Server Validation](#server-validation)
  * [Lambda Validation](#lambda-validation)
* [Validating Message Integrity](#validating-message-integrity)  
* [Complete Examples](#complete-example)
* [Creating Facebook App](#creating-facebook-app)

## Documentation
You can find documentation [here](https://crisboarna.github.io/fb-messenger-bot-api/)

## Features
* Near complete Typescript types for all incoming/outgoing Facebook Messaging API payloads & webhooks
* Builders for all types of buttons/templates
* Incoming Message Parser & Extractor
* Webhook Validation logic 
* Page posting
* Profile interactions 
* Promises and callback support on all functions, if no callback provided, promise returned, allows you to manage flow as you desire AND to <b>ensure message ordering</b><br />
* Supports proxying
* Typescript code with exported types for every end-point input/output
* Using latest Facebook API v3.1

## Setup

Import
```javascript
const facebook = require('fb-messenger-bot-api');
```
or
```typescript
import { FacebookMessagingAPIClient, etc... } from 'fb-messenger-bot-api';
```

## Sending Messages
Initialize
```javascript
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);
```
or
```typescript
const messageClient = new FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const messageClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
or
```typescript
const messageClient = new FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided
### Text Message

```javascript
messageClient.sendTextMessage(senderId, <MESSAGE>)
    .then((result) => ...)
```
or
```typescript
await messageClient.sentTextMessage(senderId, <MESSAGE>);
```

### Image Message
```javascript
messageClient.sendImageMessage(senderId, <IMAGE_URL>)
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.sendImageMessage(senderId, <IMAGE_URL>)
```
This method will have the image cached by facebook so every receiver after the first will get it quickly.

### Buttons Message
```javascript
messageClient.sendButtonsMessage(senderId, <BUTTONS TEXT> [<ARRAY OF BUTTONS>])
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.sendButtonsMessage(senderId, <BUTTONS TEXT> [<ARRAY OF BUTTONS>])
```
[Buttons format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button)

### Quick Reply Message
```javascript
messageClient.sendQuickReplyMessage(senderId, <TEXT>, [<QUICK_REPLIES>])
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.sendQuickReplyMessage(senderId, <TEXT>, [<QUICK_REPLIES>])
```
[Quick Reply format](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

### Generic Template Message ( Horizontal Scroll List )
```javascript
messageClient.sendGenericTemplate(senderId, [ELEMENTS])
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.sendGenericTemplate(senderId, [ELEMENTS])
```
[Generic Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)

### List Message ( Vertical Scroll List )
```javascript
messageClient.sendListMessage(senderId, [ELEMENTS], <firstElementStyle>, [FINAL_BUTTONS])
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.sendListMessage(senderId, [ELEMENTS], <firstElementStyle>, [FINAL_BUTTONS])
```
`firstElementStyle` is optional. If not provided defaults to `large`

[List Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/list)

### Mark as Seen
```javascript
messageClient.markSeen(senderId);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.

### Toggle writing bubble
```javascript
messageClient.toggleTyping(senderId, <true/false>);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.
Defaults to `false` if no boolean parameter provided.


### User Profile
```javascript
messageClient.getUserProfile(senderId,[<PROPERTIES>])
    .then((result) => ...)
```
or
```typescript
const result = await messageClient.getUserProfile(senderId,[<PROPERTIES>])
```
Valid properties: `first_name`,`last_name`,`profile_pic`,`locale`,`timezone`,`gender`,`is_payment_enabled`,`last_ad_referral`
If none are given defaults to `first_name` only.

## Incoming Message Parser
Extracts all relevant & known message types that can be found [here](https://developers.facebook.com/docs/messenger-platform/reference/webhook-events). Returns array with all objects of interest. Left flexibility to user to filter out message types of interest per use case instead of returning dictionary object with each message type as a separate list for optional performance saving in case of usage on time sensitive platforms (AWS Lambda, AF, GCF, etc).

```typescript
import {FacebookMessageParser} from 'fb-messenger-bot-api';
const messages = FacebookMessageParser.parsePayload(incomingPayload);
```

## Setting Messenger Profile
Initialize
```javascript
const profileClient = new facebook.FacebookProfileAPIClient(process.env.PAGE_ACCESS_TOKEN);
```
or
```typescript
import {Profile} from 'fb-messenger-bot-api';
const profileClient = new FacebookProfileAPIClient(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```javascript
const profileClient = new facebook.FacebookProfileAPIClient(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
### Setting Greeting Message
```javascript
profileClient.setGreetingMessage('Message that will be visible first thing when opening chat window with your bot/page')
.then((result) => ...)
```
or
```typescript
const result = await profileClient.setGreetingMessage('Message that will be visible first thing when opening chat window with your bot/page');
```
### Setting Get Started button
```javascript
profileClient.setGetStartedAction(senderId, payload)
    .then((result) => ...)
```
or
```typescript
const result = await profileClient.setGetStartedAction(senderId, payload)
```
`payload` is the value that will be first sent when new user sends first message, once per user interaction

### Setting Persistent Menu
```javascript
profileClient.setPersistentMenu(senderId, [<MENU_ENTRIES>])
    .then((result) => ...)
```
or
```typescript
const result = await profileClient.setPersistentMenu(senderId, [<MENU_ENTRIES>])
```
This is a burger menu appearing next to the chat input field where users can click and get direct interaction shortcuts to specific functionality of the bot.
[Persistent menu format](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu)

## Sending Facebook Page Posts
Initialize
```javascript
const pageClient = new facebook.FacebookPageAPIClient(process.env.PAGE_ID, process.env.PAGE_ACCESS_TOKEN);
```
or
```typescript
import {FacebookPageAPIClient} from 'fb-messenger-bot-api';
const pageClient = new FacebookPageAPIClient(process.env.PAGE_ID, process.env.PAGE_ACCESS_TOKEN)
```
Using proxy
```javascript
const pageClient = new facebook.FacebookPageAPIClient(process.env.PAGE_ID, process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided

Requires a never expiring `publishing_actions` token that can be obtained by following [this](https://www.rocketmarketinginc.com/blog/get-never-expiring-facebook-page-access-token/ ) guide.

### Page Image Posts
```javascript
pageClient.imageUrl(`<URL>`).imageCaption(`<CAPTION>`).sendImage(`<CALLBACK>`);
```

`<URL>` is the url of the image being posted

`<CAPTION>` is the text you want on top of the image

`<CALLBACK>` is optional callback otherwise promise is returned

### Page Link Posts
```javascript
pageClient.postUrl(`<URL>`).postMessage(`<MESSAGE>`).sendPost(`<CALLBACK>`);
```

`<URL>` is the url of the link being posted

`<MESSAGE>` is the text you want on top of the link

`<CALLBACK>` is optional callback otherwise promise is returned

## Validating Facebook Webhook
### Server Validation
```javascript
const facebook = require('fb-messenger-bot-api');
const router = require('express').Router();
router.get('/api/webhook',(req, res) => facebook.ValidateWebhook.validateServer(req,res));
```
Example based on usage with Express Router, can use any other middleware which passes in the req and response objects.
Assumes verification token set under `process.env.FB_VERIFICATION_TOKEN`.

Alternatively, if you want to pass in your set token in a different manner or under different name you can use 
```javascript
ValidateWebhook.validateServer(req, res, <TOKEN>);
```

This allows you to obtain the value as you wish and still use it as above with the help of currying.
```javascript
...
const validateWebhook = function validateWebhook(token) {
  return (req, res) => facebook.ValidateWebhook.validateServer(req, res, token);
}
const validator = validateWebhook(<TOKEN>);
router.get('/api/webhook/',validator);
```

### Lambda Validation
Alternatively, you can use this when running on AWS Lambda to take advantage of the serverless paradigm as follows:

```typescript
import {ValidateWebhook} from 'fb-messenger-bot-api';
const handler = (event, context, callback: Function) => {
    ...
    if(event.httpMethod === 'GET') {
        ValidateWebhook.validateLambda(event, callback);
    }
    ...
}
```
Both `validateLambda` and `validateServer` support passing in verification token as third parameter. Otherwise will check `process.env.FB_VERIFICATION_TOKEN` for value.

## Validating Message Integrity
Validates the integrity of the message received from Facebook platform using the provided signature signed with Facebook Application Secret.

The Facebook application secret can be provided either as second optional parameter to `ValidateWebhook.validateMessageIntegrity(<X-HUB-SIGNATURE>, <FB_APPLICATION_SECRET>)` or by setting `process.env.FB_APPLICATION_SECRET`.

Compatible with both server/less paradigms as part of single line middleware function to Express or as Lambda first check before callback or remainder or programme.

```typescript
import {ValidateWebhook} from 'fb-messenger-bot-api';
const messageIntegrityChecker = (req, res) => {
    const validMessage = ValidateWebhook.validateMessageIntegrity(req.headers["x-hub-signature"]);
    ...
}
router.post('/api/webhook/',messageIntegrityChecker);
```

## Complete example
```javascript
const router = require('express').Router();
const facebook = require('fb-messenger-bot-api');
const messagingClient = new facebook.FacebookMessagingAPIClient(process.env.PAGE_ACCESS_TOKEN);
const messageParser = facebook.FacebookMessageParser;
...
router.get('/api/webhook',facebook.ValidateWebhook.validateServer);
router.post('/api/webhook', (req, res) => {
    const incomingMessages = messageParser.parsePayload(req.body);  
    ...
    messagingClient.markSeen(senderId)
        .then(() => client.toggleTyping(senderId,true))
        .catch((err) => console.log(error));
    ...
    //promise based reaction on message send confirmation
    messagingClient.sendTextMessage(senderId, 'Hello')
        .then((result) => console.log(`Result sent with: ${result}`));
    ...
    //callback based reaction on message confirmation
    messagingClient.sendTextMessage(senderId, 'Hello',(result) => console.log(`Result sent with: ${result}`));
    ...
    //silent message sending
    messagingClient.sendTextMessage(senderId,'Hello');
})
```
or
```typescript
import {FacebookMessagingAPIClient, ValidateWebhook, FacebookMessageParser} from 'fb-messenger-bot-api';
import {Router} from 'express';
...
router.get('/api/webhook',facebook.ValidateWebhook.validateServer);
router.post('/api/webhook', (req, res) => {
    try {
    const incomingMessages = messageParser.parsePayload(req.body);  
        ...
        await messagingClient.markSeen(senderId);
        await messagingClient.toggleTyping(senderId,true));
        ...
        //promise based reaction on message send confirmation
        const result = await messagingClient.sendTextMessage(senderId, 'Hello');
        console.log(`Result sent with: ${result}`));
        ...
    } catch(e){...}
    //callback based reaction on message confirmation
    messagingClient.sendTextMessage(senderId, 'Hello',(result) => console.log(`Result sent with: ${result}`));
    ...
    //silent message sending
    messagingClient.sendTextMessage(senderId,'Hello');
});
```

## Creating Facebook app
[See Facebook Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)