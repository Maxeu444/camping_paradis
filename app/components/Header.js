import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/locations">Hébergements</Link>
            </li>
            <li>
              <Link href="/reservations">Réservations</Link>
            </li>
            <li>
              <Link href="/auth/login">Connexion</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
