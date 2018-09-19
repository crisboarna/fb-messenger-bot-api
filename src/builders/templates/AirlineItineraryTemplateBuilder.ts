import {
    IAirlineItineraryFlightInfo, IAirlineItineraryPassengerInfo,
    IAirlineItineraryPassengerSegment,
    IAirlineItineraryPriceInfo, IAirlineItineraryTemplate,
} from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { AirlineItineraryTemplate } from '../../classes/templates';

/**
 * Represents an Airline Itinerary Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary
 */
export class AirlineItineraryTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.AIRLINE_ITINERARY;
  private _base_price: number;
  private _currency: string;
  private _flight_info: IAirlineItineraryFlightInfo[];
  private _intro_message: string;
  private _locale: string;
  private _passenger_info: IAirlineItineraryPassengerInfo[];
  private _passenger_segment_info: IAirlineItineraryPassengerSegment[];
  private _pnr_number: string;
  private _price_info: IAirlineItineraryPriceInfo[];
  private _tax: number;
  private _theme_color: string;
  private _total_price: number;

  public constructor() {}

  public getBasePrice(): number {
    return this._base_price;
  }

  public setBasePrice(value: number) {
    this._base_price = value;
    return this;
  }

  public getCurrency(): string {
    return this._currency;
  }

  public setCurrency(value: string) {
    this._currency = value;
    return this;
  }

  public getFlightInfo(): IAirlineItineraryFlightInfo[] {
    return this._flight_info;
  }

  public setFlightInfo(value: IAirlineItineraryFlightInfo[]) {
    this._flight_info = value;
    return this;
  }

  public getIntroMessage(): string {
    return this._intro_message;
  }

  public setIntroMessage(value: string) {
    this._intro_message = value;
    return this;
  }

  public getLocale(): string {
    return this._locale;
  }

  public setLocale(value: string) {
    this._locale = value;
    return this;
  }

  public getPassengerInfo(): IAirlineItineraryPassengerInfo[] {
    return this._passenger_info;
  }

  public setPassengerInfo(value: IAirlineItineraryPassengerInfo[]) {
    this._passenger_info = value;
    return this;
  }

  public getPassengerSegmentInfo(): IAirlineItineraryPassengerSegment[] {
    return this._passenger_segment_info;
  }

  public setPassengerSegmentInfo(value: IAirlineItineraryPassengerSegment[]) {
    this._passenger_segment_info = value;
    return this;
  }

  public getPnrNumber(): string {
    return this._pnr_number;
  }

  public setPnrNumber(value: string) {
    this._pnr_number = value;
    return this;
  }

  public getPriceInfo(): IAirlineItineraryPriceInfo[] {
    return this._price_info;
  }

  public setPriceInfo(value: IAirlineItineraryPriceInfo[]) {
    this._price_info = value;
    return this;
  }

  public getTax(): number {
    return this._tax;
  }

  public setTax(value: number) {
    this._tax = value;
    return this;
  }

  public getThemeColor(): string {
    return this._theme_color;
  }

  public setThemeColor(value: string) {
    this._theme_color = value;
    return this;
  }

  public getTotalPrice(): number {
    return this._total_price;
  }

  public setTotalPrice(value: number) {
    this._total_price = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IAirlineItineraryTemplate {
    return new AirlineItineraryTemplate(this);
  }
}
