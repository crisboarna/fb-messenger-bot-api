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
  public payload: string;
  public payment_summary: IPaymentSummary;
  public title: string;

  constructor(builder: BuyButtonBuilder) {
    super(builder.getType());
    this.payload = builder.getPayload();
    this.payment_summary = builder.getPaymentSummary();
    this.title = builder.getTitle();
  }
}
