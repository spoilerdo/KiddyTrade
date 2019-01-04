import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import OfferList from 'components/lists/OfferList';

import { getOffers } from '../../modules/offer';

import Csgo1Banner from 'img/csgo1-banner.jpg';
import Csgo2Banner from 'img/csgo2-banner.jpg';
import Csgo3Banner from 'img/csgo3-banner.jpg';
import './HomeStyle.css';

class Home extends Component {
    componentDidMount(){
        this.props.getOffers();
    }

    render() {
        return(
            <div>
                <Header />
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={Csgo1Banner} alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={Csgo2Banner} alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={Csgo3Banner} alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div className="search-container">
                    <form className="form-inline">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-default btn-m" type="submit">
                        <i className='material-icons search-btn'>search</i>
                        </button>
                    </form>
                </div>
                <OfferList offers={this.props.offers} listTitle={"Offers you might like:"}/>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { offers: state.offers.offers };
};

export default connect(
    mapStateToProps,
    { getOffers }
)(Home);