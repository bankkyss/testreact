import React, { Component } from 'react'

export default class Example extends Component {
  render() {
    return (
      <div style={{padding: 10}}>
        <h2>{this.props.title}</h2>
        <hr style={{
            height: 5
        }} />
        {this.props.children}
      </div>
    );
  }
}
