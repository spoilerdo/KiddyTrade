import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../modules/auth';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import '../AccountStyle.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phonenr: '',
        };
    }

    handleChange = e => {
        console.log(this.state);
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.register).then(() => {
            this.props.history.push(this.props.location.state.pathname);
        })
        .catch(() => {
            return;
        })
    }

    render() {
        return(
            <div>
                <Header/>
                <div className="login-container">
                    <form className="form-signin">       
                        <h2 className="form-signin-heading">Register</h2>
                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handleChangeRegister} required="" />
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChangeRegister} required=""/>
                        <input type="text" className="form-control" name="email" placeholder="Email Address" onChange={this.handleChangeRegister} required="" />
                        <input type="text" className="form-control" name="phonenr" placeholder="Phone number" onChange={this.handleChangeRegister} />
                        <button className="btn btn-lg btn-block" type="submit">Register</button>   
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default connect(null, { register })(Register);