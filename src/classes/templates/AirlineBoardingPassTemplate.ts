import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineBoardingPassTemplate, IBoardingPass } from '../../interfaces';
import { AirlineBoardingPassTemplateBuilder } from '../../builders/templates/AirlineBoardingPassTemplateBuilder';

/**
 * Represents an Airline Boarding Pass Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass
 */
export class AirlineBoardingPassTemplate extends AbstractMessageTemplate implements IAirlineBoardingPassTemplate {
  public boarding_pass: IBoardingPass[];
  public intro_message: string;
  public locale: string;
  public theme_color?: string;

  constructor(builder: AirlineBoardingPassTemplateBuilder) {
    super(builder.getTemplateType());
    this.boarding_pass = builder.getBoardingPass();
    this.intro_message = builder.getIntroMessage();
    this.theme_color = builder.getThemeColor();
    this.locale = builder.getLocale();
  }
}
