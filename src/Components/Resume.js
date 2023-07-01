import React, { Component } from "react";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });

    const work = this.props.data.work.map(function (w, index, work) {
      return (
        <div key={w.company}>
          <h3>{w.company}</h3>
          <p className="info">
            {w.title}
            <span>&bull;</span> <em className="date">{w.years}</em>
          </p>
          <ul style={{ listStyle: "inherit" }}>
            {w.description.points.map((bullet) => {
              return <li>{bullet}</li>;
            })}
          </ul>
          <div>
            {w.skills.map((skill) => {
              return <button className="button btn skill-btn">{skill}</button>;
            })}
          </div>
          {index !== work.length - 1 ? <hr /> : null}
        </div>
      );
    });

    const skills = this.props.data.skills.map((skills) => {
      const backgroundColor = this.getRandomColor();
      const className = "bar-expand " + skills.name.toLowerCase();
      const width = skills.level;

      return (
        <li key={skills.name}>
          <span style={{ width, backgroundColor }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });

    const projects = this.props.data.projects.map(function (
      proj,
      index,
      projects
    ) {
      return (
        <div key={proj.title}>
          <h3>{proj.title}</h3>
          <p className="info">
              {proj.url.map((go) => {
                return <a href={go.link} className="link">{go.type}</a>;
              })}
            <span>&bull;</span> <em className="date">{proj.years}</em>
          </p>
          <ul style={{ listStyle: "inherit" }}>
            {proj.description.points.map((bullet) => {
              return <li>{bullet}</li>;
            })}
          </ul>
          <div>
            {proj.skills.map((skill) => {
              return <button className="button btn skill-btn">{skill}</button>;
            })}
          </div>
          {index !== projects.length - 1 ? <hr /> : null}
        </div>
      );
    });

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{education}</div>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Work</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Projects</span>
            </h1>
          </div>

          <div className="nine columns main-col">{projects}</div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <p>{skillmessage}</p>

            <div className="bars">
              <ul className="skills">{skills}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
