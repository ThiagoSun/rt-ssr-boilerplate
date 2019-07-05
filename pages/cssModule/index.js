import React from 'react';
import Styles from './index.less';

export default class CssModule extends React.Component{
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
        <section className={Styles.cssModule}>
          <span className={Styles.text}>使用 Markdown 的参考式链接，可以让文件更像是浏览器最后产生的结果</span>
          <span className="css-module-text">可以把一些标记相关的元数据移到段落文字之外</span>
        </section>
      </React.Fragment>
    )
  }
}
