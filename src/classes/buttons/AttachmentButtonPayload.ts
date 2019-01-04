import { ATTACHMENT_TYPE } from '../../enums';
import { AttachmentPayload } from '../../client/Client';
import { AttachmentButtonBuilder } from '../../builders/buttons';

export class AttachmentButtonPayload implements AttachmentPayload{
  readonly type: ATTACHMENT_TYPE;
  readonly payload:any  = {
    template_type: 'button',
  };

  public constructor(builder: AttachmentButtonBuilder) {
    this.type = builder.getType();
    this.payload.buttons = builder.getButtons();
    this.payload.text = builder.getText();
  }

  get Type(): ATTACHMENT_TYPE {
    return this.type;
  }

  get Payload(): object {
    return this.payload;
  }
}
