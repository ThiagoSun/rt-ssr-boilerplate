import React from 'react'
import Router from 'next/router'

export default class RedirectDemo extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: '/fetchDemo'
      })
      res.end()
    } else {
      Router.push('/fetchDemo')
    }
    return {}
  }
}
