import {Utils} from "../../src/util/Utils";

describe('FacebookProfileAPIClient', () => {

    let Profile: any;
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
        Profile = require('../../src/profile/FacebookProfileAPIClient').FacebookProfileAPIClient;
    });

    describe('constructor', () => {
        it('sets token and proxy', () => {
            const mockProxy = jest.fn();
            mockUtils.Utils.getProxyData = mockProxy;

            new Profile(TEST_TOKEN);
            expect(mockProxy).toHaveBeenCalled();
            expect(mockProxy).toHaveBeenCalledWith({token: TEST_TOKEN}, undefined);
            mockUtils.Utils.getProxyData = mockGetProxyData;
        });
    });

    describe('setGreetingMessage', () => {
        it('creates correct payload via promise case', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"greeting": {"text": "TEST_TEXT"}, "setting_type": "greeting"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/thread_settings"};
            testProfile.setGreetingMessage(TEST_TEXT);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('creates correct payload and passes through cb', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"greeting": {"text": "TEST_TEXT"}, "setting_type": "greeting"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/thread_settings"};
            testProfile.setGreetingMessage(TEST_TEXT, TEST_CB);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('setGetStartedAction', () => {
        it('creates correct payload via promise case', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"call_to_actions": [{"payload": "TEST_TEXT"}], "setting_type": "call_to_actions", "thread_state": "new_thread"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/thread_settings"};
            testProfile.setGetStartedAction(TEST_TEXT);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('creates correct payload and passes through cb', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"call_to_actions": [{"payload": "TEST_TEXT"}], "setting_type": "call_to_actions", "thread_state": "new_thread"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/thread_settings"};
            testProfile.setGetStartedAction(TEST_TEXT, TEST_CB);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('setPersistentMenu', () => {
        it('creates correct payload via promise case', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"persistent_menu": [{"call_to_actions": "TEST_TEXT", "locale": "default"}], "setting_type": "call_to_actions", "thread_state": "existing_thread"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messenger_profile"};
            testProfile.setPersistentMenu(TEST_TEXT);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('creates correct payload and passes through cb', () => {
            const testProfile = new Profile(TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            const EXPECTED_PAYLOAD = {"json": {"persistent_menu": [{"call_to_actions": "TEST_TEXT", "locale": "default"}], "setting_type": "call_to_actions", "thread_state": "existing_thread"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/me/messenger_profile"};
            testProfile.setPersistentMenu(TEST_TEXT, TEST_CB);
            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });
});