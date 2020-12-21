import React, { Component } from 'react';

import Form from 'react-input';
import './Reserve.css';


const INITIAL_STATE = {
  email: null,
  name: null,
  topic: null,
  date: null,
  time: null

};

class Reserve extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  render() {
    return (

      <div>

        <h1>Next Study Buddy Session</h1>
        <div><strong>Email:</strong> {this.state.email}</div>
        <div><strong>Name:</strong> {this.state.name}</div>
        <div><strong>Topic:</strong> {this.state.topic}</div>
        <div><strong>Date:</strong> {this.state.date}</div>
        <div><strong>Time:</strong> {this.state.time}</div>
        <hr />
        <h1>Make your study reservation now</h1>
        <Form

          fields={[
            {
              name: 'Email',
              key: 'email',
              type: 'email',
              placeholder: 'Enter an email'
            },
            {
              name: 'Name',
              key: 'name',
              type: 'text',
              placeholder: 'Enter a name'
            },
            {
              name: 'Topic',
              key: 'topic',
              type: 'text',
              placeholder: 'Enter a topic'
            },
            {
              name: 'Date',
              key: 'date',
              type: 'text',
              placeholder: 'Enter a date'
            },
            {
              name: 'Time',
              key: 'time',
              type: 'text',
              placeholder: 'Enter a time'
            }
          ]}
          labels={false}
          onSubmit={({ email, name, topic, date, time }) => this.setState({
            email,
            name,
            topic,
            date,
            time

          })}

        />

      </div>
    );
  }
}


export default Reserve;