import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectItem} from '../../actions/detail';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import './OfferStyle.css';
import skin from 'img/ak47.png';

class ItemList extends Component {
    renderList() {
        return this.props.items.map(item => {
            return (
                <div 
                    key={item.title}
                    onClick={() => this.props.selectItem(item)}
                    className="offer-container"
                >
                    <div className="skin-image-container">
                        <img src={skin} />
                    </div>
                    <div className="skin-title-container">
                        <h3>{item.title}</h3>
                        <p>prijs: $10,50</p>
                        <Link to={`/Detail/${item.id}`}>more info</Link>
                    </div>
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

function mapStateToProps(state) {
    return {
        items: state.items
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectItem: selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);