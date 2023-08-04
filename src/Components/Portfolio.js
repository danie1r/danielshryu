import React, { Component } from "react";

// let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (
      proj,
      index,
      projects
    ) {
      let projectImage = "images/portfolio/" + proj.image;
      return (
        <div
          className="project-list"
          key={proj.title}
          style={{ display: "flex" }}
        >
          <div
            style={{
              maxWidth: "250px",
              maxHeight: "250px",
              marginRight: "40px",
              marginTop: "10px",
              borderRadius: "0.25rem",
            }}
            className="project-list-img"
          >
            <img
              alt={proj.title}
              src={projectImage}
              style={{ borderRadius: "0.25rem", border: "2px solid gray" }}
            />
          </div>

          <div>
            <a href={proj.url} className="link">
              <div style={{display: "flex", margin:"0px", padding: "0px"}}>
                  <h3>{proj.title}</h3>
                  <i style={{color: "#8AFFE8", marginLeft:"10px"}} className="fa fa-external-link-square fa-lg"></i>
              </div>
            </a>
            
            <ul style={{ listStyle: "inherit" }}>
              {proj.description.points.map((bullet) => {
                return <li style={{ lineHeight: "1" }}>{bullet}</li>;
              })}
            </ul>
            <div>
              {proj.skills.map((skill) => {
                return (
                  <button className="button btn skill-btn">{skill}</button>
                );
              })}
            </div>
            {index !== projects.length - 1 ? <hr /> : null}
          </div>
        </div>
      );
    });

    return (
      // <section id="portfolio">
      //     <div className="row">
      //       <div className="twelve columns collapsed">
      //         <h1>Check Out Some of My Works.</h1>

      //         <div
      //           id="portfolio-wrapper"
      //           className="bgrid-quarters s-bgrid-thirds cf"
      //         >
      //           {projects}
      //         </div>
      //       </div>
      //     </div>
      // </section>

      <section id="portfolio">
        <h1 className="sideHeader">
          <span>Projects</span>
        </h1>
        <div className="row work">
          <div className="eleven columns main-col">{projects}</div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
