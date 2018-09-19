import { IMessageTemplate } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';

export abstract class AbstractMessageTemplate implements IMessageTemplate{
  private _template_type: MESSAGE_TEMPLATE_TYPE;

  constructor(template_type: MESSAGE_TEMPLATE_TYPE) {
    this._template_type = template_type;
  }

  get template_type(): MESSAGE_TEMPLATE_TYPE {
    return this._template_type;
  }
}
