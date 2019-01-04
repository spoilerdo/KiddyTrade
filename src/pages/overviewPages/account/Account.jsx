import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOffersFromAccount, getItemsFromAccount } from '../../../modules/inventory';
import { unregister } from '../../../modules/auth';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import OfferList from 'components/lists/OfferList';
import ItemList from 'components/lists/ItemList';
import NotificationList from 'components/notification/NotificationList';

import '../OverviewStyle.css';
import './AccountStyle.css';
import styles from '../OverviewStyle';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Account extends Component {
    componentDidMount(){
        this.props.getOffersFromAccount(this.props.user.userId);
        this.props.getItemsFromAccount(this.props.user.userId);
    }

    handleSubmit = e => {
        e.preventDefault();
        const p = this.props;
        p.unregister(p.user.userId).then(() => {
            p.history.push("/");
        })
        .catch(() => {
            return;
        })
    };

    render() {
        const { ownedOffers, user, classes, ownedItems } = this.props;

        return(
            <div>
                <Header/>
                    <Grid container>
                        <Grid item xs={12} sm={6} className={classes.gridSpacing}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="display2">
                                    Account Information:
                                </Typography>
                                <Typography variant="body1">
                                    {user.user}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                    Delete account
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.gridSpacing}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="display2">
                                    Notifications:
                                </Typography>
                                <NotificationList/>
                            </Paper>
                        </Grid>
                    </Grid>
                    {Object.keys(ownedItems).length != 0 &&
                        <ItemList/>
                    }
                    {Object.keys(ownedOffers).length != 0 &&
                        <OfferList offers={ownedOffers} listTitle={"Owned Offers:"}/>
                    }
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        ownedOffers: state.inventory.ownedOffers,
        user: state.auth,
        ownedItems: state.inventory.ownedItems,
    };
}

export default connect(
    mapStateToProps,
    { getOffersFromAccount, unregister, getItemsFromAccount }
)(withStyles(styles)(Account));