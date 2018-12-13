import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import { getOffer } from '../../../modules/offer';

import '../OverviewStyle.css';
import skin from 'img/ak47.png';

class Detail extends Component {
    componentDidMount(){
        this.props.getOffer(this.props.match.params.ID);
    }

    render() {
        const { offers, items, user } = this.props;

        if(Object.keys(offers).length === 0 && Object.keys(items).length === 0){
            return <h2>No item selected</h2>;
        }

        const offer = offers[this.props.match.params.ID];
        const item = items[offer.itemId];

        if(typeof item === "undefined"){
            return <h2>No item selected</h2>;
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
                                <p>{offer.offerName}</p>
                                <br/><br/>
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                                <p>condition: {item.condition}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Price details:</h2>
                            <div className="information">
                                <p>price: ${offer.price}</p>
                                <p>{offer.sold ? 'sold' : 'not sold yet'}</p>
                            </div>
                            {offer.senderId !== user.userId &&
                                <div className="sell-container">
                                    <Link to={`/buy/${offer.offerId}`} className="btn btn-lg">Buy this skin</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
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
    };
};

export default connect(
    mapStateToProps,
    { getOffer }
)(Detail);