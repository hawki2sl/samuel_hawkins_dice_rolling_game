import Image from "next/image";
import dices from "../../public/dices.png";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image src={dices} alt={"dices image"} fill />
        </div>
        <div className={styles.header_container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Dice Rolling Game</h1>
          </div>
            <Link href="/game" className={styles.link}>Play Now</Link>
        </div>
      </div>
    </main>
  );
}
