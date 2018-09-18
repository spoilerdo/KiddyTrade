import React, {Component} from 'react';
import './OfferStyle.css';
import skin from 'img/ak47.png';

class Offer extends Component {
    render() {
        return(
            <div className="offer-container">

               <div className="skin-image-container">
                    <img src={skin} />
               </div>
               <div className="skin-title-container">
                    <h3>AK47-Neon revelution</h3>
                    <p>prijs: $10,50</p>
               </div>
            </div>
        );
    }
}

export default Offer;