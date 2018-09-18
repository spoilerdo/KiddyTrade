import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import '../OverviewStyle.css';
import skin from 'img/ak47.png';

class Detail extends Component {
    render() {
        if(!this.props.item){
            //TODO: maybe return to the previous page??
            return <div>No item selected</div>;
        }
        
        return(
            <div>
                <Header/>
                <div className="row detail-container">
                    <div className="col-sm-6 item-detail-container">
                        <img src={skin} />
                        <div className="item-information-container">
                            <h2>Skin information:</h2>
                            <div className="information">
                                <p>{this.props.item.title}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Price details:</h2>
                            <div className="information">
                                <p>lowest price: $35,-</p>
                                <p>highest price: $135,-</p>
                            </div>
                            <div className="sell-container">
                                <button className="btn btn-lg" type="submit">Sell this skin</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        item: state.activeItem
    };
}

export default connect(mapStateToProps)(Detail);