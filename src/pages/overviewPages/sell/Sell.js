import React, {Component} from 'react';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import '../OverviewStyle.css';
import skin from 'img/ak47.png';

class Sell extends Component {
    render() {
        return(
            <div>
                <Header/>
                <div className="row detail-container">
                    <div className="col-sm-6 item-detail-container">
                        <img src={skin} />
                        <div className="item-information-container">
                            <h2>Skin information:</h2>
                            <div className="information">
                                <p>INFORMATION ABOUT THE SKIN LOL</p>
                            </div>
                            <div className="information">
                                <p>Best price: $35,-</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="price-detail-container">
                            <h2>Price details:</h2>
                            <div className="information">
                                <form className="form-signin">       
                                    <h2 className="form-signin-heading">Set a price</h2>
                                    <input type="text" className="form-control" name="username" placeholder="Price" required="" autofocus="" />   
                                    <div className="sell-container">
                                        <button className="btn btn-lg" type="submit">Sell</button>
                                        <button className="btn btn-lg" type="submit">Cancel</button>
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

export default Sell;