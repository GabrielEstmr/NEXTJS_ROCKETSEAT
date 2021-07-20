import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';//Renomeia para poder sabe qual provider é

import '../styles/global.scss';

//APP:
// Tudo o que repete em todas as páginasd: colocar AQUI
// Tudo o que tiver em chamada HPPT: colocar aqui (pois recarrega toda vez que a pagina recarrega)


// MUITO IMPORTANTE:
// => Usar SSD: pode ser ruim pois a página só vai renderizar depois que todas as partes da páginas tiverem respostas 
// do lado do servidor

// => SSD: só funciona em PÀGINAS e não em componentes; Se querer ter acesso a alguma informação no componente que é
// server side: tem que passar da página => componente (da pág para o componente )


//EXEMPLO: comentários em blog: client side :   tudo o que não precisar de indexação Google e não precisar de indexação
//=> client side

//AUTENTICACAO
// 1. => JWT (Storage)
// 2. => Next Auth (Social, Face, Insta, Git)
// 3. => Authentication As a Service => Cognito, Auth0


// Banco de Dados no Front:
// DB normais (Mongo, Postgress) 
//  => multiplas requisições: ok 
//  => Multiplas: conexoes ativas (pool) : pesado 

// => Servless: cria muitas conexoes com o Banco de Dados => ai usa FaunaDB e DynamoDB

// KEY/INFOS sensiveis: apenas dentro das funções getstaticprops/getServerSideProps e pasta API (é o que roda do lado de servidor!!) 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // //infos se está logado ou não chega em pageProps
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
