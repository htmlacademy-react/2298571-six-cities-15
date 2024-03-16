import HeaderLogo from './header-logo';
import Auth from './auth';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          <Auth />
        </div>
      </div>
    </header>
  );
}
