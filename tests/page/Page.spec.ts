describe('Page', () => {
    let Page: any;
    let client: any;
    const TEST_PAGE_ID = 'TEST_PAGE_ID';
    const TEST_TOKEN = 'TEST_TOKEN';
    const TEST_TEXT = 'TEST_TEXT';
    const TEST_CALLBACK = () => {};
    const mockRequest = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        jest.mock('request', () => mockRequest);
        Page = require('../../src/page/Page').Page;
    });

    describe('sendImage', () => {
        const correctPayload = {
            json: {
                caption: TEST_TEXT,
                url: TEST_TEXT
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: `https://graph.facebook.com/v3.1/${TEST_PAGE_ID}/photos`
        };

        it('returns promise given no cb and generates correct request payload', () => {
            client = new Page(TEST_PAGE_ID, TEST_TOKEN);

            const result = client.setImageUrl(TEST_TEXT).setImageCaption(TEST_TEXT).sendImage();

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            client = new Page(TEST_PAGE_ID, TEST_TOKEN);

            const result = client.setImageUrl(TEST_TEXT).setImageCaption(TEST_TEXT).sendImage(TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });

    describe('sendPost', () => {
        const correctPayload = {
            json: {
                message: TEST_TEXT,
                link: TEST_TEXT
            },
            method: 'POST',
            qs: {
                access_token: 'TEST_TOKEN'
            },
            url: `https://graph.facebook.com/v3.1/${TEST_PAGE_ID}/feed`
        };

        it('returns promise given no cb and generates correct request payload', () => {
            client = new Page(TEST_PAGE_ID, TEST_TOKEN);

            const result = client.setPostText(TEST_TEXT).setPostLink(TEST_TEXT).sendPost();

            expect(result.constructor).toEqual(Promise);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });

        it('given cb no promise returned and correct payload generated', () => {
            client = new Page(TEST_PAGE_ID, TEST_TOKEN);

            const result = client.setPostText(TEST_TEXT).setPostLink(TEST_TEXT).sendPost(TEST_CALLBACK);

            expect(result instanceof Promise).toEqual(true);
            expect(mockRequest).toHaveBeenCalled();
            expect(mockRequest).toHaveBeenCalledWith(correctPayload, expect.any(Function));
        });
    });
});