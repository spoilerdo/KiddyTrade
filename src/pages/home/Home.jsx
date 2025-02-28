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

        /*                <div className="search-container">
                    <form className="form-inline">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-default btn-m" type="submit">
                        <i className='material-icons search-btn'>search</i>
                        </button>
                    </form>
                </div> */

        return(
            <div>
                <Header />
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={Csgo1Banner} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Csgo2Banner} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={Csgo3Banner} alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
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