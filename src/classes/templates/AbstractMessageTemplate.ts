import { IMessageTemplate } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';

export abstract class AbstractMessageTemplate implements IMessageTemplate{
  readonly template_type: MESSAGE_TEMPLATE_TYPE;

  constructor(template_type: MESSAGE_TEMPLATE_TYPE) {
    this.template_type = template_type;
  }

  get Template_type(): MESSAGE_TEMPLATE_TYPE {
    return this.template_type;
  }
}
