import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../../../modules/auth';

import Register from '../register/Register';

import '../../FormStyle.css';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            open: false,
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        var account = {
            username: this.state.username,
            password: this.state.password,
        }
        this.props.login(account).then(() => {
            this.handleClose();
        })
        .catch(() => {
            return;
        })
    };

    handleRegister = () => {
        this.handleClose();
        this.registerReference.wrappedInstance.handleOpen();
    }

    handleOpen = () => {
        this.setState({ open:true });
    };

    handleClose = () => {
        this.setState({ open:false });
    };

    render() {
        return(
            <div>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                className="modal-container"
                >
                    <Paper className="modal"> 
                    <form onSubmit={this.handleSubmit}>
                        <Typography variant="h4" id="modal-title">
                            Login:
                        </Typography>
                        <TextField
                            label="Username"
                            name="username"
                            required
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            required
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            type="password"
                        />
                        <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>
                            Login
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleRegister}>
                            Register
                        </Button>
                    </form>
                    </Paper>
                </Modal>
                <Register ref={instance => this.registerReference = instance}/>
            </div>
        );
    }
}

export default connect(
    null, 
    { login },
    null,
    { withRef: true }
)(Login);