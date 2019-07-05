import React from 'react';
import Head from '../../components/head';
import {DatePicker} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class DatePickerDemo extends React.Component{
  static async getInitialProps({ req }) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    }
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      date
    })
  };

  render() {
    return (
      <React.Fragment>
        <Head/>
        <DatePicker onChange={this.onChange} value={this.state.date} locale={locale} />
      </React.Fragment>
    )
  }
}
