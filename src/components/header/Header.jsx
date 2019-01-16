import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SockJsClient from 'react-stomp';

import { unlogin } from '../../modules/auth';
import { getBuyTokens } from '../../modules/account';
import { getNewNotifications } from '../../modules/notification';
import Login from '../../pages/forms/accountForms/login/Login';

import styles from './HeaderStyle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';



class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    offer: {},
    open: false,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  componentDidMount(){
    if(this.props.user.isAuthenticated){
      this.props.getBuyTokens(this.props.user.userId);
      this.props.getNewNotifications(this.props.user.userId);
    }
  }

  onMessage = (msg) => {
    this.setState({
      offer: msg.offer
    }, () =>{
      this.setState({open: true});
    });
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleLogout = e => {
    e.preventDefault();

    if(typeof this.props.unlogin !== "undefined"){
      this.props.unlogin().then(() => {
        this.handleMenuClose();
      });
    }
  }

  handleLogin = () => {
    this.loginReference.wrappedInstance.handleOpen();
  }

  handleAccountClick = () => {
    window.location.href = '/account';
  }
  
  handleHomeClick = () => {
    window.location.href = '/'
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, offer, open } = this.state;
    const { user, classes, notifications } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        <MenuItem onClick={this.handleAccountClick}>
          {notifications.length !== 0 ?
            <Badge badgeContent={notifications.length} color="secondary">
              My account
            </Badge>
            :
            <span>My account</span>
          }
        </MenuItem>
        <MenuItem>{this.props.tokens} buy token(s)</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {user.isAuthenticated ?
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          :
          <Button variant="contained" color="secondary" className={classes.loginBtn} onClick={this.handleLogin}>
            LOGIN
          </Button>
        }
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.handleHomeClick}>
              <HomeIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Kiddy Market
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {user.isAuthenticated ?
                <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                >
                  {notifications.length !== 0 && typeof notifications !== 'undefined' ?
                    <Badge badgeContent={notifications.length} color="secondary">
                      <AccountCircle />
                    </Badge>
                    :
                    <AccountCircle/>
                  }
                </IconButton>
                :
                <Button variant="contained" color="secondary" className={classes.loginBtn} onClick={this.handleLogin}>
                  LOGIN
                </Button>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        <Login ref={instance => this.loginReference = instance}/>
        {user.isAuthenticated &&
          <SockJsClient url='http://localhost:8080/websocket' topics={[`/topic/${user.userId}/offers`]}
            onMessage={(msg) => { this.onMessage(msg); }}
            ref={ (client) => { this.clientRef = client }}
          />
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">SOLD: {offer.offerName}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    user: state.auth,
    tokens: state.buytokens,
    notifications: state.notifications,
    classes: PropTypes.object.isRequired,
  };
};

export default withRouter(connect(
  mapStateToProps, 
  { unlogin, getBuyTokens, getNewNotifications }
  )(withStyles(styles)(Header)));