import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../../modules/auth';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import '../AccountStyle.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state).then(() => {
            this.props.location.search = "";
            if(this.props.location.pathname == "/login"){
                this.props.history.push("/");
            }else{
                this.props.history.push(this.props.location.pathname);
            }
        })
        .catch(() => {
            return;
        })
    };
    //TODO voeg link naar register pagina toe
    render() {
        return(
            <div>
                <Header/>
                <div className="login-container">
                    <div className="login">
                        <form onSubmit={this.handleSubmit} className="form-signin">       
                            <h2 className="form-signin-heading">Please login</h2>
                            <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChange} required=""/>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} required=""/>
                            <button className="btn btn-lg btn-block" type="submit">Login</button>   
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(null, { login })(Login);