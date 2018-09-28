import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineCheckInTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { AirlineCheckInTemplateBuilder } from '../../builders/templates';

/**
 * Represents an Airline CheckIn Template. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-checkin
 */
export class AirlineCheckInTemplate extends AbstractMessageTemplate implements IAirlineCheckInTemplate {
  readonly checkin_url: string;
  readonly flight_info: IBoardingPassFlightInfo[];
  readonly intro_message: string;
  readonly locale: string;
  readonly pnr_number?: string;

  constructor(builder: AirlineCheckInTemplateBuilder) {
    super(builder.getTemplateType());
    this.checkin_url = builder.getCheckinUrl();
    this.flight_info = builder.getFlightInfo();
    this.intro_message = builder.getIntroMessage();
    this.locale = builder.getLocale();
    this.pnr_number = builder.getPnrNumber();
  }

  get Checkin_url(): string {
    return this.checkin_url;
  }

  get Flight_info(): IBoardingPassFlightInfo[] {
    return this.flight_info;
  }

  get Intro_message(): string {
    return this.intro_message;
  }

  get Locale(): string {
    return this.locale;
  }

  get Pnr_number(): string|undefined {
    return this.pnr_number;
  }
}
