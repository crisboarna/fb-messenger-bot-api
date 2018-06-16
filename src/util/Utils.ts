import request from 'request';
import { ProxyData } from '../interfaces';
import { PageSettings } from '../profile/Profile';
import { PagePost } from '../page/Page';
import { ClientMessage } from '..';

export interface RequestOptions {
  url: string;
  qs: {
    access_token?: string,
    fields?: string,
  };
  method?: string;
  proxy?: Object;
  json?: PageSettings|PagePost|ClientMessage;
}

export interface RequestData {
  token: string;
  proxy?: string;
}

export class Utils {

  private static requestOptions: RequestOptions = {
    url: 'https://graph.facebook.com/v3.0/',
    qs: {
      access_token: undefined,
    },
    method: undefined,
  };

    /* istanbul ignore next line */
  private constructor() {}

  public static getRequestOptions(): RequestOptions {
    return <RequestOptions>JSON.parse(JSON.stringify(this.requestOptions));
  }

  public static sendMessage(options: RequestOptions, requestData: RequestData, cb?: Function) {
    options.qs.access_token = requestData.token;

    if (requestData.hasOwnProperty('proxy')) {
      options.proxy = requestData.proxy;
    }

    if (typeof cb !== 'function') {
      return new Promise((resolve, reject) => {
        request(options, (err, _res, body) => {
          if (err) {
            reject(err);
          } else {
            if (!(body && body.constructor === Object)) {
              const bodyObject = JSON.parse(body);
              if (bodyObject.error) {
                reject(bodyObject.error.message);
              } else {
                resolve(bodyObject);
              }
            } else {
              if (body.error) {
                reject(body.error.message);
              } else {
                resolve(body);
              }
            }
          }
        });
      });
      // tslint:disable-next-line
    } else {
      request(options, (err, _res, body) => {
        if (err) return cb(err);
        if (body.error) return cb(body.error);
        cb(null,body);
      });
      return undefined;
    }
  }

  public static getProxyData(requestData: RequestData, proxyData?: ProxyData) {
    if (proxyData) {
      if (Object.prototype.toString.call(proxyData) === '[object Object]'
          && proxyData.hasOwnProperty('hostname')
          && proxyData.hasOwnProperty('port')) {
        if (proxyData.hostname.indexOf('http') === 0) {
          requestData.proxy = `${proxyData.hostname}:${proxyData.port}`;
        } else {
          requestData.proxy = `http://${proxyData.hostname}:${proxyData.port}`;
        }
      } else {
        throw new Error('Invalid Proxy object given, expected hostname and port');
      }
    }
    return requestData;
  }
}
