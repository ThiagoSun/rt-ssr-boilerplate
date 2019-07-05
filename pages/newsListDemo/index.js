import React from 'react'
import Link from 'next/link'
import Head from '../../components/head'
import MyNav from '../../components/my-nav';
import {fetchAPI} from '../../utils/request';
import Styles from './index.less';

export default class NewsListDemo extends React.Component{
  static async getInitialProps({ req, query: {pageNo} }) {
    const response = await fetchAPI('/admin/yjofficialwebsite/platformarticles/get', {
      method: 'POST',
      body: {
        'pageNo': pageNo,
        'pageSize': 5,
        'platformType': 4,
        'columnIds': 3,
        'articlesStatus': 1
      }
    });
    // console.info(JSON.stringify(response));
    return {indexNews: response.vo.records};
  }
  constructor(props) {
    super(props);
    this.state = {
      newsList: props.indexNews || []
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

        <section className={Styles.newsTabs}>
          <ul>
            <li className={Styles.active}>
              <Link href={'/newsListDemo'}><a>媒体报道</a></Link>
            </li>
            <li>
              <Link href={'/'}><a>公司动态</a></Link>
            </li>
          </ul>
        </section>

        <section className={Styles.newsList}>
          <ul>
            {
              this.state.newsList.map((item, index) => {
                return (
                  <li className={Styles.newsItem} key={`${index}_${item.id}`}>
                    <div className={`${Styles.itemBox} clearfix`}>
                      <div className={Styles.left}>
                        <a href={`/newsDetailDemo/${item.id}`} target='_blank'>
                          <img src={item.titleUrl} />
                        </a>
                      </div>
                      <div className={Styles.right}>
                        <a href={`/newsDetailDemo/${item.id}`} target='_blank'>
                          <h3>{item.title}</h3>
                        </a>
                        <p className={Styles.source}>{item.sourceFrom}&nbsp;&nbsp;{item.sourceDate}</p>
                        <a href={`/newsDetailDemo/${item.id}`} target='_blank'>
                          <p className={Styles.desc}>{item.abstractInfo}</p>
                        </a>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </React.Fragment>
    )
  }
}
