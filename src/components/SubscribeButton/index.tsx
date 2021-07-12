import styles from './styles.module.scss';

interface SubscripbeButtonProps {
    priceId: string;
}


export function SubscribeButton({ priceId }: SubscripbeButtonProps) {

    return (
        <button type='button' className={styles.subscribeButton}>
            Subscribe Now
        </button>
    )
}