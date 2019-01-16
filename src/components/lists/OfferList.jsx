import React from 'react';
import _ from 'lodash';

import OfferListItem from './ListItems/OfferListItem';

import './ListStyle.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const OfferList = ({ offers, listTitle }) => {
    if(Object.keys(offers).length === 0){
        return <h2>No offers found</h2>;
    }

    const grids = [];

    for(var i=Number(Object.keys(offers)[0]); i<=Object.keys(offers)[Object.keys(offers).length - 1]; i+=3){
        grids.push(
        <Grid container>
            <OfferListItem offer={offers[i]}/>
            {typeof offers[i+1] !== 'undefined' && <OfferListItem offer={offers[i+1]}/>}
            {typeof offers[i+2] !== 'undefined' && <OfferListItem offer={offers[i+2]}/>}
        </Grid>
        )
    }

    return (
        <div>
            <Typography component="h2" variant="display2" className="listHeader">
                {listTitle}
             </Typography>
            { grids }
        </div>
    );
}

export default OfferList;