import React from 'react'
import Link from 'next/link'
import Head from '../../components/head'
import MyNav from '../../components/my-nav';
import {fetchAPI} from '../../utils/request';
import Styles from './index.less';

export default class NewsDetailDemo extends React.Component{
  static async getInitialProps({ req, query: {id} }) {
    const response = await fetchAPI('/admin/yjofficialwebsite/platformarticles/detail', {
      method: 'POST',
      body: {
        'id': id
      }
    });
    return {newsDetail: response.vo};
  }
  constructor(props) {
    super(props);
    this.state = {
      newsDetail: props.newsDetail || {}
    }
  }
  render() {
    return (
      <React.Fragment>
        <Head/>
        <MyNav/>

        <section className={Styles.banner}>
          <div className={Styles.bannerContainer}>
            <h1>新闻中心</h1>
            <p>媒体报道</p>
          </div>
        </section>

        <article className={Styles.articleContainer}>
          <h2>{this.state.newsDetail.title}</h2>
          <p className={Styles.source}>{this.state.newsDetail.sourceDate}&nbsp;&nbsp;来源：{this.state.newsDetail.sourceFrom}</p>
          <div className={Styles.content} dangerouslySetInnerHTML={{__html: this.state.newsDetail.articlesContent}}></div>
        </article>
      </React.Fragment>
    )
  }
}
