import { IActive } from '@/interface/Active.interface'
import { FC } from 'react'
import styles from './SignIn.module.scss'
import { IUserActive } from '@/interface/UserActive.interface'

const SignIn: FC<IActive & IUserActive> = ({Active, SetActive, SetUserActive}) => {
  return (
    <form className={styles.form__block}>
      <div className={styles.form__title}>
        <span>Sign In</span>
      </div>
      <div className={styles.form__field}>
        <label htmlFor="">Email:</label>
        <input type="email" />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="">Password:</label>
        <input type="password" />
      </div>
      <button className={styles.form__button}>Sign In</button>
      <div className={styles.form__text}>
        <span>Have you account? <span onClick={() => SetActive(!Active)}className={styles.cursor}>Log In</span></span>
      </div>
    </form>
  )
}

export default SignIn