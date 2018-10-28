import {FacebookMessageParser} from "../../src";

describe('FacebookMessageParser', () => {
    describe('parsePayload', () => {
        it('given invalid payload, return []', () => {
            expect(FacebookMessageParser.parsePayload(<any>{})).toEqual([]);
        });

        it('given object property of incorrect value, return []', () => {
            expect(FacebookMessageParser.parsePayload(<any>{object: 'TEST'})).toEqual([]);
        });

        it('given correct object property with no entry, return []', () => {
            expect(FacebookMessageParser.parsePayload(<any>{object: 'page'})).toEqual([]);
        });

        it('given correct object property and entry with no deep entry, return correct result', () => {
            const INPUT_PAYLOAD = {object: 'page', entry: [[{test:1}]]};
            expect(FacebookMessageParser.parsePayload(<any>INPUT_PAYLOAD)).toEqual([{test:1}]);

        });

        it('given correct object property and entry, return flattened array', () => {
            const OBJECT_1 = {
                sender: {
                    id: '1'
                },
                recipient: {
                    id: '1'
                },
                timestamp: 11
            };

            const OBJECT_2 = {
                sender: {
                    id: '2'
                },
                recipient: {
                    id: '2'
                },
                timestamp: 22
            };

            const ENTRY_OBJECT_1 = {messaging: [OBJECT_1]};

            const ENTRY_OBJECT_2 = {messaging: []};

            const ENTRY_OBJECT_3 = {messaging: [OBJECT_1, OBJECT_2]};

            const INPUT_PAYLOAD = {object: 'page', entry: [ENTRY_OBJECT_1, ENTRY_OBJECT_2, ENTRY_OBJECT_3]};
            const EXPECTED_PAYLOAD = [OBJECT_1, OBJECT_1, OBJECT_2];

            expect(FacebookMessageParser.parsePayload(<any>INPUT_PAYLOAD)).toEqual(EXPECTED_PAYLOAD);
        });
    });
});