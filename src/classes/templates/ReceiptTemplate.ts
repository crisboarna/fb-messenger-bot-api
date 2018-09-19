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
  private _address?: IReceiptAddressProperty;
  private _adjustments?: IReceiptAdjustmentProperty;
  private _currency: string;
  private _elements?: IReceiptElements;
  private _merchant_name?: string;
  private _order_number: string;
  private _payment_method: string;
  private _recipient_name: string;
  private _sharable?: boolean;
  private _summary: IReceiptSummaryProperty;
  private _timestamp?: string;

  constructor(builder: ReceiptTemplateBuilder) {
    super(builder.getTemplateType());
    this._address = builder.getAddress();
    this._adjustments = builder.getAdjustments();
    this._currency = builder.getCurrency();
    this._elements = builder.getElements();
    this._merchant_name = builder.getMerchantName();
    this._order_number = builder.getOrderNumber();
    this._payment_method = builder.getPaymenMmethod();
    this._recipient_name = builder.getRecipientName();
    this._sharable = builder.getSharable();
    this._summary = builder.getSummary();
    this._timestamp = builder.getTimestamp();
  }

  get address(): IReceiptAddressProperty|undefined {
    return this._address;
  }

  get adjustments(): IReceiptAdjustmentProperty|undefined {
    return this._adjustments;
  }

  get currency(): string {
    return this._currency;
  }

  get elements(): IReceiptElements|undefined {
    return this._elements;
  }

  get merchant_name(): string|undefined {
    return this._merchant_name;
  }

  get order_number(): string {
    return this._order_number;
  }

  get payment_method(): string {
    return this._payment_method;
  }

  get recipient_name(): string {
    return this._recipient_name;
  }

  get sharable(): boolean|undefined {
    return this._sharable;
  }

  get summary(): IReceiptSummaryProperty {
    return this._summary;
  }

  get timestamp(): string|undefined {
    return this._timestamp;
  }
}
