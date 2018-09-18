import React, {Component} from 'react';
import './FooterStyle.css';
import Logo from 'img/LogoDesign_01.png';

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-9">
                            <img src={Logo} className="logo"/>
                            <p>&copy; 2018 - Kiddy-Enterprise</p>
                        </div>
                        <div className="col-sm-3">
                            <h4>Information:</h4>
                            <p>Email: Kiddy-Enterprise@gmail.com</p>
                            <p>Phone number: 06 000 000 00</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;