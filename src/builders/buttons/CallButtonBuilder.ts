import { ICallButton } from '../../interfaces';
import { CallButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a Call Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/call
 */
export class CallButtonBuilder {
  private _type = BUTTON_TYPE.CALL;
  private _payload: string;
  private _title: string;

  public constructor() {}

  public getType(): BUTTON_TYPE {
    return this._type;
  }

  public getPayload(): string {
    return this._payload;
  }

  public setPayload(value: string) {
    this._payload = value;
    return this;
  }

  public getTitle(): string {
    return this._title;
  }

  public setTitle(value: string) {
    this._title = value;
    return this;
  }

  public build(): ICallButton {
    return new CallButton(this);
  }
}
