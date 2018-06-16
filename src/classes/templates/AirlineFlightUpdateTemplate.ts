import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineFlightUpdateTemplate, IBoardingPassFlightInfo } from '../../interfaces';
import { AirlineFlightUpdateTemplateBuilder } from '../../builders/templates/AirlineFlightUpdateTemplateBuilder';

/**
 * Represents an Airline Flight Update Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-flight-update
 */
export class AirlineFlightUpdateTemplate extends AbstractMessageTemplate implements IAirlineFlightUpdateTemplate {
  public intro_message: string;
  public locale: string;
  public pnr_number?: string;
  public theme_color?: string;
  public update_flight_info: IBoardingPassFlightInfo;
  public update_type: string;

  constructor(builder: AirlineFlightUpdateTemplateBuilder) {
    super(builder.getTemplateType());
    this.intro_message = builder.getIntroMessage();
    this.locale = builder.getLocale();
    this.pnr_number = builder.getPnrNumber();
    this.theme_color = builder.getThemeColor();
    this.update_flight_info = builder.getUpdateFlightInfo();
    this.update_type = builder.getUpdateType();
  }
}
