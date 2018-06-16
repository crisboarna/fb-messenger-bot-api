import { IAirlineFlightUpdateTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { AirlineFlightUpdateTemplate } from '../../classes/templates/AirlineFlightUpdateTemplate';

/**
 * Represents an Airline Flight Update Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-flight-update
 */
export class AirlineFlightUpdateTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.AIRLINE_UPDATE;
  private _intro_message: string;
  private _locale: string;
  private _pnr_number: string;
  private _theme_color: string;
  private _update_flight_info: IBoardingPassFlightInfo;
  private _update_type: string;

  public constructor() {}

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

  public getPnrNumber(): string {
    return this._pnr_number;
  }

  public setPnrNumber(value: string) {
    this._pnr_number = value;
    return this;
  }

  public getThemeColor(): string {
    return this._theme_color;
  }

  public setThemeColor(value: string) {
    this._theme_color = value;
    return this;
  }

  public getUpdateFlightInfo(): IBoardingPassFlightInfo {
    return this._update_flight_info;
  }

  public setUpdateFlightInfo(value: IBoardingPassFlightInfo) {
    this._update_flight_info = value;
    return this;
  }

  public getUpdateType(): string {
    return this._update_type;
  }

  public setUpdateType(value: string) {
    this._update_type = value;
    return this;
  }

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public build(): IAirlineFlightUpdateTemplate {
    return new AirlineFlightUpdateTemplate(this);
  }
}
