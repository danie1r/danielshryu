import { Component, useState } from "react";
import ParticlesBg from "particles-bg";
import { Button } from "@headlessui/react";
import Navigation from "../utils/Navigation";
import ChatModal from "./ChatModal";


function HeaderElement({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!data) return null;
  const github = data.github;
  const linkedin = data.linkedin;
  const name = data.name;
  const description = data.description;

  return (
    <header id="home">
      <ParticlesBg color="#5b5c5c" num={200} type="cobweb" bg={true} />
      <Navigation />
      
      {/* Floating Ask AI Button */}
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="floating-ask-button"
        aria-label="Ask AI"
      >
        <i className="fa fa-magic"></i>
        <span>Ask AI</span>
      </Button>

      {/* Chat Modal */}
      <ChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h3>{description}</h3>
          <ul className="social">
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
            {/* <li>
              <a href={"../resume.pdf"} target="_blank" rel="noreferrer">
                <i className="fa fa-download fa-lg"></i>
              </a>
            </li> */}
          </ul>
          {/* <hr /> */}
        </div>
      </div>
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
