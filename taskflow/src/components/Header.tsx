import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';

interface HeaderProps {
  title: string; 
  onMenuClick: () => void; 
}
  
export default function Header({ title, onMenuClick }: HeaderProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return ( 
    <header className={styles.header}> 
      <div className={styles.left}> 
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button> 
        <h1 className={styles.logo}>{title}</h1> 
      </div> 
      <div className={styles.right}> 
        {user && (
          <>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>
              Déconnexion
            </button>
          </>
        )} 
      </div> 
    </header> 
  ); 
}
