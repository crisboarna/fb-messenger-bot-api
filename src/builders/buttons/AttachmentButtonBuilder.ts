import { IButton } from '../../interfaces';
import { ATTACHMENT_TYPE } from '../../enums';
import { AttachmentButtonPayload } from '../../classes/buttons';

/**
 * Represents an entire Button payload. To be used as payload for Quick Reply attachment type to send Button with Quick Replies
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons
 */
export class AttachmentButtonBuilder {
  private _type = ATTACHMENT_TYPE.TEMPLATE;
  private _text: string;
  private _buttons: IButton[];

  public constructor() {}

  public getType(): ATTACHMENT_TYPE {
    return this._type;
  }

  public getText(): string {
    return this._text;
  }

  public setText(value: string) {
    this._text = value;
    return this;
  }

  public getButtons(): IButton[] {
    return this._buttons;
  }

  public setButtons(value: IButton[]) {
    this._buttons = value;
    return this;
  }

  public build(): AttachmentButtonPayload {
    return new AttachmentButtonPayload(this);
  }
}
