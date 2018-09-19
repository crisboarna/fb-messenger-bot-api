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
  readonly boarding_pass: IBoardingPass[];
  readonly intro_message: string;
  readonly locale: string;
  readonly theme_color?: string;

  constructor(builder: AirlineBoardingPassTemplateBuilder) {
    super(builder.getTemplateType());
    this.boarding_pass = builder.getBoardingPass();
    this.intro_message = builder.getIntroMessage();
    this.theme_color = builder.getThemeColor();
    this.locale = builder.getLocale();
  }

  get Boarding_pass(): IBoardingPass[] {
    return this.boarding_pass;
  }

  get Intro_message(): string {
    return this.intro_message;
  }

  get Locale(): string {
    return this.locale;
  }

  get Theme_color(): string|undefined {
    return this.theme_color;
  }
}
