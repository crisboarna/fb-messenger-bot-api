import { IQuickReply } from '../interfaces';
import { QUICK_REPLY_TYPE } from '../enums';
import { QuickReplyBuilder } from '../builders';

/**
 * Represents a Quick Reply. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
 */
export class QuickReply implements IQuickReply {
  readonly content_type: QUICK_REPLY_TYPE;
  readonly title?: string;
  readonly payload?: string|number;
  readonly image_url?: string;

  public constructor(builder: QuickReplyBuilder) {
    this.content_type = builder.getContentType();
    this.title = builder.getTitle();
    this.image_url = builder.getImageUrl();
    this.payload = builder.getPayload();
  }

  get Content_type(): QUICK_REPLY_TYPE {
    return this.content_type;
  }

  get Title(): string|undefined {
    return this.title;
  }

  get Payload(): string | number|undefined {
    return this.payload;
  }

  get Image_url(): string|undefined {
    return this.image_url;
  }
}
