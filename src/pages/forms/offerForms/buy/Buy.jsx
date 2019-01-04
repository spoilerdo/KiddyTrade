import React, { Component } from 'react';
import { connect } from 'react-redux';

import { buyOffer } from '../../../../modules/account';

import '../../FormStyle.css';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Buy extends Component {
    constructor(props){
        super(props);
        this.state = {
            bankNumber: '',
            open: false,
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        var quotation = {
            bankNumber: this.state.bankNumber,
            offer: this.props.offer,
        }
        this.props.buyOffer(quotation).then(() => {
            this.handleClose();
        })
        .catch(() => {
            return;
        })
    };

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
                <Paper className="modal"> 
                <form onSubmit={this.handleSubmit}>
                    <Typography variant="h4" id="modal-title">
                        Fill in your bank data:
                    </Typography>
                    <TextField
                        label="Bank Number"
                        name="bankNumber"
                        required
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>
                        Buy
                    </Button>
                </form>
                </Paper>
            </Modal>
        );
    }
}

export default connect(
    null,
    { buyOffer },
    null,
    { withRef: true }
)(Buy);