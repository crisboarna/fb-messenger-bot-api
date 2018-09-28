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
  readonly intro_message: string;
  readonly locale: string;
  readonly pnr_number?: string;
  readonly theme_color?: string;
  readonly update_flight_info: IBoardingPassFlightInfo;
  readonly update_type: string;

  constructor(builder: AirlineFlightUpdateTemplateBuilder) {
    super(builder.getTemplateType());
    this.intro_message = builder.getIntroMessage();
    this.locale = builder.getLocale();
    this.pnr_number = builder.getPnrNumber();
    this.theme_color = builder.getThemeColor();
    this.update_flight_info = builder.getUpdateFlightInfo();
    this.update_type = builder.getUpdateType();
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

  get Theme_color(): string|undefined {
    return this.theme_color;
  }

  get Update_flight_info(): IBoardingPassFlightInfo {
    return this.update_flight_info;
  }

  get Update_type(): string {
    return this.update_type;
  }
}
