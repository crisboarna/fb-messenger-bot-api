import {Utils} from "../../src/util/Utils";

describe('FacebookPageAPIClient', () => {

    let Page: any;
    const TEST_ID = 'TEST_ID';
    const TEST_TOKEN = 'TEST_TOKEN';
    const TEST_TEXT = 'TEST_TEXT';
    const TEST_DATA = 'TEST_DATA';
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
        Page = require('../../src/page/FacebookPageAPIClient').FacebookPageAPIClient;
    });

    describe('constructor', () => {
        it('sets token and proxy', () => {
            const mockProxy = jest.fn();
            mockUtils.Utils.getProxyData = mockProxy;

            new Page(TEST_ID, TEST_TOKEN);

            expect(mockProxy).toHaveBeenCalled();
            expect(mockProxy).toHaveBeenCalledWith({token: TEST_TOKEN}, undefined);
            mockUtils.Utils.getProxyData = mockGetProxyData;
        });
    });

    describe('setImageUrl', () => {
        it('creates correct payload', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);

            const result = testProfile.setImageUrl(TEST_TEXT);

            expect(result.constructor.name).toEqual('FacebookPageAPIClient');
            expect(result.url).toEqual(TEST_TEXT);
            expect(result.caption).toBeUndefined();
            expect(result.message).toBeUndefined();
            expect(result.link).toBeUndefined();
        });
    });

    describe('setImageCaption', () => {
        it('creates correct payload', () => {
            const testPage = new Page(TEST_ID, TEST_TOKEN);

            const result = testPage.setImageCaption(TEST_TEXT);

            expect(result.constructor.name).toEqual('FacebookPageAPIClient');
            expect(result.caption).toEqual(TEST_TEXT);
            expect(result.url).toBeUndefined();
            expect(result.message).toBeUndefined();
            expect(result.link).toBeUndefined();
        });
    });

    describe('setPostText', () => {
        it('creates correct payload', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);

            const result = testProfile.setPostText(TEST_TEXT);

            expect(result.constructor.name).toEqual('FacebookPageAPIClient');
            expect(result.message).toEqual(TEST_TEXT);
            expect(result.caption).toBeUndefined();
            expect(result.url).toBeUndefined();
            expect(result.link).toBeUndefined();
        });
    });

    describe('setPostLink', () => {
        it('creates correct payload', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);

            const result = testProfile.setPostLink(TEST_TEXT);

            expect(result.constructor.name).toEqual('FacebookPageAPIClient');
            expect(result.link).toEqual(TEST_TEXT);
            expect(result.message).toBeUndefined();
            expect(result.caption).toBeUndefined();
            expect(result.url).toBeUndefined();
        });
    });

    describe('sendImage', () => {
        it('creates correct payload via promise case', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"caption": "TEST_TEXT", "url": "TEST_DATA"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/TEST_ID/photos"};
            testProfile.setImageCaption(TEST_TEXT);
            testProfile.setImageUrl(TEST_DATA);

            testProfile.sendImage();

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('creates correct payload and passes through cb', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            testProfile.setImageCaption(TEST_TEXT);
            testProfile.setImageUrl(TEST_DATA);
            const EXPECTED_PAYLOAD = {"json": {"caption": "TEST_TEXT", "url": "TEST_DATA"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/TEST_ID/photos"};

            testProfile.sendImage(TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });

    describe('sendPost', () => {
        it('creates correct payload via promise case', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);
            const EXPECTED_PAYLOAD = {"json": {"link": "TEST_DATA", "message": "TEST_TEXT"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/TEST_ID/feed"};
            testProfile.setPostText(TEST_TEXT);
            testProfile.setPostLink(TEST_DATA);

            testProfile.sendPost();

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, undefined);
        });

        it('creates correct payload and passes through cb', () => {
            const testProfile = new Page(TEST_ID, TEST_TOKEN);
            const TEST_CB = () => TEST_TOKEN;
            testProfile.setPostText(TEST_TEXT);
            testProfile.setPostLink(TEST_DATA);
            const EXPECTED_PAYLOAD = {"json": {"link": "TEST_DATA", "message": "TEST_TEXT"}, "method": "POST", "qs": {}, "url": "https://graph.facebook.com/v3.1/TEST_ID/feed"};

            testProfile.sendPost(TEST_CB);

            expect(mockSendMessage).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith(EXPECTED_PAYLOAD, {token: TEST_TOKEN}, TEST_CB);
        });
    });
});