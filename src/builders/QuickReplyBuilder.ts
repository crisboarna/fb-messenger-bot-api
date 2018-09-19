import { QUICK_REPLY_TYPE } from '../enums';
import { QuickReply } from '../classes';

/**
 * Represents a Quick Reply. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
 */
export class QuickReplyBuilder {
  private _content_type: QUICK_REPLY_TYPE;
  private _title?: string;
  private _payload?: string|number;
  private _image_url?: string;

  public constructor() {}

  public getContentType(): QUICK_REPLY_TYPE {
    return this._content_type;
  }

  public setContentType(value: QUICK_REPLY_TYPE): QuickReplyBuilder {
    this._content_type = value;
    return this;
  }

  public getTitle(): string|undefined {
    return this._title;
  }

  public setTitle(value: string): QuickReplyBuilder {
    this._title = value;
    return this;
  }

  public getPayload(): string |number|undefined {
    return this._payload;
  }

  public setPayload(value: string | number): QuickReplyBuilder {
    this._payload = value;
    return this;
  }

  public getImageUrl(): string|undefined {
    return this._image_url;
  }

  public setImageUrl(value: string): QuickReplyBuilder {
    this._image_url = value;
    return this;
  }

  public build(): QuickReply {
    return new QuickReply(this);
  }
}
