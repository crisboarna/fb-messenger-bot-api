# fb-messenger-bot-api
#### NodeJS Facebook Messenger API
[![version](https://img.shields.io/npm/v/fb-messenger-bot-api.svg)](http://npm.im/fb-messenger-bot-api)
[![travis build](https://img.shields.io/travis/crisboarna/fb-messenger-bot-api.svg)](https://travis-ci.org/crisboarna/fb-messenger-bot-api)
[![codecov coverage](https://img.shields.io/codecov/c/github/crisboarna/fb-messenger-bot-api.svg)](https://codecov.io/gh/crisboarna/fb-messenger-bot-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d87ae38dea34aa09d0daa0ab81b81cd)](https://www.codacy.com/app/crisboarna/fb-messenger-bot-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crisboarna/fb-messenger-bot-api&amp;utm_campaign=Badge_Grade)
[![dependency status](https://img.shields.io/david/crisboarna/fb-messenger-bot-api.svg)](https://david-dm.org/crisboarna/fb-messenger-bot-api)
[![Known Vulnerabilities](https://snyk.io/package/npm/fb-messenger-bot-api/badge.svg)](https://snyk.io/package/npm/fb-messenger-bot-api)
[![MIT License](https://img.shields.io/npm/l/fb-messenger-bot-api.svg)](LICENSE)
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
  * [Audio Message](#audio-message)
  * [Video Message](#video-message)
  * [File Message](#file-message)
  * [Buttons Message](#buttons-message)
  * [Template Message](#template-message)
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
* [Contributing](#contributing)

## Documentation
Documentation can be found [here](https://crisboarna.github.io/fb-messenger-bot-api/)


## Features
* Most of Send API support (
  * `Text` 
  * `Image`, `Audio`, `Video`, `File` 
  * Buttons: `Buy`, `Call`, `Game`, `Log In`, `Log Out`, `Postback`, `Share`, `URL`
  * Template: `Button`, `Generic`, `List`, `Media`, `OpenGraph`, `Receipt`, `Airline Boarding Pass`, `Airline Check In`, `Airline Flight Update`, `Airline Itinerary` 
  * `Quick Reply`
  * `Typing` 
  * `Seen`
* Full Page API support (Post Text, Post Image)
* Full Profile API support (Get Started, Persistent Menu, Greeting)
* Initial Webhook validation logic
* Typescript code & types
  * Builders for every payload type
  * Container classes for every payload type
  * Interface definitions
  * Generic methods accepting all valid types
* Dynamic URL/ID payload option for Image, Audio, Video, File
* Supports proxying
* Promises and callback support on all functions, if no callback provided, promise returned, allows you to manage flow as you desire AND to <b>ensure message ordering</b><br />
* Using latest Facebook API v3.0

## Setup

Import
```typescript
import {<DESIRED_CLASS>} from 'fb-messenger-bot-api';
```

## Sending Messages
Initialize
```typescript
import {Client} from 'fb-messenger-bot-api';
const client = new Client(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```typescript
import {Client} from 'fb-messenger-bot-api';
const client = new Client(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided

### Text Message

```typescript
await client.sendTextMessage(senderId, <MESSAGE>);
```
### Image Message
#### URL Based Payload
```typescript
const id = await client.sendImageMessage(senderId, 'https://s3.eu-west-1.amazonaws.com/bucketname/testbucket/20180104102000/profile.jpg');
```
This method will have the image cached by facebook so every receiver after the first will get it quickly and can be used later on based on returned id. Alternatively returned value can be ignored and sent without assignment.
#### ID Based Payload
```typescript
const id = await client.sendImageMessage(senderId, id);
```

### Audio Message
#### URL Based Payload
```typescript
const id = await client.sendAudioMessage(senderId, 'https://s3.eu-west-1.amazonaws.com/bucketname/testbucket/20180104102000/motto.mp3');
```
#### ID Based Payload
```typescript
const id = await client.sendAudioMessage(senderId, id);
```

### Video Message
#### URL Based Payload
```typescript
const id = await client.sendVideoMessage(senderId, 'https://s3.eu-west-1.amazonaws.com/bucketname/testbucket/20180104102000/intro.mp4');
```
#### ID Based Payload
```typescript
const id = await client.sendVideoMessage(senderId, id);
```

### File Message
#### URL Based Payload
```typescript
const id = await client.sendFileMessage(senderId, 'https://s3.eu-west-1.amazonaws.com/bucketname/testbucket/20180104102000/logs.txt');
```
#### ID Based Payload
```typescript
const id = await client.sendVideoMessage(senderId, id);
```

### Buttons Message
This examples shows how to use the provided builder classes as well to create every element of the payload in a concise programmatic manner.

All Button types have own builder with all properties supported by Facebook API available
```typescript
const builder = new BuyButtonBuilder().setPayload('Buy now').setPaymentSummary('This is your soul').setTitle('Unique Opportunity');
await client.sendButtonsMessage(senderId, <BUTTONS TEXT> [builder.build()])
```
[Buttons format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/button)

### Quick Reply Message
This example creates one Quick Reply bubble, use multiple sets & `build()` and add results to array to have multiple quick replies up to Facebook limit of 11 per message
```typescript
const builder = new QuickReplyBuilder().setContentType(QUICK_REPLY_TYPE.TEXT).setImageUrl('https://s3.eu-west-1.amazonaws.com/bucketname/testbucket/20180104102000/profile.jpg').setTitle('Quick replies');
await client.sendQuickReplyMessage(senderId, <TEXT>, [builder.build()]);
```
[Quick Reply format](https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies)

### Generic Template Message ( Horizontal Scroll List )
```typescript
const builder = new GenericTemplateBuilder().setImageAspectRatio('16:9').setSharable(true).setElements(...)
await client.sendTemplateMessage(senderId, builder.build());
```
[Generic Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic)

### List Message ( Vertical Scroll List )
```typescript
const builder = new ListTemplateBuilder().setSharable(true).setElements(...);
await client.sendTemplateMessage(senderId, builder.build());
```
`top_element_style` if not provided defaults to `large`

[List Template element format](https://developers.facebook.com/docs/messenger-platform/send-messages/template/list)

### Mark as Seen
```typescript
client.markSeen(senderId);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.

### Toggle writing bubble
```typescript
client.toggleTyping(senderId, <true/false>);
```
As per all methods, callback can be provided. If no callback provided returns promise. Recommended to send and continue processing without waiting for reply.
Defaults to `false` if no boolean parameter provided.

### User Profile
```typescript
const profileData = await client.getUserProfile(senderId,[<PROPERTIES>]);
```
Valid properties: `first_name`, `last_name`, `profile_pic`,`locale`, `timezone`, `gender`, `is_payment_enabled`, `last_ad_referral`
If none are given defaults to `first_name` only.

## Setting Messenger Profile
Initialize
```typescript
import {Profile} from 'fb-messenger-bot-api';
const profile = new Profile(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```typescript
import {Profile} from 'fb-messenger-bot-api';
const profile = new Profile(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
### Setting Greeting Message
```typescript
const result = client.setGreetingMessage('Message that will be visible first thing when opening chat window with your bot/page');
```

### Setting Get Started button
```typescript
const result = await client.setGetStartedAction(senderId, payload);
```
`payload` is the value that will be first sent when new user sends first message, once per user interaction

### Setting Persistent Menu
```typescript
const result = await client.setPersistentMenu(senderId, [<MENU_ENTRIES>])
```
This is a burger menu appearing next to the chat input field where users can click and get direct interaction shortcuts to specific functionality of the bot.
[Persistent menu format](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu)

## Sending Facebook Page Posts
Initialize
```typescript
import {Page} from 'fb-messenger-bot-api';
const page = new Page(process.env.PAGE_ACCESS_TOKEN);
```
Using proxy
```typescript
const page = new Page(process.env.PAGE_ACCESS_TOKEN, { hostname:process.env.PROXY_HOST, port: process.env.PROXY_PORT });
```
Defaults to `http` if no protocol provided

Requires a never expiring `publishing_actions` token that can be obtained by following [this](https://www.rocketmarketinginc.com/blog/get-never-expiring-facebook-page-access-token/ ) guide.

### Page Image Posts
```typescript
page.setImageUrl(`<URL>`).setImageCaption(`<CAPTION>`).sendImage(`<CALLBACK>`);
```

`<URL>` is the url of the image being posted

`<CAPTION>` is the text you want on top of the image

`<CALLBACK>` is optional callback otherwise promise is returned

### Page Link Posts
```typescript
page.setPostLink(`<URL>`).setPostText(`<MESSAGE>`).sendPost(`<CALLBACK>`);
```

`<URL>` is the url of the link being posted

`<MESSAGE>` is the text you want on top of the link

`<CALLBACK>` is optional callback otherwise promise is returned

## Validating Facebook Webhook
```typescript
import * as express from 'express';
const router = express.Router();
import {ValidateWebhook} from 'fb-messenger-bot-api';
router.get('/api/webhook', ValidateWebhook.validate);
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
  return (req, res) => ValidateWebhook.validateWithToken(req, res, token);
}
const validator = validateWebhook(<TOKEN>);
router.get('/api/webhook/',validator);
```
## Complete example
```javascript
import * as express from 'express';
import {Client, ValidateWebhook} from 'fb-messenger-bot-api';
const router = express.Router();
const client = new Client(process.env.PAGE_ACCESS_TOKEN);
...
router.get('/api/webhook', ValidateWebhook.validate);
...
try {
  await client.markSeen(senderId)
  await client.toggleTyping(senderId, true);
  await client.sendTextMessage(senderId, 'Hello');
} catch(error) {
  console.log(error);
}
...
//promise based reaction on message send confirmation
const result = await client.sendTextMessage(senderId, 'Hello');
console.log(`Result sent with: ${result}`);
...
//callback based reaction on message confirmation
client.sendTextMessage(senderId, 'Hello', (result) => console.log(`Result sent with: ${result}`));
...
//silent message sending without waiting for result, and continue processing
client.sendTextMessage(senderId,'Hello');
```

## Creating Facebook app
[See Facebook Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)

## Contributing

* Source hosted at [GitHub](https://github.com/crisboarna/fb-messenger-bot-api)
* Report issues/Questions/Feature requests on [GitHub Issues](https://github.com/crisboarna/fb-messenger-bot-api/issues)

Pull requests are very welcome!
