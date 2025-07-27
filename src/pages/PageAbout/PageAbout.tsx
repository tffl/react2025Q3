import { Header } from "../../ui-components/Header/Header";
import RssLogo from "../../assets/rss-logo.svg";
import "./PageAbout.css";

export const PageAbout = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <p>
          This is a non-commercial project built for educational purposes as a practical task for the RS School React course.
        </p>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/tffl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Natasha
          </a>
        </p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={RssLogo}
            alt="RS School React Course"
            className="rss-logo"
          />
        </a>
      </div>
    </>
  );
};