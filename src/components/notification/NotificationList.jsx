import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import moment from 'moment';

import { getNewNotifications, updateNotification } from '../../modules/notification';

import styles from './NotificationStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Arrow from '@material-ui/icons/PlayArrow';

class NotificationList extends Component {
    componentDidMount(){
        const userId = jwtDecode(localStorage.jwtToken)["userID"];
        this.props.getNewNotifications(userId);
    }

    handleClick = e => {
        const userId = jwtDecode(localStorage.jwtToken)["userID"];
        this.props.updateNotification(userId).catch(() => {return;})
    }

    handleDetailClick = (offerId) => {
        window.location.href = `/detail/${offerId}`;
    }

    renderList(){
        const { notifications, classes } = this.props

        if(Object.keys(notifications).length == 0){
            return <p>No notifications found</p>;
        }

        return _.map(notifications, notification => {
            return (
                <ListItem button onClick={() => this.handleDetailClick(notification.offerId)}>
                    <ListItemIcon>
                        <Arrow className={classes.arrow} fontSize="large" color="secondary"/>
                    </ListItemIcon>
                    {notification.sold ?
                        <ListItemText inset 
                            primary = {`SOLD: ${notification.offerName}`}
                            secondary={
                                <React.Fragment>
                                    {moment(notification.offerCreated).fromNow()}
                                </React.Fragment>
                            }
                        />
                        :
                        <ListItemText inset 
                            primary = {`NEW: ${notification.offerName}`}
                            secondary={
                                <React.Fragment>
                                    {moment(notification.offerCreated).fromNow()}
                                </React.Fragment>
                            }
                        />
                    }
                </ListItem>
            );
        });
    }

    render(){
        const { classes } = this.props

        return(
            <div>
                <List className={classes.root}>
                    {this.renderList()}
                </List>
                <Button variant="contained" color="secondary" onClick={this.handleClick}>
                    Clear notifications
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
    }
}

export default connect(
    mapStateToProps,
    { getNewNotifications, updateNotification }
)(withStyles(styles)(NotificationList));