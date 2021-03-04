import { Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

function Header(props) {
  return (
    <header>
        <Navbar expand="lg" className="bg-custom">
            {props.showBackBtn &&
            <NavLink to="/" className="page-header__back-btn">
                <i className="fa fa-angle-left"></i>
            </NavLink>
            }
            <Container>
            <div className="page-header">
                <h2 className="page-header__title">{props.title}</h2>
            </div>
            </Container>
        </Navbar>
    </header>
  );
}

export default Header;
