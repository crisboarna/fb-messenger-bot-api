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
  readonly base_price?: number;
  readonly currency: string;
  readonly flight_info: IAirlineItineraryFlightInfo[];
  readonly intro_message: string;
  readonly locale: string;
  readonly passenger_info: IAirlineItineraryPassengerInfo[];
  readonly passenger_segment_info: IAirlineItineraryPassengerSegment[];
  readonly pnr_number: string;
  readonly price_info?: IAirlineItineraryPriceInfo[];
  readonly tax?: number;
  readonly theme_color?: string;
  readonly total_price: number;

  constructor(builder: AirlineItineraryTemplateBuilder) {
    super(builder.getTemplateType());
    this.base_price = builder.getBasePrice();
    this.currency = builder.getCurrency();
    this.flight_info = builder.getFlightInfo();
    this.intro_message = builder.getIntroMessage();
    this.locale = builder.getLocale();
    this.passenger_info = builder.getPassengerInfo();
    this.passenger_segment_info = builder.getPassengerSegmentInfo();
    this.pnr_number = builder.getPnrNumber();
    this.price_info = builder.getPriceInfo();
    this.tax = builder.getTax();
    this.theme_color = builder.getThemeColor();
    this.total_price = builder.getTotalPrice();
  }

  get Base_price(): number|undefined {
    return this.base_price;
  }

  get Currency(): string {
    return this.currency;
  }

  get Flight_info(): IAirlineItineraryFlightInfo[] {
    return this.flight_info;
  }

  get Intro_message(): string {
    return this.intro_message;
  }

  get Locale(): string {
    return this.locale;
  }

  get Passenger_info(): IAirlineItineraryPassengerInfo[] {
    return this.passenger_info;
  }

  get Passenger_segment_info(): IAirlineItineraryPassengerSegment[] {
    return this.passenger_segment_info;
  }

  get Pnr_number(): string {
    return this.pnr_number;
  }

  get Price_info(): IAirlineItineraryPriceInfo[]|undefined {
    return this.price_info;
  }

  get Tax(): number|undefined {
    return this.tax;
  }

  get Theme_color(): string|undefined {
    return this.theme_color;
  }

  get Total_price(): number {
    return this.total_price;
  }
}
