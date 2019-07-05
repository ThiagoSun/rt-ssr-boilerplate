import React, {PureComponent} from 'react';
import Styles from './index.less';
import {Dropdown, Menu} from 'antd';
import Link from 'next/link';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const menuList = [
  { label: '首页', href: '/' },
  { label: '产品官网', href: '/' },
  { label: '新闻中心', href: '/newsListDemo' },
  {
    label: '关于我们',
    href: '/fetchDemo',
    children: [
      {label: '公司介绍', href: '/fetchDemo'},
      {label: '加入我们', href: '/fetchDemo'},
      {label: '联系我们', href: '/fetchDemo'},
    ],
  }
];

export default class MyNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderDropdownMenu = (nodeList) => {
    return <ul className={Styles.dropdownContainer}>
      {
        nodeList.map((item, index) => {
          return (
            <li key={item.label + index}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>
          )
        })
      }
    </ul>
  };

  render() {
    return (
      <header className={Styles.myNav}>
        <nav className={`${Styles.headerContainer} clearfix`}>
          <div className={Styles.logo}>
            <img src='/static/newsListDemo/logo1.png' />
          </div>
          <ul className={Styles.menuList}>
            {
              menuList.map(item => {
                return (
                  <li className={Styles.menuItem} key={item.label}>
                    {
                      item.children && item.children.length > 0 ? (
                        <Dropdown overlay={this.renderDropdownMenu(item.children)}>
                          <span>
                            <Link href={item.href}>
                              <a>{item.label}</a>
                            </Link>
                          </span>
                        </Dropdown>
                      ) : (
                        <Link href={item.href}>
                          <a>{item.label}</a>
                        </Link>
                      )
                    }
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </header>
    )
  }
}
