import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './ListStyle.css';
import skin from 'img/ak47.png';

class ItemList extends Component {
    renderList() {
        const { ownedOffers, ownedItems } = this.props;

        if(Object.keys(ownedOffers).length === 0 && Object.keys(ownedItems).length === 0){
            return <h2>No item selected</h2>;
        }

        return _.map(ownedItems, item => {
            //check if there is a offer already created from this item
            //get amound of items it has of ID -> URL
            const items = _.filter(ownedItems, i => i.itemID == item.itemID);

            //get amound of offers it has with a itemID -> URL
            const offers = _.filter(ownedOffers, offer => offer.itemId == item.itemID);

            return (
                <div 
                    key={item.itemID}
                    className="list-container"
                >
                    <div className="skin-image-container">
                        <img src={skin} />
                    </div>
                    {items.length === offers.length ?
                        <div className="skin-title-container">
                            <Link to={`/detail/${offers[0].offerId}`}>
                            <h3>{item.name}</h3>
                            </Link>
                            <p>Condition: {item.condition}</p>
                            <p>Value: ${item.price}</p>
                        </div>
                        :
                        <Link to={`/sell/${item.itemID}`}>
                            <div className="skin-title-container">
                                <h3>{item.name}</h3>
                                <p>Condition: {item.condition}</p>
                                <p>Value: ${item.price}</p>
                            </div>
                        </Link>
                    }
                </div>
            );
        });
    }

    render(){
        return (
            <div className="offers-container">
               {this.renderList()} 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ownedOffers: state.inventory.ownedOffers,
        ownedItems: state.inventory.ownedItems,
    };
}

export default connect(
    mapStateToProps,
)(ItemList);