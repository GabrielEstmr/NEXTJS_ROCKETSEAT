import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SignInButton() {


    const isUserLoggerIn = true;


    return isUserLoggerIn ?
        (<button type='button' className={styles.signInButton}>
            <FaGithub color="#04d361"></FaGithub>
            Sign in with Github
            <FiX color="#737380" className={styles.closeIcon}></FiX>
        </button>) :
        (<button type='button' className={styles.signInButton}>
            <FaGithub color="#eba417"></FaGithub>
            Sign in with Github
        </button>)
}