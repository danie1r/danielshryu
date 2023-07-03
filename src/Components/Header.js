import React, { Component, useState, useEffect } from "react";
import ParticlesBg from "particles-bg";

function RolesDescription() {
  const roles = [
    "Full-Stack Developer",
    "Web/Mobile App Developer",
    "Smart Contract Developer",
    "Software Engineer",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === roles.length - 1 && subIndex === roles[index].length) {
      setReverse(true);
      return;
    }

    if (
      subIndex === roles[index].length + 1 &&
      index !== roles.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 80);

    return () => clearTimeout(timeout); // eslint-disable-next-line
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <h2
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      I am a &nbsp;
      <span style={{ color: "#fe6928" }}>{`${roles[index].substring(
        0,
        subIndex
      )}${blink ? "|" : " "}`}</span>
    </h2>
  );
}

function HeaderElement({ data }) {
  if (!data) return null;
  const github = data.github;
  const linkedin = data.linkedin;
  const name = data.name;
  const description = data.description;

  return (
    <header id="home">
      <ParticlesBg type="cobweb" bg={true} />

      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#skills">
              Skills
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#portfolio">
              Projects
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <RolesDescription />
          {/* <h3>{description}.</h3> */}
          <hr />
          <ul className="social">
            <li>
              <a href="mailto:r.seunghyeondaniel@wustl.edu?">
                <i className="fa fa-envelope-o fa-lg"></i>
              </a>
            </li>
            <li>
              <a href={linkedin}>
                <i className="fa fa-linkedin fa-lg"></i>
              </a>
            </li>
            <li>
              <a href={github} >
                <i className="fa fa-github fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
     
      <p className="scrolldown">
        <a className="smoothscroll" href="#skills">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
}
class Header extends Component {
  render() {
    if (!this.props.data) return null;

    return <HeaderElement data={this.props.data} />;
  }
}

export default Header;
