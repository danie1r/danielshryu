import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (!this.props.data) return null;

    const networks = this.props.data.social.map(function (network) {
      console.log(network);
      return (
        <li key={network.name}>
          <a href={network.url}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0px",
                paddingTop: "0px",
              }}
            >
              <i
                className={network.className}
                style={{ marginRight: "10px" }}
              ></i>
              <p style={{ margin: "0" }}>{network.name}</p>
            </div>
          </a>
        </li>
      );
    });

    return (
      <footer>
        <section id="contact">
          <div className="row section-head">
            <h1>
              <span
                style={{
                  color: "white",
                  fontSize: "30px !important",
                  alignItems: "center",
                  background: "#414246 !important"
                }}
              >
                Get In Touch.
              </span>
            </h1>
            {/* <h3>
              <a href="mailto:d97shryu@gmail.com?">
                <span>d97shryu@gmail.com</span>
              </a>
            </h3> */}
            <ul style={{ alignItems: "center" }}>{networks}</ul>
          </div>
        </section>
        <div style={{ width: "100%", margin: "0"}}>
          <img alt="peppi_project" style={{width: "80%", marginBottom:"0", paddingBottom:"0",marginLeft:"10%"}} src="images/home_img.png" />
        </div>
      </footer>
    );
  }
}

export default Footer;
