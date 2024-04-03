import { PlaceType } from '../../types/types';

type HostProps = {
  currentOffer: PlaceType;
}

export default function Host({ currentOffer }: HostProps) {
  const DEFAULT_AVATAR_URL = 'img/host-default-avatar.png';

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <img
          className="offer__avatar user__avatar"
          src={currentOffer.host.avatarUrl || DEFAULT_AVATAR_URL}
          width="74"
          height="74"
          alt={currentOffer.host.avatarUrl ? 'Host avatar' : 'Default avatar'}
        />
        <span className="offer__user-name">
          {currentOffer.host.name}
        </span>
        <span className="offer__user-status">
          {currentOffer.host.isPro ? 'Pro' : 'Regular'}
        </span>
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {currentOffer.description}
        </p>
      </div>
    </div>
  );
}
