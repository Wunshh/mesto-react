import headerLogo from "../images/header__logo.svg";

function Нeader() {
    return(
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Место" />
        </header>
    );
}

export default Нeader;