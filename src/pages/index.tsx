
import { GetStaticProps } from 'next';
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  console.log(product)
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>News about <span>the React</span> world.</h1>
          <p>
            Get Access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}></SubscribeButton>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />

      </main>

    </>
  )
}


//Cuidado: não serve para dados dinamicos (obs: se for Bem vindo Gabriel: todos vão ver "Bem Vindo Gabriel")
export const getStaticProps: GetStaticProps = async () => {
  console.log('Console => Server Side Function');

  const price = await stripe.prices.retrieve('price_1JCSzFA94xj7frFYyVEanUTC', {
    expand: ['product']//ter acesso a todas as infos do produto e nãpo só o proce
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.unit_amount / 100),
  };


  return {
    props: {
      product: product,
    },
    revalidate: 60 * 60 * 24,// 24 hours
  }
}



// export const getServerSideProps: GetServerSideProps = async () => {
//   console.log('Console => Server Side Function');

//   const price = await stripe.prices.retrieve('price_1JCSzFA94xj7frFYyVEanUTC', {
//     expand: ['product']//ter acesso a todas as infos do produto e nãpo só o proce
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.unit_amount / 100),
//   };


//   return {
//     props: {
//       product: product,
//     }
//   }
// }
