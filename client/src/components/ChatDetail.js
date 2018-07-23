import React, { Component } from 'react';

class ChatDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            chatId: this.props.chatId
        };
    }

    render() {
        return (
            <div>
                <h1>Hi chatdetails will be here from backend chats/deatil/id api  {this.state.chatId}</h1>
            </div>
        );
    }
}

export default ChatDetail;

