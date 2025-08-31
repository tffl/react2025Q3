import styles from './Footer.module.css';

interface Footer {
  courseLink: string;
  githubLink: string;
}

export default function Footer({ courseLink, githubLink }: Footer) {
  return (
    <footer className={styles.footer}>
      <a href={courseLink} target="_blank" rel="noopener noreferrer">
        RS School React Course
      </a>
      |
      <a href={githubLink} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </footer>
  );
}
