import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import {
    IAirlineItineraryFlightInfo,
    IAirlineItineraryPassengerInfo,
    IAirlineItineraryPassengerSegment, IAirlineItineraryPriceInfo,
    IAirlineItineraryTemplate,
} from '../../interfaces';
import { AirlineItineraryTemplateBuilder } from '../../builders/templates';

/**
 * Represents an Airline Itinerary Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the
 * object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary
 */
export class AirlineItineraryTemplate extends AbstractMessageTemplate implements  IAirlineItineraryTemplate {
  private _base_price?: number;
  private _currency: string;
  private _flight_info: IAirlineItineraryFlightInfo[];
  private _intro_message: string;
  private _locale: string;
  private _passenger_info: IAirlineItineraryPassengerInfo[];
  private _passenger_segment_info: IAirlineItineraryPassengerSegment[];
  private _pnr_number: string;
  private _price_info?: IAirlineItineraryPriceInfo[];
  private _tax?: number;
  private _theme_color?: string;
  private _total_price: number;

  constructor(builder: AirlineItineraryTemplateBuilder) {
    super(builder.getTemplateType());
    this._base_price = builder.getBasePrice();
    this._currency = builder.getCurrency();
    this._flight_info = builder.getFlightInfo();
    this._intro_message = builder.getIntroMessage();
    this._locale = builder.getLocale();
    this._passenger_info = builder.getPassengerInfo();
    this._passenger_segment_info = builder.getPassengerSegmentInfo();
    this._pnr_number = builder.getPnrNumber();
    this._price_info = builder.getPriceInfo();
    this._tax = builder.getTax();
    this._theme_color = builder.getThemeColor();
    this._total_price = builder.getTotalPrice();
  }

  get base_price(): number|undefined {
    return this._base_price;
  }

  get currency(): string {
    return this._currency;
  }

  get flight_info(): IAirlineItineraryFlightInfo[] {
    return this._flight_info;
  }

  get intro_message(): string {
    return this._intro_message;
  }

  get locale(): string {
    return this._locale;
  }

  get passenger_info(): IAirlineItineraryPassengerInfo[] {
    return this._passenger_info;
  }

  get passenger_segment_info(): IAirlineItineraryPassengerSegment[] {
    return this._passenger_segment_info;
  }

  get pnr_number(): string {
    return this._pnr_number;
  }

  get price_info(): IAirlineItineraryPriceInfo[]|undefined {
    return this._price_info;
  }

  get tax(): number|undefined {
    return this._tax;
  }

  get theme_color(): string|undefined {
    return this._theme_color;
  }

  get total_price(): number {
    return this._total_price;
  }
}
