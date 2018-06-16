import { IQuickReply } from '../interfaces';
import { QUICK_REPLY_TYPE } from '../enums';
import { QuickReplyBuilder } from '../builders/QuickReplyBuilder';

/**
 * Represents a Quick Reply. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
 */
export class QuickReply implements IQuickReply {
  private _content_type: QUICK_REPLY_TYPE;
  private _title?: string;
  private _payload?: string|number;
  private _image_url?: string;

  public constructor(builder: QuickReplyBuilder) {
    this._content_type = builder.getContentType();
    this._title = builder.getTitle();
    this._image_url = builder.getImageUrl();
    this._payload = builder.getPayload();
  }

  get content_type(): QUICK_REPLY_TYPE {
    return this._content_type;
  }

  get title(): string|undefined {
    return this._title;
  }

  get payload(): string | number|undefined {
    return this._payload;
  }

  get image_url(): string|undefined {
    return this._image_url;
  }
}
