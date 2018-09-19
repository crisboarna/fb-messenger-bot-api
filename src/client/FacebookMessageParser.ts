import { FacebookMessagePayload, FacebookMessagePayloadEntry } from '../interfaces';

export class FacebookMessageParser {

    /* istanbul ignore next line */
  private constructor() {}

  public static parsePayload(payload: FacebookMessagePayload): FacebookMessagePayloadEntry[]|null {

    if (payload.hasOwnProperty('object') && payload.object === 'page' &&
            typeof payload.entry !== 'undefined') {

      return FacebookMessageParser.flattenPayload(payload.entry);
    }

    console.error('Invalid/Unknown Facebook Message Event.', { payload });
    return null;
  }

  private static flattenPayload(payload: any[]): any {
    return payload.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? FacebookMessageParser.flattenPayload(toFlatten) :
                Array.isArray(toFlatten.messaging) ? FacebookMessageParser.flattenPayload(toFlatten.messaging) :
                    toFlatten);
    },                    []);
  }
}
