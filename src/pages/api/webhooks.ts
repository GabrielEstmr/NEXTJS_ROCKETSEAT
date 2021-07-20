import { NextApiRequest, NextApiResponse } from 'next';
import { FaRegPlusSquare } from 'react-icons/fa';
import { Readable } from 'stream';



async function buffer(readable: Readable) {

    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        )
    };

    return Buffer.concat(chunks);

}


//Desabilitando o entendimento padrão do Next para requisições: pois agora é Buffer
export const config = {
    api: {
        bodyParser: false
    }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {

    //Só fazendo se for POST
    if (req.method === 'POST') {
        //Dados da Requisição
        const buf = await buffer(req);

        console.log('Evento Recebido');
        res.status(200).json({ ok: true });
    } else {
        res.setHeader('Allow', "POST");
        res.status(405).end('Method now allowed');
    }



}