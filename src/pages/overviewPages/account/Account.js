import React, {Component} from 'react';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Offer from 'components/offer/Offer';
import '../OverviewStyle.css';
import './AccountStyle.css';
import skin from 'img/ak47.png';

class Account extends Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="row detail-container">
                <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Account information:</h2>
                           <div className="information">
                                <p>INFOMATION ABOUT THE USER LOL</p>
                           </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Notifications:</h2>
                            <div className="information notification-container">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start notification">
                                        <div class="d-flex w-100 justify-content-between">
                                        <small>3 days ago</small>
                                        </div>
                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start notification">
                                        <div class="d-flex w-100 justify-content-between">
                                        <small class="text-muted">3 days ago</small>
                                        </div>
                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start notification">
                                        <div class="d-flex w-100 justify-content-between">
                                        <small class="text-muted">3 days ago</small>
                                        </div>
                                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid inventory">
                        <h2>Inventory:</h2>
                        <div className="offers-container">
                            <Offer/>
                            <Offer/>
                        </div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default Account;