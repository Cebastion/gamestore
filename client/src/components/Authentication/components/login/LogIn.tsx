import { IActive } from '@/interface/Active.interface'
import { FC } from 'react'
import styles from './LogIn.module.scss'
import { IUserActive } from '@/interface/UserActive.interface'

const LogIn: FC<IActive & IUserActive> = ({SetActive, Active, SetUserActive}) => {
  return (
    <form className={styles.form__block}>
      <div className={styles.form__title}>
        <span>Log In</span>
      </div>
      <div className={styles.form__field}>
        <label htmlFor="">Name:</label>
        <input type="text" />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="">Email:</label>
        <input type="email" />
      </div>
      <div className={styles.form__field}>
        <label htmlFor="">Password:</label>
        <input type="password" />
      </div>
      <button className={styles.form__button}>Log In</button>
      <div className={styles.form__text}>
        <span>Have you account? <span onClick={() => SetActive(!Active)}className={styles.cursor}>Sign In</span></span>
      </div>
    </form>
  )
}

export default LogIn