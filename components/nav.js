import React from 'react'
import Link from 'next/link'
import Router from 'next/router';

const links = [
  { href: '/buttonDemo', label: 'buttonDemo' },
  { href: '/datePickerDemo', label: 'datePickerDemo' },
  { href: '/cssModule', label: 'cssModule' },
  { href: '/fetchDemo', label: 'fetchDemo' },
  { href: '/redirectDemo', label: 'redirectDemo' },
  { href: '/urlParams/HelloWorld', label: 'urlParams' },
  { href: '/newsListDemo', label: 'newsListDemo' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link
});

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
