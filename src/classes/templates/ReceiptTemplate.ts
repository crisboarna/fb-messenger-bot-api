import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import {
    IReceiptAddressProperty,
    IReceiptAdjustmentProperty,
    IReceiptElements, IReceiptSummaryProperty,
    IReceiptTemplate,
} from '../../interfaces';
import { ReceiptTemplateBuilder } from '../../builders/templates/ReceiptTemplateBuilder';

/**
 * Represents a Receipt Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 */
export class ReceiptTemplate extends AbstractMessageTemplate implements IReceiptTemplate {
  public address?: IReceiptAddressProperty;
  public adjustments?: IReceiptAdjustmentProperty;
  public currency: string;
  public elements?: IReceiptElements;
  public merchant_name?: string;
  public order_number: string;
  public payment_method: string;
  public recipient_name: string;
  public sharable?: boolean;
  public summary: IReceiptSummaryProperty;
  public timestamp?: string;

  constructor(builder: ReceiptTemplateBuilder) {
    super(builder.getTemplateType());
    this.address = builder.getAddress();
    this.adjustments = builder.getAdjustments();
    this.currency = builder.getCurrency();
    this.elements = builder.getElements();
    this.merchant_name = builder.getMerchantName();
    this.order_number = builder.getOrderNumber();
    this.payment_method = builder.getPaymenMmethod();
    this.recipient_name = builder.getRecipientName();
    this.sharable = builder.getSharable();
    this.summary = builder.getSummary();
    this.timestamp = builder.getTimestamp();
  }
}
