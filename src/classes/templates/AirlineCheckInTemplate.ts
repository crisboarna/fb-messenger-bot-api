import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineCheckInTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { AirlineCheckInTemplateBuilder } from '../../builders/templates/AirlineCheckInTemplateBuilder';

/**
 * Represents an Airline CheckIn Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-checkin
 */
export class AirlineCheckInTemplate extends AbstractMessageTemplate implements IAirlineCheckInTemplate {
  public checkin_url: string;
  public flight_info: IBoardingPassFlightInfo[];
  public intro_message: string;
  public locale: string;
  public pnr_number?: string;

  constructor(builder: AirlineCheckInTemplateBuilder) {
    super(builder.getTemplateType());
    this.checkin_url = builder.getCheckinUrl();
    this.flight_info = builder.getFlightInfo();
    this.intro_message = builder.getIntroMessage();
    this.locale = builder.getLocale();
    this.pnr_number = builder.getPnrNumber();
  }
}
