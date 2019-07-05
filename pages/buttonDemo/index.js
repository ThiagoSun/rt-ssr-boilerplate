import React from 'react';
import Head from '../../components/head';
import {Button} from 'antd';

export default class ButtonDemo extends React.Component{
  static async getInitialProps({ req }) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <React.Fragment>
        <Head/>
        <Button type="primary">Primary</Button>
      </React.Fragment>
    )
  }
}
