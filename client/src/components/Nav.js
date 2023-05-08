import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";
import { Link, useNavigate } from 'react-router-dom'

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  let navigate = useNavigate()
  return (
    <nav>
        <Link to={"/"}>
        <div className="logo-container">
        <img
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>
        </Link>

      
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Login
        </button>
      )}

          {
            authToken && (<button
              className="nav-button"
              onClick={()=>navigate("/dashboard")}
              //disabled={showModal}
            >
              Dashboard
            </button>)
          }

    </nav>
  );
};
export default Nav;
