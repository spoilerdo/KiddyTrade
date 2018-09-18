import React, {Component} from 'react';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import './LoginStyle.css';

class Login extends Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="wrapper">
                    <form className="form-signin">       
                    <h2 className="form-signin-heading">Please login</h2>
                    <input type="text" className="form-control" name="username" placeholder="Email Address" required="" autofocus="" />
                    <input type="password" className="form-control" name="password" placeholder="Password" required=""/>
                    <button className="btn btn-lg btn-block" type="submit">Login</button>   
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Login;