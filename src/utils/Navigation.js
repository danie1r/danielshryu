import { useState, useEffect } from 'react';

function Navigation() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = ['home', 'skills', 'resume', 'portfolio', 'contact'];
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Find which section is currently in view
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const sectionTop = section.offsetTop;
                    if (scrollPosition >= sectionTop) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Call once on mount to set initial state
        handleScroll();

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
                Hide navigation
            </a>

            <ul id="nav" className="nav">
                <li className={activeSection === 'home' ? 'current' : ''}>
                    <a className="smoothscroll" href="#home">
                        Home
                    </a>
                </li>

                <li className={activeSection === 'skills' ? 'current' : ''}>
                    <a className="smoothscroll" href="#skills">
                        Skills
                    </a>
                </li>

                <li className={activeSection === 'resume' ? 'current' : ''}>
                    <a className="smoothscroll" href="#resume">
                        Resume
                    </a>
                </li>

                <li className={activeSection === 'portfolio' ? 'current' : ''}>
                    <a className="smoothscroll" href="#portfolio">
                        Projects
                    </a>
                </li>

                <li className={activeSection === 'contact' ? 'current' : ''}>
                    <a className="smoothscroll" href="#contact">
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;