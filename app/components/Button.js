import styles from "./Button.module.css";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
}