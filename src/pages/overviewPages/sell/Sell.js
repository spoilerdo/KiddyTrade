import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { createOffer } from '../../../modules/inventory';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import '../OverviewStyle.css';
import skin from 'img/ak47.png';

class Sell extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemId: '',
            senderId: '',
            senderBankNumber: '',
            price: '',
        };
    }

    handleChange = e => {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            itemId: this.props.match.params.ID,
            senderId: this.props.user.userId,
        }, () => {
            this.props.createOffer(this.state).then(() => {
                this.props.history.push("/account");
            })
            .catch(() => {
                return;
            })
        });
    };

    render() {
        const { ownedItems } = this.props;
        
        if(Object.keys(ownedItems).length === 0){
            return <h2>No item selected</h2>;
        }

        const item = _.filter(ownedItems, i => i.itemID == this.props.match.params.ID)[0];

        return(
            <div>
                <Header/>
                <div className="row detail-container">
                    <div className="col-sm-6 item-detail-container">
                        <img src={skin} />
                        <div className="item-information-container">
                            <h2>Skin information:</h2>
                            <div className="information">
                                <p>{item.name}</p>
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
                                <form className="form-signin">
                                    <h2 className="form-signin-heading">Set a price</h2>
                                    <input type="text" className="form-control" onChange={this.handleChange} name="price" placeholder="Price" required="" autoFocus="" />
                                    <input type="text" className="form-control" onChange={this.handleChange} name="senderBankNumber" placeholder="Bank number" required="" autoFocus="" />
                                    <div className="sell-container">
                                        <button className="btn btn-lg" type="submit" onClick={this.handleSubmit}>Sell</button>
                                        <Link to={`/account}`} className="btn btn-lg" type="submit">Cancel</Link>
                                    </div>
                                </form>
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
        ownedItems: state.inventory.ownedItems,
        user: state.auth,
    };
};

export default connect(
    mapStateToProps,
    { createOffer }
)(Sell);