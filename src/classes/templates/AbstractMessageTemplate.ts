import { IMessageTemplate } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';

export abstract class AbstractMessageTemplate implements IMessageTemplate{
  public template_type: MESSAGE_TEMPLATE_TYPE;

  constructor(template_type: MESSAGE_TEMPLATE_TYPE) {
    this.template_type = template_type;
  }
}
