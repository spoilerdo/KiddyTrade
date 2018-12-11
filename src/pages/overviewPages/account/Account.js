import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getOffersFromAccount } from '../../../modules/offer';
import { unregister } from '../../../modules/auth';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import OfferList from 'components/offer/OfferList';
import NotificationList from 'components/notification/NotificationList';

import '../OverviewStyle.css';
import './AccountStyle.css';

class Account extends Component {
    componentDidMount(){
        this.props.getOffersFromAccount(this.props.user.userId);
    }

    handleSubmit = e => {
        e.preventDefault();
        const p = this.props;
        p.unregister(p.user.userId).then(() => {
            p.history.push("/");
        })
        .catch(() => {
            return;
        })
    };

    render() {
        const { ownedOffers, offers, user } = this.props;

        if(Object.keys(offers).length === 0 && Object.keys(ownedOffers).length === 0){
            return <h2>No item selected</h2>;
        }
        return(
            <div>
                <Header/>
                <div className="row detail-container">
                <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Account information:</h2>
                           <div className="information">
                                <p>INFOMATION ABOUT THE USER LOL</p>
                                <p>{user.user}</p>
                                <button className="btn btn-lg" onSubmit={this.handleSubmit}>Delete account</button>
                           </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Notifications:</h2>
                            <div className="information notification-container">
                                <NotificationList/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid inventory">
                        <h2>Inventory:</h2>
                        <div className="offers-container">
                            <OfferList offers={ownedOffers}/>
                        </div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    return { 
        ownedOffers: state.offersItems.ownedOffers,
        offers: state.offersItems.offers,
        user: state.auth,
    };
}

export default connect(
    mapStateToProps,
    { getOffersFromAccount, unregister }
)(Account);