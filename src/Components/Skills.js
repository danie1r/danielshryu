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
          <div className="box" style={{ borderRight: "2px solid white" }}>
            <h2 className="box-title">
              <ion-icon name="apps-outline" /> <span style={{borderBottom:"5px solid #FF9800"}}>Web/Mobile App Dev</span>
            </h2>
            <div className="box-content">
              <p>
                Skilled in developing web-apps using React.js, Nuxt.js and cross
                platform mobile-app using React Native, iOS app in Swift
              </p>
            </div>
          </div>
          <div className="box" style={{ borderRight: "2px solid white" }}>
            <h2 className="box-title">
              <ion-icon name="server-outline" /> <span style={{borderBottom:"5px solid #9C27B0"}}>Backend Dev</span>
            </h2>
            <div className="box-content">
              <p>
                Experienced with DBs such as ElasticSearch, Firebase,
                PostgreSQL. Skilled in building server apps and constructing
                microservices/interfaces for data ingestion, API integration,
                and other client-server communications.
              </p>
            </div>
          </div>
          <div className="box">
            <h2 className="box-title">
              <ion-icon name="code-working-outline" />  <span style={{borderBottom:"5px solid #4CAF50"}}>Software Dev</span>
            </h2>
            <div className="box-content">
              <p>
                Adept in procedural and OOP in languages such as: Java, Python,
                JavaScript, TypeScript, Swift, C#
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;
