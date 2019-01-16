import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Logo from 'img/LogoDesign_01.png';

class Footer extends Component {
    render() {
        return(
            <div>
                <Typography variant="h6" align="center" gutterBottom>
                &copy; 2018 - Kiddy-Enterprise
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Concept website of Martijn Dormans
                </Typography>
            </div>
        );
    }
}

export default Footer;