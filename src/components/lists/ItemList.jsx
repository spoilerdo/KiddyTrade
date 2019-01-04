import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ItemListItem from './ListItems/ItemListItem';
import Sell from '../../pages/forms/offerForms/sell/Sell';

import './ListStyle.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ItemList extends Component {

    handleSellOpen = (item) => {
        if(typeof this.sellReference !== 'undefined'){
            this.sellReference.wrappedInstance.handleOpen(this.props.user.userId, item);
        }
    };

    render(){
        const { offers, items } = this.props;

        if(Object.keys(offers).length === 0 && Object.keys(items).length === 0){
            return <h2>No item selected</h2>;
        }
    
        const grids = [];
    
        for(var i=Number(Object.keys(items)[0]); i<=Object.keys(items)[Object.keys(items).length - 1]; i+=3){
            grids.push(
            <Grid container>
                <ItemListItem item={items[i]} items={items} offers={offers} onClick={this.handleSellOpen}/>
                {typeof items[i+1] !== 'undefined' && <ItemListItem item={items[i+1]} items={items} offers={offers} onClick={this.handleSellOpen}/>}
                {typeof items[i+2] !== 'undefined' && <ItemListItem item={items[i+2]} items={items} offers={offers} onClick={this.handleSellOpen}/>}
            </Grid>
            )
        }
    
        return (
            <div>
                <Typography component="h2" variant="display2" className="listHeader">
                    Inventory:
                </Typography>
                { grids }
                <Sell ref={instance => this.sellReference = instance}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        offers: state.inventory.ownedOffers,
        user: state.auth,
        items: state.inventory.ownedItems,
    };
}

export default connect(
    mapStateToProps
)(ItemList);