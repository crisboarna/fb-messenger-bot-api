import {
    IReceiptAddressProperty,
    IReceiptAdjustmentProperty,
    IReceiptElements,
    IReceiptSummaryProperty, IReceiptTemplate,
} from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { ReceiptTemplate } from '../../classes/templates';

/**
 * Represents a Receipt Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 */
export class ReceiptTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.RECEIPT;
  private _address: IReceiptAddressProperty;
  private _adjustments: IReceiptAdjustmentProperty;
  private _currency: string;
  private _elements: IReceiptElements;
  private _merchant_name: string;
  private _order_number: string;
  private _payment_method: string;
  private _recipient_name: string;
  private _sharable: boolean;
  private _summary: IReceiptSummaryProperty;
  private _timestamp: string;

  public constructor() {}

  public getAddress(): IReceiptAddressProperty {
    return this._address;
  }

  public setAddress(value: IReceiptAddressProperty) {
    this._address = value;
    return this;
  }

  public getAdjustments(): IReceiptAdjustmentProperty {
    return this._adjustments;
  }

  public setAdjustments(value: IReceiptAdjustmentProperty) {
    this._adjustments = value;
    return this;
  }

  public getCurrency(): string {
    return this._currency;
  }

  public setCurrency(value: string) {
    this._currency = value;
    return this;
  }

  public getElements(): IReceiptElements {
    return this._elements;
  }

  public setElements(value: IReceiptElements) {
    this._elements = value;
    return this;
  }

  public getMerchantName(): string {
    return this._merchant_name;
  }

  public setMerchantName(value: string) {
    this._merchant_name = value;
    return this;
  }

  public getOrderNumber(): string {
    return this._order_number;
  }

  public setOrderNumber(value: string) {
    this._order_number = value;
    return this;
  }

  public getPaymenMmethod(): string {
    return this._payment_method;
  }

  public setPaymentMethod(value: string) {
    this._payment_method = value;
    return this;
  }

  public getRecipientName(): string {
    return this._recipient_name;
  }

  public setRecipientName(value: string) {
    this._recipient_name = value;
    return this;
  }

  public getSharable(): boolean {
    return this._sharable;
  }

  public setSharable(value: boolean) {
    this._sharable = value;
    return this;
  }

  public getSummary(): IReceiptSummaryProperty {
    return this._summary;
  }

  public setSummary(value: IReceiptSummaryProperty) {
    this._summary = value;
    return this;
  }

  public getTimestamp(): string {
    return this._timestamp;
  }

  public setTimestamp(value: string) {
    this._timestamp = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IReceiptTemplate {
    return new ReceiptTemplate(this);
  }
}
