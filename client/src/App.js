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
            chatLists: [],
            chatId: {}
        };
    }

    componentDidMount() {
        axios.get(`/chats/list`)
            .then(res => {
                const chatLists = res.data;
                this.setState({ chatLists });
            });
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
                          <Link to={`/chatDetail/${chatList._id}`}>
                              {chatList.roomTitle}
                          </Link>
                          <Route path={`/chatDetail/${chatList._id}`} component={ChatDetail} chatId={chatList._id} />
                      </ListGroupItem>
                  )}
              </ListGroup>
          </Router>
          <h3>Chat details:</h3>
      </div>
    );
  }
}

export default App;
