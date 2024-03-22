import { PlaceType } from '../../types';

type HostProps = {
  currentOffer: PlaceType;
}

export default function Host({ currentOffer }: HostProps) {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
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
