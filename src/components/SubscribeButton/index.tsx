import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscripbeButtonProps {
    priceId: string;
}


export function SubscribeButton({ priceId }: SubscripbeButtonProps) {

    const [session] = useSession();

    async function handleSubscribe() {

        if (!session) {
            signIn('github')
            return;
        }

        try {
            const response = await api.post('/subscribe')//subscribe =- nome arquivo na pasta api

            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId });

        } catch (err) {
            alert(err.message)
            console.log(err)
        }

        //criação da checkout session
    }

    return (
        <button type='button' className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe Now
        </button>
    )
}