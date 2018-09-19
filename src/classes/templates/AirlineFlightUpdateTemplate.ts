import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineFlightUpdateTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { AirlineFlightUpdateTemplateBuilder } from '../../builders/templates';

/**
 * Represents an Airline Flight Update Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-flight-update
 */
export class AirlineFlightUpdateTemplate extends AbstractMessageTemplate implements IAirlineFlightUpdateTemplate {
  private _intro_message: string;
  private _locale: string;
  private _pnr_number?: string;
  private _theme_color?: string;
  private _update_flight_info: IBoardingPassFlightInfo;
  private _update_type: string;

  constructor(builder: AirlineFlightUpdateTemplateBuilder) {
    super(builder.getTemplateType());
    this._intro_message = builder.getIntroMessage();
    this._locale = builder.getLocale();
    this._pnr_number = builder.getPnrNumber();
    this._theme_color = builder.getThemeColor();
    this._update_flight_info = builder.getUpdateFlightInfo();
    this._update_type = builder.getUpdateType();
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

  get theme_color(): string|undefined {
    return this._theme_color;
  }

  get update_flight_info(): IBoardingPassFlightInfo {
    return this._update_flight_info;
  }

  get update_type(): string {
    return this._update_type;
  }
}
