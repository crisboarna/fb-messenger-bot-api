import { IButton } from '../../interfaces';
import { BUTTON_TYPE } from '../../enums';

export abstract class Button implements IButton{
  private _type: BUTTON_TYPE;

  public constructor(type: BUTTON_TYPE) {
    this._type = type;
  }

  get type(): BUTTON_TYPE {
    return this._type;
  }
}
