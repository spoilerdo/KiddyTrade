import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './HeaderStyle.css';
import Logo from 'img/LogoDesign_01.png';

import { logout } from '../../modules/auth';

class Header extends Component {

  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
      console.log(this.props);
      return (
      <nav className="navbar navbar-expand-lg dark-nav">
          <a className="navbar-brand" href="#"><img src={Logo} className='logo'/></a>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={'/'}>Kiddy-Trades <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                {this.props.user.isAuthenticated ? 
                  <a onClick={this.handleLogout} className="nav-link hvr-underline-from-center">Logout</a>
                  :
                  <Link to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                  }} className="nav-link hvr-underline-from-center">Login</Link>
                }
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          </div>
      </nav>
      );
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default withRouter(connect(mapStateToProps, { logout })(Header));