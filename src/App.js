import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router";

var data = [
        {name: "Khushal", number: "6386259889"},
        {name: "Owen wilson", number: "9999999999"}
        ];

class PhoneBookApp extends React.Component {
  constructor(props){
    super(props);
    this.loadDataFromVar = this.loadDataFromVar.bind(this);
    this.handleContactSubmit = this.handleContactSubmit.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  loadDataFromVar(){
      this.setState({data: data});
  }
  handleContactSubmit(contact){
      this.props.data.push(contact);
      console.log(this.props.data);
  }
  getInitialState(){
      return{data: []};
  }
  componentDidMount(){
      this.loadDataFromVar();
      setInterval(this.loadDataFromVar, this.props.pollInterval);
  }
  render(){
    return(
      <div className="phoneBookApp">
          <h1>My PhoneBook</h1>
        <AddContactForm onContactSubmit={this.handleContactSubmit} />
        <PhoneBookList data={this.props.data} />
      </div>
    );
  }
}



class PhoneBookList extends React.Component {
  render(){
    var contactNodes = this.props.data.map(function(contact) {
        return(
            <Contact name={contact.name} number={contact.number} />
        )
    });
    return (
        <div className="phoneBookList">
            {contactNodes}
        </div>
    );
  }
}

class AddContactForm extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
      e.preventDefault();
      var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
      var number = ReactDOM.findDOMNode(this.refs.number).value.trim();

      if(!name || !number){
          return;
      }
      this.props.onContactSubmit({name: name, number: number});

      ReactDOM.findDOMNode(this.refs.name).value = '';
      ReactDOM.findDOMNode(this.refs.number).value = '';
      // window.history.pushState(null,null,'/add');
      return;
  }
  render(){
    return(
      <form className="addContactForm" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Name" ref="name" />
              <input type="text" placeholder="Number" ref="number" />
              <button type="submit">Add Contact</button>
          </form>
    );
  }
}

class Contact extends React.Component{
  render(){
    return(
      <div className="contact">
          <h2 className="contactName">{this.props.name}</h2>
          <p>{this.props.number}</p>
      </div>
    );
  }
}

class App extends React.Component{

  render(){
    return(
    <BrowserRouter>
    <div>

    <Route exact={true} path='/' render={withRouter(() => (
    <div>
      <Navbar heading="PHONE BOOK"/>
      <PhoneBookApp data={data} pollInterval={200} />
    </div>
  ))}/>

    <Route exact={true} path='/add' render={withRouter(() => (
    <div>
        <Navbar heading="PHONE BOOK"/>

    </div>
  ))}/>

    </div>
    </BrowserRouter>
  );}
}
export default App;
