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
  private _checkin_url: string;
  private _flight_info: IBoardingPassFlightInfo[];
  private _intro_message: string;
  private _locale: string;
  private _pnr_number?: string;

  constructor(builder: AirlineCheckInTemplateBuilder) {
    super(builder.getTemplateType());
    this._checkin_url = builder.getCheckinUrl();
    this._flight_info = builder.getFlightInfo();
    this._intro_message = builder.getIntroMessage();
    this._locale = builder.getLocale();
    this._pnr_number = builder.getPnrNumber();
  }

  get checkin_url(): string {
    return this._checkin_url;
  }

  get flight_info(): IBoardingPassFlightInfo[] {
    return this._flight_info;
  }

  get intro_message(): string {
    return this._intro_message;
  }

  get locale(): string {
    return this._locale;
  }

  get pnr_number(): string|undefined {
    return this._pnr_number;
  }
}
