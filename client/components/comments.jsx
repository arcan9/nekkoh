import React from 'react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendComments: []
    };
  }

  getBackendComments() {

  }

  render() {
    return (
      <div>Comments</div>
    );
  }
}
