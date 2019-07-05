import React from 'react'

export default class UrlParams extends React.Component{
  static async getInitialProps({ req, query: {name} }) {
    return {name};
  }
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    }
  }
  render() {
    return (
      <React.Fragment>
        {`Hello ${this.state.name}`}
      </React.Fragment>
    )
  }
}
