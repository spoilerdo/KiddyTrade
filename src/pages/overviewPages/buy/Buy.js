import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { buyOffer } from '../../../modules/offer';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import '../OverviewStyle.css';
import skin from 'img/ak47.png';

class Buy extends Component {
    constructor(props){
        super(props);
        this.state = {
            bankNumber: '',
            offer: {},
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const foundOffer = this.props.offers[this.props.match.params.ID];
        this.setState({
            offer: foundOffer,
        }, () => {
            console.log(this.state);
            this.props.buyOffer(this.state).then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            })
        });
    };

    render() {
        const { offers, items } = this.props;
        
        if(Object.keys(offers).length === 0 && Object.keys(items).length === 0){
            return <h2>No item selected</h2>;
        }

        const offer = offers[this.props.match.params.ID];
        const item = items[offer.itemId];

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
                                <p>{item.description}</p>
                                <p>condition: {item.condition}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Price details:</h2>
                            <div className="information">
                                <div className="sell-container">
                                    <form className="form-signin">
                                        <h2 className="form-signin-heading">Type in the bank name you want to pay with</h2>
                                        <input type="text" className="form-control" onChange={this.handleChange} name="bankNumber" placeholder="Bank name" required="" autoFocus="" />
                                        <div className="sell-container">
                                            <button className="btn btn-lg" type="submit" onClick={this.handleSubmit}>Buy</button>
                                            <Link to={`/detail/${this.props.match.params.ID}`} className="btn btn-lg" type="submit">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
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
    };
};

export default connect(
    mapStateToProps,
    { buyOffer }
)(Buy);