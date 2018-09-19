import { Button } from './Button';
import { IBuyButton, IPaymentSummary } from '../../interfaces';
import { BuyButtonBuilder } from '../../builders/buttons';

/**
 * Represents a Buy Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/buy
 */
export class BuyButton extends Button implements IBuyButton {
  private _payload: string;
  private _payment_summary: IPaymentSummary;
  private _title: string;

  constructor(builder: BuyButtonBuilder) {
    super(builder.getType());
    this._payload = builder.getPayload();
    this._payment_summary = builder.getPaymentSummary();
    this._title = builder.getTitle();
  }

  get payload(): string {
    return this._payload;
  }

  get payment_summary(): IPaymentSummary {
    return this._payment_summary;
  }

  get title(): string {
    return this._title;
  }
}
