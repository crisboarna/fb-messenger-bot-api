import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
import { IAirlineBoardingPassTemplate, IBoardingPass } from '../../interfaces';
import { AirlineBoardingPassTemplate } from '../../classes/templates/AirlineBoardingPassTemplate';

/**
 * Represents an Airline Boarding Pass Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass
 */
export class AirlineBoardingPassTemplateBuilder {
  private _template_type = MESSAGE_TEMPLATE_TYPE.AIRLINE_BOARDING_PASS;
  private _boarding_pass: IBoardingPass[];
  private _intro_message: string;
  private _locale: string;
  private _theme_color: string;

  public constructor() {}

  public getTemplateType(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }

  public getBoardingPass(): IBoardingPass[] {
    return this._boarding_pass;
  }

  public setBoardingPass(value: IBoardingPass[]) {
    this._boarding_pass = value;
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

  public getThemeColor(): string {
    return this._theme_color;
  }

  public setThemeColor(value: string) {
    this._theme_color = value;
    return this;
  }

  public build(): IAirlineBoardingPassTemplate {
    return new AirlineBoardingPassTemplate(this);
  }
}
