import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import moment from 'moment';

import { getNewNotifications } from '../../modules/notification';

import './NotificationStyle.css';

//TODO: HTML & CSS van account.js overnemen
class NotificationList extends Component {
    componentDidMount(){
        const userId = jwtDecode(localStorage.jwtToken)["userID"];
        this.props.getNewNotifications(userId);
    }

    renderList(){
        const { notifications } = this.props

        if(Object.keys(notifications).length == 0){
            return <h2>No notifications found</h2>;
        }

        return _.map(notifications, notification => {
            return (
                <Link to={'/detail/' + notification.offerId} key={notification.offerId} className="list-group-item list-group-item-action flex-column align-items-start notification">
                    <div className="d-flex w-100 justify-content-between">
                        <small>{moment(notification.offerCreated).fromNow()}</small>
                    </div>
                    <p className="mb-1">NEW: {notification.offerName}</p>
                </Link>
            );
        });
    }

    render(){
        return(
            <div className="list-group">
                {this.renderList()}
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
    { getNewNotifications }
)(NotificationList);