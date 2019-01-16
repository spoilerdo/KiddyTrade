import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../../modules/auth';

import '../../FormStyle.css';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phonenr: '',
            open: false,
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        var account = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phonenr: this.state.phonenr,
        }
        this.props.register(account).then(() => {
            this.handleClose();
        })
        .catch(() => {
            return;
        })
    }

    handleOpen = () => {
        this.setState({ open:true });
    };

    handleClose = () => {
        this.setState({ open:false });
    };

    render() {
        return(
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className="modal-container"
            >
                <Paper className="modal h-55"> 
                <form onSubmit={this.handleSubmit}>
                    <Typography variant="h4" id="modal-title">
                        Register:
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
                    <TextField
                        label="Email Address"
                        name="email"
                        required
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        label="Phone number"
                        name="phonenr"
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>
                        Register
                    </Button>
                </form>
                </Paper>
            </Modal>
        );
    }
}

export default connect(
    null, 
    { register },
    null,
    { withRef: true }
)(Register);