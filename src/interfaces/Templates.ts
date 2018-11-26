import { IButton } from './Buttons';
import { AIRLINE_TRAVEL_CLASS, LIST_TOP_ELEMENT_STYLE, MEDIA_TYPE, MESSAGE_TEMPLATE_TYPE } from '../enums';

/**
 * Represents a Quick Reply. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/send-api/quick-replies
 */
export interface IMessageTemplate {
  template_type: MESSAGE_TEMPLATE_TYPE;
}

/**
 * Represents a IButton Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/button
 */
export interface IButtonTemplate extends IMessageTemplate {
  text?: string;
  buttons: IButton[];
  sharable?: boolean;
}

/**
 * Represents a Generic Template element. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/generic#elements
 */
export interface IGenericTemplateElement {
  title: string;
  subtitle?: string;
  image_url?: string;
  default_action?: {
    type: string
    url: string,
    messenger_extensions?: boolean,
    fallback_url?: string,
    webview_height_ratio?: string,
    webview_share_button?: string,
  };
  buttons: IButton[];
}

/**
 * Represents a Generic Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/generic
 */
export interface IGenericTemplate extends IMessageTemplate {
  image_aspect_ratio?: string;
  elements: IGenericTemplateElement[];
}

/**
 * Represents a List Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/list
 */
export interface IListTemplate extends IMessageTemplate {
  top_element_style?: LIST_TOP_ELEMENT_STYLE;
  buttons?: IButton[];
  elements: IGenericTemplateElement[];
  sharable?: boolean;
}

/**
 * Represents a Media Template element. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/media#elements
 */
export interface IMediaTemplateElement {
  media_type: MEDIA_TYPE;
  attachment_id?: string;
  url?: string;
  buttons: IButton[];
}

/**
 * Represents a Media Template. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/media
 */
export interface IMediaTemplate extends IMessageTemplate {
  elements: IMediaTemplateElement[];
  sharable?: boolean;
}

/**
 * Represents an Open Graph element. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph#elements
 */
export interface IOpenGraphElement {
  url: string;
  buttons: IButton[];
}

/**
 * Represents an Open Graph. Used to represent shape of Facebook API object. Type returned by builder and exposed to
 * users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/open-graph
 */
export interface IOpenGraphTemplate extends IMessageTemplate {
  elements: IOpenGraphElement[];
}

/**
 * Represents a Receipt Template address property. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt#address
 */
export interface IReceiptAddressProperty {
  street_1: string;
  street_2?: string;
  city: string;
  postal_code: string;
  state: string;
  country: string;
}

/**
 * Represents a Receipt Template summary property. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt#summary
 */
export interface IReceiptSummaryProperty {
  subtotal?: number;
  shipping_cost?: number;
  total_tax?: number;
  total_cost: number;
}

/**
 * Represents a Receipt Template adjustment property. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt#adjustments
 */
export interface IReceiptAdjustmentProperty {
  name: string;
  amount: number;
}

/**
 * Represents a Receipt Template element. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt#elements
 */
export interface IReceiptElements {
  title: string;
  subtitle?: string;
  quantity?: number;
  price: number;
  currency?: string;
  image_url?: string;
}

/**
 * Represents a Receipt Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 */
export interface IReceiptTemplate extends IMessageTemplate {
  sharable?: boolean;
  recipient_name: string;
  merchant_name?: string;
  order_number: string;
  currency: string;
  payment_method: string;
  timestamp?: string;
  adjustments?: IReceiptAdjustmentProperty;
  summary: IReceiptSummaryProperty;
  address?: IReceiptAddressProperty;
  elements?: IReceiptElements;
}

/**
 * Represents an Airline Boarding Pass Template auxiliary field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#auxiliary_field
 */
export interface IBoardingPassAuxiliaryField {
  label: string;
  value: string;
}

/**
 * Represents an Airline Boarding Pass Template secondary field. Used to represent shape of Facebook API object.
 * Type returned by builder and exposed to users to create own object of proper shape if desired taking into account
 * content restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#secondary_field
 */
export interface IBoardingPassSecondaryField {
  label: string;
  value: string;
}

/**
 * Represents an Airline * Template flight schedule. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#flight_schedule
 */
export interface IFlightInfoFlightSchedule {
  boarding_time?: string;
  departuire_time: string;
  arrival_time?: string;
}

/**
 * Represents an Airline * Template departure airport field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#departure_airport
 */
export interface IFlightInfoDepartureAirport {
  airport_code: string;
  city: string;
  terminal?: string;
  gate?: string;
}

/**
 * Represents an Airline * Template arrival airport field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#arrival_airport
 */
export interface IFlightInfoArrivalAirport {
  airport_code: string;
  city: string;
  terminal?: string;
  gate?: string;
}

/**
 * Represents an Airline * Template flight info field. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#flight_info
 */
export interface IBoardingPassFlightInfo {
  flight_number: string;
  departure_airport: IFlightInfoDepartureAirport;
  arrival_airport: IFlightInfoArrivalAirport;
  flight_schedule: IFlightInfoFlightSchedule;
}

/**
 * Represents a n Airline Boarding Pass Template boarding pass element. Used to represent shape of Facebook API object.
 * Type returned by builder and exposed to users to create own object of proper shape if desired taking into account
 * content restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass#boarding_pass
 */
export interface IBoardingPass {
  passenger_name: string;
  pnr_number: string;
  travel_class?: string;
  seat?: string;
  auxiliary_fields?: IBoardingPassAuxiliaryField;
  secondary_fields?: IBoardingPassSecondaryField;
  logo_image_url: string;
  header_image_url?: string;
  header_text_field?: string;
  qr_code?: string;
  barcode_image_url?: string;
  above_bar_code_image_url: string;
  flight_info: IBoardingPassFlightInfo;
}

/**
 * Represents an Airline Boarding Pass Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the
 * object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-boarding-pass
 */
export interface IAirlineBoardingPassTemplate extends IMessageTemplate {
  intro_message: string;
  locale: string;
  theme_color?: string;
  boarding_pass: IBoardingPass[];
}

/**
 * Represents an Airline CheckIn Template. Used to represent shape of Facebook API object. Type returned by builder and
 * exposed to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-checkin
 */
export interface IAirlineCheckInTemplate extends IMessageTemplate {
  intro_message: string;
  locale: string;
  pnr_number?: string;
  checkin_url: string;
  flight_info: IBoardingPassFlightInfo[];
}

/**
 * Represents an Airline Itinerary Template passenger info field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary#passenger_info
 */
export interface IAirlineItineraryPassengerInfo {
  passenger_id: string;
  ticket_number?: string;
  name: string;
}

/**
 * Represents an Airline Itinerary Template flight info field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary#flight_info
 */
export interface IAirlineItineraryFlightInfo {
  connection_id: string;
  segment_id: string;
  flight_number: string;
  aircraft_type?: string;
  departure_airport: IFlightInfoDepartureAirport;
  arrival_airport: IFlightInfoArrivalAirport;
  flight_schedule: IFlightInfoFlightSchedule;
  travel_class: AIRLINE_TRAVEL_CLASS;
}

/**
 * Represents an Airline Itinerary Template product info field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary#product_info
 */
export interface IAirlinePassengerProductInfo {
  title: string;
  value: string;
}

/**
 * Represents an Airline Itinerary Template passenger segment field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary#passenger_segment_info
 */
export interface IAirlineItineraryPassengerSegment {
  segment_id: string;
  passenger_id: string;
  seat: string;
  seat_type: string;
  product_info?: IAirlinePassengerProductInfo[];
}

/**
 * Represents an Airline Itinerary Template price info field. Used to represent shape of Facebook API object. Type
 * returned by builder and exposed to users to create own object of proper shape if desired taking into account content
 * restrictions for the object.
 *
 * Check link for content restrictions:
 * https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary#price_info
 */
export interface IAirlineItineraryPriceInfo {
  title: string;
  amount: number;
  currency?: string;
}

/**
 * Represents an Airline Itinerary Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the
 * object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary
 */
export interface IAirlineItineraryTemplate extends IMessageTemplate {
  intro_message: string;
  locale: string;
  theme_color?: string;
  pnr_number: string;
  passenger_info: IAirlineItineraryPassengerInfo[];
  flight_info: IAirlineItineraryFlightInfo[];
  passenger_segment_info: IAirlineItineraryPassengerSegment[];
  price_info?: IAirlineItineraryPriceInfo[];
  base_price?: number;
  tax?: number;
  total_price: number;
  currency: string;
}

/**
 * Represents an Airline Flight Update Template. Used to represent shape of Facebook API object. Type returned by
 * builder and exposed to users to create own object of proper shape if desired taking into account content restrictions
 * for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-flight-update
 */
export interface IAirlineFlightUpdateTemplate extends IMessageTemplate {
  intro_message: string;
  theme_color?: string;
  update_type: string;
  locale: string;
  pnr_number?: string;
  update_flight_info: IBoardingPassFlightInfo;
}
