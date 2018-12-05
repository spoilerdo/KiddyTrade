import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import './OfferStyle.css';
import skin from 'img/ak47.png';

class OfferList extends Component {
    renderList() {
        const {offers} = this.props;

        console.log(offers);

        if(Object.keys(offers).length === 0){
            return <h2>No item found</h2>;
        }

        return _.map(offers, offer => {
            return (
                <div 
                    key={offer.offerId}
                    className="offer-container"
                >
                    <div className="skin-image-container">
                        <img src={skin} />
                    </div>
                    <Link to={`/detail/${offer.offerId}`}>
                        <div className="skin-title-container">
                            <h3>{offer.offerName}</h3>
                            <p>BUY IT FOR: ${offer.price}</p>
                        </div>
                    </Link>
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

export default connect(
    null,
)(OfferList);