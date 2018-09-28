import { RequestData, Utils } from '../util/Utils';
import { IButton, ProxyData, IQuickReply, IMessageTemplate } from '../interfaces';
import { ATTACHMENT_TYPE } from '../enums';

export interface ClientMessage {
  message?: MessagePayload;
  sender_action?: string;
}

export interface AttachmentPayload {
  type: ATTACHMENT_TYPE;
  payload: Object;
}

export interface MessagePayload {
  text?: string;
  quick_replies?: IQuickReply[];
  attachment?: AttachmentPayload;
}

/**
 * Class representing an Send API client for Facebook. Can leverage existing classes/builders in project to provided required
 * structured objects for method payloads.
 * Can handle proxy by specifying 2nd argument as proxy to constructor
 * Can send image/video/audio/file payload as both url and reference ID
 */
export class Client {

  private static readonly markSeenPayload = 'mark_seen';
  private static readonly typingOn = 'typing_on';
  private static readonly typingOff = 'typing_off';

  private requestData: RequestData;

    /**
     * @param {string} token - Facebook Page Token
     * @param {ProxyData} proxyData - Proxy information if behind proxy
     */
  public constructor(token: string, proxyData: ProxyData) {
    this.requestData = { token };
    this.requestData = Utils.getProxyData(this.requestData, proxyData);
  }

    /**
     * Marks latest message from user as seen.
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public markSeen(id: string, cb?: Function) {
    return this.sendAction(id, Client.markSeenPayload, cb);
  }

    /**
     * Toggles typing notification in Messenger to on/off.
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {boolean | Function} toggle
     * @param {Function} cb
     * @return {any}
     */
  public toggleTyping(id: string, toggle: boolean|Function, cb?: Function) {
    if (arguments.length === 3) {
      return this.toggleAction(id, <boolean>toggle, cb);
        // tslint:disable-next-line
    } else {
      if (Object.prototype.toString.call(toggle) === '[object Function]') {
        return this.sendAction(id, Client.typingOff, <Function>toggle);
          // tslint:disable-next-line
      } else {
        return this.toggleAction(id, <boolean>toggle);
      }
    }
  }

    /**
     * Sends simple text message.
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} text
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendTextMessage(id: string, text: string, cb?: Function) {
    return this.sendDisplayMessage(id, { text }, cb);
  }

    /**
     * imageUrlOrId can be either URL to Image or ID of previously uploaded one
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} imageUrlOrId
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendImageMessage(id: string, imageUrlOrId: string, cb?: Function) {
    return this.sendUrlOrIdBasedMessage(id, ATTACHMENT_TYPE.IMAGE, imageUrlOrId, cb);
  }

    /**
     * audioUrlOrId can be either URL to audio clip or ID of previously uploaded one
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} audioUrlOrId
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendAudioMessage(id: string, audioUrlOrId: string, cb?: Function) {
    return this.sendUrlOrIdBasedMessage(id, ATTACHMENT_TYPE.AUDIO, audioUrlOrId, cb);
  }

    /**
     * videoUrlOrId can be either URL to video clip or ID of previously uploaded one
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} videoUrlOrId
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendVideoMessage(id: string, videoUrlOrId: string, cb?: Function) {
    return this.sendUrlOrIdBasedMessage(id, ATTACHMENT_TYPE.VIDEO, videoUrlOrId, cb);
  }

    /**
     * fileUrlOrId can be either URL to video clip or ID of previously uploaded one
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} fileUrlOrId
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendFileMessage(id: string, fileUrlOrId: string, cb?: Function) {
    return this.sendUrlOrIdBasedMessage(id, ATTACHMENT_TYPE.FILE, fileUrlOrId, cb);
  }

    /**
     * Sends any of the Button message types: https://developers.facebook.com/docs/messenger-platform/send-messages/buttons
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string} text
     * @param {IButton[]} buttons
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendButtonsMessage(id:string, text: string, buttons: IButton[], cb?: Function) {
    const payload = { type: ATTACHMENT_TYPE.TEMPLATE, payload: { text, buttons, template_type: 'button' } };
    return this.sendAttachmentMessage(id, payload, cb);
  }

    /**
     * Sends any template message type: https://developers.facebook.com/docs/messenger-platform/send-messages/templates
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {IMessageTemplate} templatePayload
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendTemplateMessage(id: string, templatePayload: IMessageTemplate, cb?: Function) {
    const payload = { type: ATTACHMENT_TYPE.TEMPLATE, payload: templatePayload };
    return this.sendAttachmentMessage(id, payload, cb);
  }

    /**
     * Sends Quick Reply message:
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string | AttachmentPayload} textOrAttachment
     * @param {IQuickReply[]} quickReplies
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public sendQuickReplyMessage(id: string, textOrAttachment: string|AttachmentPayload, quickReplies: IQuickReply[], cb?: Function) {
    let payload;
    if (typeof textOrAttachment === 'string') {
      payload = { text: textOrAttachment, quick_replies: quickReplies };
    } else {
      payload = { attachment: textOrAttachment, quick_replies: quickReplies };
    }
    return this.sendDisplayMessage(id, payload, cb);
  }

    /**
     *
     * Optional cb, otherwise returns promise
     * @param {string} id
     * @param {string[]} fieldsArray
     * @param {Function} cb
     * @return {Promise<any>}
     */
  public getUserProfile(id: string, fieldsArray: string[], cb?: Function) {
    const options = Utils.getRequestOptions();
    options.url += id;
    let fields;
    if (!Array.isArray(fieldsArray)) {
      fields = 'first_name';
    } else {
      fields = fieldsArray.join(',');
    }

    options.qs.fields = fields;
    options.method = 'GET';
    return Utils.sendMessage(options, this.requestData, cb);
  }

  private sendUrlOrIdBasedMessage(id: string, type: ATTACHMENT_TYPE, urlOrId: string, cb?: Function) {
    let payload;
    if (urlOrId.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      payload = { type, payload: { is_reusable: true, url: urlOrId } };
    } else {
      payload = { type, payload: { attachment_id: urlOrId } };
    }
    return this.sendAttachmentMessage(id, payload, cb);
  }

  private sendAttachmentMessage(id: string, payload: AttachmentPayload, cb?: Function) {
    return this.sendDisplayMessage(id, { attachment: payload }, cb);
  }

  private sendDisplayMessage(id: string, payload: MessagePayload, cb?: Function) {
    const options = this.generateBasicRequestPayload(id);
    options.json = { ...options.json, message:payload };
    return Utils.sendMessage(options, this.requestData, cb);
  }

  private sendAction(id: string, payload: string, cb?: Function) {
    const options = this.generateBasicRequestPayload(id);
    options.json = { ...options.json, sender_action:payload };
    return Utils.sendMessage(options, this.requestData, cb);
  }

  private generateBasicRequestPayload(id: string) {
    const options = Utils.getRequestOptions();
    options.url += 'me/messages';
    options.method = 'POST';
    options.json = { recipient: { id } };
    return options;
  }

  private toggleAction(id: string, toggleValue: boolean, cb?: Function) {
    if (toggleValue) {
      return this.sendAction(id, Client.typingOn, cb);
        // tslint:disable-next-line
    } else {
      return this.sendAction(id, Client.typingOff, cb);
    }
  }
}
