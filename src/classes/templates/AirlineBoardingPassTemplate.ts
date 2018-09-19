import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineBoardingPassTemplate, IBoardingPass } from '../../interfaces';
import { AirlineBoardingPassTemplateBuilder } from '../../builders/templates';

/**
 * Represents an Airline Boarding Pass Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass
 */
export class AirlineBoardingPassTemplate extends AbstractMessageTemplate implements IAirlineBoardingPassTemplate {
  private _boarding_pass: IBoardingPass[];
  private _intro_message: string;
  private _locale: string;
  private _theme_color?: string;

  constructor(builder: AirlineBoardingPassTemplateBuilder) {
    super(builder.getTemplateType());
    this._boarding_pass = builder.getBoardingPass();
    this._intro_message = builder.getIntroMessage();
    this._theme_color = builder.getThemeColor();
    this._locale = builder.getLocale();
  }

  get boarding_pass(): IBoardingPass[] {
    return this._boarding_pass;
  }

  get intro_message(): string {
    return this._intro_message;
  }

  get locale(): string {
    return this._locale;
  }

  get theme_color(): string|undefined {
    return this._theme_color;
  }
}
