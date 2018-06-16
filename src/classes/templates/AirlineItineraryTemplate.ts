import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import {
    IAirlineItineraryFlightInfo,
    IAirlineItineraryPassengerInfo,
    IAirlineItineraryPassengerSegment, IAirlineItineraryPriceInfo,
    IAirlineItineraryTemplate,
} from '../../interfaces';
import { AirlineItineraryTemplateBuilder } from '../../builders/templates/AirlineItineraryTemplateBuilder';

/**
 * Represents an Airline Itinerary Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for
 * the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary
 */
export class AirlineItineraryTemplate extends AbstractMessageTemplate implements  IAirlineItineraryTemplate {
  public base_price?: number;
  public currency: string;
  public flight_info: IAirlineItineraryFlightInfo[];
  public intro_message: string;
  public locale: string;
  public passenger_info: IAirlineItineraryPassengerInfo[];
  public passenger_segment_info: IAirlineItineraryPassengerSegment[];
  public pnr_number: string;
  public price_info?: IAirlineItineraryPriceInfo[];
  public tax?: number;
  public theme_color?: string;
  public total_price: number;

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
}
