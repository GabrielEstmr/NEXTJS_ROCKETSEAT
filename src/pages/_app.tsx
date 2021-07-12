import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

//APP:
// Tudo o que repete em todas as páginasd: colocar AQUI
// Tudo o que tiver em chamada HPPT: colocar aqui (pois recarrega toda vez que a pagina recarrega)


// MUITO IMPORTANTE:
// => Usar SSD: pode ser ruim pois a página só vai renderizar depois que todas as partes da páginas tiverem respostas 
// do lado do servidor

// => SSD: só funciona em PÀGINAS e não em componentes; Se querer ter acesso a alguma informação no componente que é
// server side: tem que passar da página => componente (da pág para o componente )

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
