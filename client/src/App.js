import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/AppNavbar";
import ChatDetail from "./components/ChatDetail";
import CreateRoom from "./components/CreateRoom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            chatLists: []
        };
    }

    componentDidMount() {
        axios.get(`/chats/list`)
            .then(res => {
                const chatLists = res.data;
                this.setState({ chatLists });
            });
    }

    sendChatId(i) {
        return <ChatDetail chatId={i} />;
    }

  render() {
    return (
      <div className="App">
          <AppNavbar/>
          <CreateRoom/>
          <hr/>
          <h3>Chat Room List</h3>
          <Router>
              <ListGroup>
                  { this.state.chatLists.map(chatList =>
                      <ListGroupItem tag="a" key={chatList._id}>
                          <Link to={`/chatDetail`}>
                              {chatList.roomTitle}
                              {this.sendChatId(chatList._id)}
                          </Link>
                          <Route path={`/chatDetail`} component={ChatDetail}/>
                      </ListGroupItem>
                  )}
              </ListGroup>
          </Router>
      </div>
    );
  }
}

export default App;
