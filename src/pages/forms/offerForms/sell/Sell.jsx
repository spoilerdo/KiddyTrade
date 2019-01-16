import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createOffer } from '../../../../modules/inventory';

import '../../FormStyle.css';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Sell extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemId: '',
            senderId: '',
            senderBankNumber: '',
            price: '',
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

        this.props.createOffer(this.state).then(() => {
            this.handleClose();
        })
        .catch(() => {
            return;
        })
    };

    handleOpen = (senderId, item) => {
        this.setState({ 
            senderId: senderId,
            itemId: item.itemID,
            open:true,
        });
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
                        Fill in the offer details:
                    </Typography>
                    <TextField
                        label="Skin price"
                        name="price"
                        required
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        label="Bank Number"
                        name="senderBankNumber"
                        required
                        fullWidth
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>
                        Sell
                    </Button>
                </form>
                </Paper>
            </Modal>
        );
    }
}

export default connect(
    null,
    { createOffer },
    null,
    { withRef: true }
)(Sell);