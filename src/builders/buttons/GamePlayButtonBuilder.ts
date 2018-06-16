import { IGamePlayButton } from '../../interfaces';
import { GamePlayButton } from '../../classes/buttons';
import { BUTTON_TYPE } from '../../enums';

/**
 * Represents a GamePlay Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/game-play
 */
export class GamePlayButtonBuilder {
  private _type = BUTTON_TYPE.GAME_PLAY;
  private _game_metadata: { player_id?: string; context_id?: string };
  private _payload: string;
  private _title: string;

  public constructor() {}

  public getType(): BUTTON_TYPE {
    return this._type;
  }

  public getGameMetadata(): { player_id?: string; context_id?: string } {
    return this._game_metadata;
  }

  public setGameMetadata(value: { player_id?: string; context_id?: string }) {
    this._game_metadata = value;
    return this;
  }

  public getPayload(): string {
    return this._payload;
  }

  public setPayload(value: string) {
    this._payload = value;
    return this;
  }

  public getTitle(): string {
    return this._title;
  }

  public setTitle(value: string) {
    this._title = value;
    return this;
  }

  public build(): IGamePlayButton {
    return new GamePlayButton(this);
  }
}
