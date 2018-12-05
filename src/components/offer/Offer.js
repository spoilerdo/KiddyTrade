/*import React, {Component} from 'react';
import { connect } from 'react-redux';
import {selectItem} from '../../actions/detail';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import './OfferStyle.css';
import skin from 'img/ak47.png';

class Offer extends Component {
    render() {
        return(
            <div 
                className="offer-container" 
                key={this.props.item.title}
                onClick={() => this.props.selectItem(this.props.item)}
            >
               <div className="skin-image-container">
                    <img src={skin} />
               </div>
               <div className="skin-title-container">
                    <h3>{this.props.item.title}</h3>
                    <p>prijs: $10,50</p>
                    <Link to={`/Detail/${this.props.item.id}`}>more info</Link>
               </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectItem: selectItem }, dispatch);
}

export default connect(mapDispatchToProps)(Offer);*/