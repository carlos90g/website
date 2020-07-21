import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm a software developer focused on iOS plattform, you can reach me on  
          <a href="https://twitter.com/carlos90g"> twitter </a>
          or visit my <a href="https://www.linkedin.com/in/carlos90g/">linkedin</a> profile</p>
        <p>
          I've built this website following this <a href="https://nextjs.org/learn"> Next.js tutorial</a>.
        </p>
      </section>
    </Layout>
  )
}