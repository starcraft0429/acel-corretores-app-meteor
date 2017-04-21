import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import './style.scss';

class SeeMore extends Component {

  constructor(props) {
    super(props);
    this.state = { seeMore: false };
  }

  // Messages
  onClickMessagesLink(message) {

    if (!this.state.seeMore) {
      this.setState({ seeMore: true });
      Meteor.call('messages.setIsRead', message);
    } else {
      this.setState({ seeMore: false });
    }
  }

  render() {

    console.info(JSON.stringify(this.props, null, 2));

    const { message } = this.props;

    const partialMessage =`${message.body.substring(GLOBAL.partialMessageSize, 0)}...`;

    return (
      <li key={message._id} className="animated fadeInDown">
        <div id="complete" className="message-item">
          { (this.state.seeMore) ? (
              <p>{message.body}</p>
            ) :
              <p>{partialMessage}</p>
          }
        </div>
        <div className="message-link">
          { (this.state.seeMore) ? (
                <a href="#" onClick={() => this.onClickMessagesLink(message)}>Ver menos</a>
            ) : <a href="#" onClick={() => this.onClickMessagesLink(message)}>Ver mais</a>}
        </div>
      </li>
    );
  }
}

export default SeeMore;
