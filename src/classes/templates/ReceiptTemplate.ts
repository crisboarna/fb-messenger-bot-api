import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import {
    IReceiptAddressProperty,
    IReceiptAdjustmentProperty,
    IReceiptElements, IReceiptSummaryProperty,
    IReceiptTemplate,
} from '../../interfaces';
import { ReceiptTemplateBuilder } from '../../builders/templates';

/**
 * Represents a Receipt Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 */
export class ReceiptTemplate extends AbstractMessageTemplate implements IReceiptTemplate {
  readonly address?: IReceiptAddressProperty;
  readonly adjustments?: IReceiptAdjustmentProperty;
  readonly currency: string;
  readonly elements?: IReceiptElements;
  readonly merchant_name?: string;
  readonly order_number: string;
  readonly payment_method: string;
  readonly recipient_name: string;
  readonly sharable?: boolean;
  readonly summary: IReceiptSummaryProperty;
  readonly timestamp?: string;

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

  get Address(): IReceiptAddressProperty|undefined {
    return this.address;
  }

  get Adjustments(): IReceiptAdjustmentProperty|undefined {
    return this.adjustments;
  }

  get Currency(): string {
    return this.currency;
  }

  get Elements(): IReceiptElements|undefined {
    return this.elements;
  }

  get Merchant_name(): string|undefined {
    return this.merchant_name;
  }

  get Order_number(): string {
    return this.order_number;
  }

  get Payment_method(): string {
    return this.payment_method;
  }

  get Recipient_name(): string {
    return this.recipient_name;
  }

  get Sharable(): boolean|undefined {
    return this.sharable;
  }

  get Summary(): IReceiptSummaryProperty {
    return this.summary;
  }

  get Timestamp(): string|undefined {
    return this.timestamp;
  }
}
