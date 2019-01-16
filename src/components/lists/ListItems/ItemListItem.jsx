import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import skin from 'img/ak47.png';

import styles from './ListItemStyle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import './ListItemStyle.css';

class ItemListItem extends Component {
    handleClick = (itemLength, offerLength, offer) => {
        if(itemLength === offerLength){
            window.location.href = `/detail/${offer.offerId}`
        }else{
            console.log("sell it");
            if(typeof this.props.onClick === 'function') {
                this.props.onClick(this.props.item);
            }
        }
    }
    render(){
        const { item, items, offers, classes } = this.props;

        //check if there is a offer already created from this item
        //get amound of items it has of ID -> URL
        const FilteredItems = _.filter(items, i => i.itemID == item.itemID);

        //get amound of offers it has with a itemID -> URL
        const FilteredOffers = _.filter(offers, offer => offer.itemId == item.itemID);

        return (
            <Grid key={item.itemID} item xs className={classes.root}>
                <Card>
                    {FilteredItems.length !== FilteredOffers.length ?
                    <CardHeader
                        className={classes.cardHeader}
                        color="primary"
                        title="SET FOR SALE"
                    />
                    :
                    <CardHeader
                        className={classes.cardHeader}
                        color="primary"
                        title="SEE OFFER"
                    />
                    }
                    <CardActionArea onClick={() => this.handleClick(FilteredItems.length, FilteredOffers.length, FilteredOffers[0])}>
                        <CardMedia
                            component="img"
                            alt="skin"
                            image={skin}
                            title="AK-47"
                        />
                        <CardContent className={`content-${item.quality}`}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name} - ${item.price}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                Condition: {item.condition}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(ItemListItem);