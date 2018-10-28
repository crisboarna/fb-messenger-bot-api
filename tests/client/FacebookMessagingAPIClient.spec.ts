import {Utils} from "../../src/util/Utils";
import {ATTACHMENT_TYPE} from "../../src/enums";

describe('FacebookMessagingAPIClient', () => {
    let Client: any;
    const TEST_ID = 'TEST_ID';
    const TEST_TOKEN = 'TEST_TOKEN';
    const TEST_TEXT = 'TEST_TEXT';
    const mockSendMessage = jest.fn();
    const mockGetProxyData = (data: any) => data;
    const mockUtils = {
        Utils: {
            sendMessage: mockSendMessage,
            getProxyData: mockGetProxyData,
            getRequestOptions: Utils.getRequestOptions
        }
    };

    beforeEach(() => {
        jest.mock('../../src/util/Utils', () => mockUtils);
        Client = require('../../src/client/FacebookMessagingAPIClient').FacebookMessagingAPIClient;
    });

    describe('constructor', () => {
        it('sets token and proxy', () => {
            const mockProxy = jest.fn();
            mockUtils.Utils.getProxyData = mockProxy;

            new Client(TEST_TOKEN);

            expect(mockProxy).toHaveBeenCalled();
            expect(mockProxy).toHaveBeenCalledWith({token: TEST_TOKEN}, undefined);
            mockUtils.Utils.getProxyData = mockGetProxyData;
        });
    });

    describe('markSeen', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_TEXT"}, "sender_action": "mark_seen"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.markSeen(TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_TEXT"}, "sender_action": "mark_seen"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.markSeen(TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('toggleTyping', () => {
        it('send correct payload as promise given no cb and no toggle value - default to off', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_ID"}, "sender_action": "typing_off"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.toggleTyping(TEST_ID);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload as promise given no cb and specified value', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_ID"}, "sender_action": "typing_on"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.toggleTyping(TEST_ID, true);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_TEXT"}, "sender_action": "typing_on"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.toggleTyping(TEST_TEXT, true, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });

        it('send correct payload with cb given cb and no value specified - using default value', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"recipient": {"id": "TEST_TEXT"}, "sender_action": "typing_off"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.toggleTyping(TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendTextMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"text": TEST_TEXT}, "recipient": {"id": "TEST_ID"} }, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendTextMessage(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"text": TEST_TEXT}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendTextMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendImageMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "image"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendImageMessage(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "image"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendImageMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendAudioMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "audio"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendAudioMessage(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "audio"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendAudioMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendVideoMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "video"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendVideoMessage(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "video"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendVideoMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendFileMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_URL = 'http://www.testremoteurl.com/image.jpg';
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"is_reusable": true, "url": "http://www.testremoteurl.com/image.jpg"}, "type": "file"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendFileMessage(TEST_ID, TEST_URL);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"attachment_id": "TEST_TEXT"}, "type": "file"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendFileMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendButtonsMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"buttons": [], "template_type": "button", "text": "TEST_TEXT"}, "type": "template"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendButtonsMessage(TEST_ID, TEST_TEXT, []);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"buttons": [], "template_type": "button", "text": "TEST_TEXT"}, "type": "template"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendButtonsMessage(TEST_ID, TEST_TEXT, [], TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendTemplateMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": "TEST_TEXT", "type": "template"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendTemplateMessage(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": "TEST_TEXT", "type": "template"}}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendTemplateMessage(TEST_ID, TEST_TEXT, TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendQuickReplyMessage', () => {
        it('send correct payload as promise given no cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"message": {"attachment": {"payload": {"test": "TEST_TEXT"}, "type": "template"}, "quick_replies": []}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendQuickReplyMessage(TEST_ID, {type: ATTACHMENT_TYPE.TEMPLATE,payload: {test:TEST_TEXT}}, []);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"message": {"quick_replies": [], "text": "TEST_TEXT"}, "recipient": {"id": "TEST_ID"}}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messages"};

            testClient.sendQuickReplyMessage(TEST_ID, TEST_TEXT, [], TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('getUserProfile', () => {
        it('send correct default payload as promise given incorrect fieldsArray parameter', () => {
            const testClient = new Client(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"method": "GET", "qs": {"fields": "first_name"}, "url": "https://graph.facebook.com/v3.1/TEST_ID"};

            testClient.getUserProfile(TEST_ID, TEST_TEXT);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('send correct payload with cb given cb and correct payload parameter', () => {
            const testClient = new Client(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"method": "GET", "qs": {"fields": "first_name,last_name,birth_date"}, "url": "https://graph.facebook.com/v3.1/TEST_ID"};

            testClient.getUserProfile(TEST_ID,['first_name', 'last_name', 'birth_date'], TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });
});