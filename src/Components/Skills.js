import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (!this.props.data) return null;
    return (
      <section id="skills">
        <h1 className="sideHeader" style={{ background: "transparent" }}>
          My Expertise
        </h1>
        <div className="container">
          <div className="box">
            <h2 className="box-title">
              <ion-icon name="server-outline" /> <span>Backend Dev</span>
            </h2>
            <div className="box-content">
              <p>
                Specialization in integrating high scaled distributed systems
                and developing frameworks and interfaces that facilitate
                seamless API integration. Adept in building data pipelines for
                real-time data streaming and ingestion with wide expertise in
                areas like database management, and cloud computing.
              </p>
            </div>
          </div>
          <div className="box">
            <h2 className="box-title">
              <ion-icon name="apps-outline" /> <span>Web/Mobile App Dev</span>
            </h2>
            <div className="box-content">
              <p>
                Skilled in developing cross platform web/mobile apps
                using frameworks and languages such as React.js, Vue.js, Nuxt.js, React Native, and Swift.
                Experience in developing applications for various fields including healthcare, gaming, travel and more.
              </p>
            </div>
          </div>
          <div className="box">
            <h2 className="box-title">
              <ion-icon name="code-working-outline" /> <span>AI/ML Dev</span>
            </h2>
            <div className="box-content">
              <p>
              Leveraged ML algorithms to solve real-world problems, such as developing predictive models 
              to forecast Intracranial Pressure level in patients. Developed LLM-integrated applications and features to automate and simplify tasks 
              like travel planning, email management and data translation.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
