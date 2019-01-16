import React from 'react';

import skin from 'img/ak47.png';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import './ListItemStyle.css';

const OfferListItem = ({offer}) => {
    
    const handleClick = () => {
        window.location.href = `/detail/${offer.offerId}`;
    }

    return (
        <Grid key={offer.offerId} item xs className="root">
            <Card className="card">
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        alt="skin"
                        image={skin}
                        title="AK-47"
                    />
                    <CardContent className={`content-${offer.quality}`}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {offer.offerName} - ${offer.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default OfferListItem;