import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import { getOffer } from '../../../modules/offer';
import Buy from '../../forms/offerForms/buy/Buy';

import skin from 'img/ak47.png';
import styles from '../OverviewStyle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Detail extends Component {
    componentDidMount(){
        this.props.getOffer(this.props.match.params.ID);
    }

    handleClick = () => {
        this.buyReference.wrappedInstance.handleOpen();
    }

    render() {
        const { offers, items, user, classes } = this.props;

        if(Object.keys(offers).length === 0 && Object.keys(items).length === 0){
            return <h2>No item selected</h2>;
        }

        const offer = offers[this.props.match.params.ID];
        const item = items[offer.itemId];

        if(typeof item === "undefined"){
            return <h2>No item selected</h2>;
        }

        console.log(user);
        
        return(
            <div>
                <Header/>
                    <Grid container>
                        <Grid item xs={12} sm={6} className={classes.gridSpacing}>
                            <Card className={classes.skinCard}>
                                <CardMedia
                                    component="img"
                                    alt="skin"
                                    image={skin}
                                    title="skin"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.gridSpacing}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="display2">
                                    Pice details:
                                </Typography>
                                <Typography variant="body1">
                                    Price: ${offer.price}
                                </Typography>
                                <Typography variant="body1">
                                    {offer.sold ? 'sold': 'not sold yet'}
                                </Typography>
                                {offer.senderId !== user.userId && offer.sold === false && user.isAuthenticated &&
                                    <Button variant="contained" color="secondary" onClick={this.handleClick}>
                                        Buy this skin
                                    </Button>
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.gridSpacing}>
                            <Paper className={classes.paper}>
                                <Typography component="h2" variant="display2">
                                    Skin Information:
                                </Typography>
                                <Typography component="h2" variant="headline">
                                    {item.name}
                                </Typography>
                                <Typography variant="body1">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2">
                                    condition: {item.condition} 
                                </Typography>
                                <Typography variant="body2">
                                    quality: {item.quality}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                    </Grid>
                    <Buy ref={instance => this.buyReference = instance} offer={offer}/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        offers: state.offers.offers,
        items: state.offers.items,
        user: state.auth,
        classes: PropTypes.object.isRequired,
    };
};

export default connect(
    mapStateToProps,
    { getOffer }
)(withStyles(styles)(Detail));