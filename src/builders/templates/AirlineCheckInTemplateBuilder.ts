import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { IAirlineCheckInTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { AirlineCheckInTemplate } from '../../classes/templates/AirlineCheckInTemplate';

/**
 * Represents an Airline CheckIn Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-checkin
 */
export class AirlineCheckInTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.AIRLINE_CHECKIN;
  private _checkin_url: string;
  private _flight_info: IBoardingPassFlightInfo[];
  private _intro_message: string;
  private _locale: string;
  private _pnr_number: string;

  public constructor() {}

  public getCheckinUrl(): string {
    return this._checkin_url;
  }

  public setCheckinUrl(value: string) {
    this._checkin_url = value;
  }

  public getFlightInfo(): IBoardingPassFlightInfo[] {
    return this._flight_info;
  }

  public setFlightInfo(value: IBoardingPassFlightInfo[]) {
    this._flight_info = value;
  }

  public getIntroMessage(): string {
    return this._intro_message;
  }

  public setIntroMessage(value: string) {
    this._intro_message = value;
  }

  public getLocale(): string {
    return this._locale;
  }

  public setLocale(value: string) {
    this._locale = value;
  }

  public getPnrNumber(): string {
    return this._pnr_number;
  }

  public setPnrNumber(value: string) {
    this._pnr_number = value;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public builder(): IAirlineCheckInTemplate {
    return new AirlineCheckInTemplate(this);
  }
}
