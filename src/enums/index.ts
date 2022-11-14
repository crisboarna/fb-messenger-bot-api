export enum QUICK_REPLY_TYPE {
    TEXT = 'text',
    LOCATION = 'location',
    USER_PHONE_NUMBER = 'user_phone_number',
    USER_EMAIL = 'user_email',
}

export enum LIST_TOP_ELEMENT_STYLE {
    LARGE = 'large',
    COMPACT = 'compact',
}

export enum BUTTON_PAYMENT_TYPE {
    FIXED_AMOUNT,
    FLEXIBLE_AMOUNT,
}

export enum ATTACHMENT_TYPE {
    IMAGE = 'image',
    AUDIO = 'audio',
    VIDEO = 'video',
    FILE = 'file',
    TEMPLATE = 'template',
    FALLBACK = 'fallback',
}
export enum MESSAGE_TEMPLATE_TYPE {
    BUTTON = 'button',
    LIST = 'list',
    GENERIC = 'generic',
    MEDIA = 'media',
    OPEN_GRAPH = 'open_graph',
    RECEIPT = 'receipt',
    AIRLINE_BOARDING_PASS = 'airline_boardingpass',
    AIRLINE_CHECKIN = 'airline_checkin',
    AIRLINE_ITINERARY = 'airline_itinerary',
    AIRLINE_UPDATE = 'airline_update',
    NOTIFICATION_MESSAGES = 'notification_messages',
}

export enum BUTTON_TYPE {
    BUY = 'payment',
    CALL = 'phone_number',
    GAME_PLAY = 'game_play',
    LOG_IN = 'account_link',
    LOG_OUT = 'account_unlink',
    POSTBACK = 'postback',
    SHARE = 'element_share',
    URL = 'web_url',
}

export enum MEDIA_TYPE {
    IMAGE = 'image',
    VIDEO = 'video',
}

export enum AIRLINE_TRAVEL_CLASS {
    ECONOMY = 'economy',
    BUSINESS = 'business',
    FIRST_CLASS = 'first_class',
}

export enum REFERER_SOURCE {
    MESSENGER_CODE = 'MESSENGER_CODE',
    DISCOVER_TAB = 'DISCOVER_TAB',
    ADS = 'ADS',
    SHORTLINK = 'SHORTLINK',
    CUSTOMER_CHAT_PLUGIN = 'CUSTOMER_CHAT_PLUGIN',
}

export enum NOTIFICATION_MESSAGES_FREQUENCY {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

export enum NOTIFICATION_MESSAGES_CTA_TEXT {
    GET = 'GET',
    SIGN_UP = 'SIGN_UP',
    ALLOW = 'ALLOW',
    OPT_IN = 'OPT_IN',
    FREQUENCY = 'FREQUENCY ',
}

export enum NOTIFICATION_MESSAGES_REOPTIN {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
}

export enum IMAGE_ASPECT_RATIO {
    HORIZONTAL = 'HORIZONTAL',
    SQUARE = 'SQUARE',
}
