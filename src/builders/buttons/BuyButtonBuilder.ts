import { IBuyButton, IPaymentSummary } from '../../interfaces';
import { BuyButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a Buy Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/buy
 */
export class BuyButtonBuilder {
  private _type = BUTTON_TYPE.BUY;
  private _payload: string;
  private _payment_summary: IPaymentSummary;
  private _title: string;

  public constructor() {}

  public getType() {
    return this._type;
  }

  public getPayload(): string {
    return this._payload;
  }

  public setPayload(value: string) {
    this._payload = value;
    return this;
  }

  public getPaymentSummary(): IPaymentSummary {
    return this._payment_summary;
  }

  public setPaymentSummary(value: IPaymentSummary) {
    this._payment_summary = value;
    return this;
  }

  public getTitle(): string {
    return this._title;
  }

  public setTitle(value: string) {
    this._title = value;
    return this;
  }

  public build(): IBuyButton {
    return new BuyButton(this);
  }
}
