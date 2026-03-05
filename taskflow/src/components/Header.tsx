import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {userName && <span style={{ color: 'white' }}>{userName}</span>}
        <span className={styles.avatar} onClick={onLogout} style={{ cursor: 'pointer' }}>
          {userName ? userName.substring(0, 2).toUpperCase() : 'JD'}
        </span>
      </div>
    </header>
  );
}