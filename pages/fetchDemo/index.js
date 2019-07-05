import React from 'react'
import Link from 'next/link'
import Head from '../../components/head'
import Nav from '../../components/nav'
import {fetchAPI} from '../../utils/request';
import {message, Button} from 'antd';
import Styles from './index.less';

export default class FetchDemo extends React.Component{
  static async getInitialProps({ req }) {
    const response = await fetchAPI('/admin/yjofficialwebsite/platformarticles/get', {
      method: 'POST',
      body: {
        "platformType": 4,
        "articlesStatus": 1,
        "pageNo": "-1"
      }
    });
    // console.info(JSON.stringify(response));
    return {indexNews: response.vo.records};
  }
  constructor(props) {
    super(props);
    this.state = {
      indexNews: props.indexNews
    }
  }

  handleBtnClicked = async () => {
    const response = await fetchAPI('/admin/yjofficialwebsite/platformarticles/get', {
      method: 'POST',
      body: {
        "platformType": 4,
        "articlesStatus": 1,
        "pageNo": "-1"
      }
    });
    message.info(response.msg);
    console.log(response);
  };

  render() {
    return (
      <React.Fragment>
        <Head/>
        <div className={Styles.fetchText}>{this.state.indexNews[0].title}</div>
        <Button type="primary" onClick={this.handleBtnClicked}>客户端fetch</Button>
      </React.Fragment>
    )
  }
}
