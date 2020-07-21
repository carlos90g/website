import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import loadFirebase from '../firebase.config';
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  // Initialize Firebase
  const firebase = await loadFirebase();
  firebase.analytics;

  const db = firebase.firestore();
  let result = await new Promise((resolve, reject) => {
    db.collection('nextjs-fb')
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          data.push(
            Object.assign(
              {
                id: doc.id
              },
              doc.data()
            )
          );
        });
        resolve(data);
      })
      .catch(error => {
        reject([]);
      });
  });

  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm a software developer focused on iOS platform, you can reach me on  
          <a href="https://twitter.com/carlos90g"> twitter </a>
          or visit my <a href="https://www.linkedin.com/in/carlos90g/">linkedin</a> profile</p>
        <p>
          I've built this website following this <a href="https://nextjs.org/learn"> Next.js tutorial </a>; 
          If you are curious it's open source and the code is available @ <a href="https://github.com/carlos90g/website"> Github </a>.
        </p>
      </section>
      <section className={utilStyles.headingMd}></section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}