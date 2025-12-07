'use client';

import { useMemo, useState, useEffect, useRef } from "react";
import { Code2, Rocket, Target, Zap, Mail, Phone, ExternalLink, Send, Github, Linkedin, Twitter, ChevronDown, Download, Menu, X } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tags: string[];
  icon: string;
  features: string[];
  links: { code?: string; demo?: string };
};

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable and scalable code",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    description: "Quick to adapt to new technologies",
  },
  {
    icon: Target,
    title: "Problem Solver",
    description: "Data structures & algorithms enthusiast",
  },
  {
    icon: Zap,
    title: "Full Stack",
    description: "End-to-end development expertise",
  },
];

const skillCategories = [
  {
    title: "Frontend",
    color: "primary",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    title: "Backend",
    color: "accent",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "JWT Auth", level: 80 },
    ],
  },
  {
    title: "Database",
    color: "primary",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 75 },
      { name: "Mongoose", level: 82 },
    ],
  },
  {
    title: "Languages",
    color: "accent",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "C/C++", level: 80 },
      { name: "Python", level: 70 },
    ],
  },
  {
    title: "Tools & Others",
    color: "primary",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Recoil", level: 75 },
      { name: "Zod", level: 78 },
      { name: "VS Code", level: 95 },
    ],
  },
];

const techLogos = [
  "React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript",
  "HTML5", "CSS3", "Tailwind", "Git", "GitHub", "MySQL"
];

const roles = [
  "Full Stack Web Developer",
  "MERN Stack Expert",
  "Problem Solver",
  "Tech Enthusiast",
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHoveringSkill, setIsHoveringSkill] = useState(false);
  const [isHoveringMarquee, setIsHoveringMarquee] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // Mouse tracking for 3D avatar and cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth marquee pause/resume
  useEffect(() => {
    if (marqueeRef.current) {
      if (isHoveringMarquee) {
        marqueeRef.current.style.animationPlayState = 'paused';
      } else {
        marqueeRef.current.style.animationPlayState = 'running';
      }
    }
  }, [isHoveringMarquee]);

  // Scroll handling for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero typing animation
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(role.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  useEffect(() => {
    // Intersection observers
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const skillsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSkillsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroSectionRef.current) {
      heroObserver.observe(heroSectionRef.current);
    }

    if (aboutSectionRef.current) {
      aboutObserver.observe(aboutSectionRef.current);
    }

    if (skillsSectionRef.current) {
      skillsObserver.observe(skillsSectionRef.current);
    }

    if (contactSectionRef.current) {
      contactObserver.observe(contactSectionRef.current);
    }

    return () => {
      heroObserver.disconnect();
      aboutObserver.disconnect();
      skillsObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const calculate3DTransform = (element: HTMLElement | null) => {
    if (!element || isHoveringSkill) return {};
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (mousePosition.y - centerY) / 50;
    const rotateY = (centerX - mousePosition.x) / 50;
    return {
      transform: `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      transformStyle: 'preserve-3d',
    };
  };

  // Add window dimensions state
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update window size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "MokeMoney",
        subtitle: "Digital Payment Platform",
        description:
          "A full-stack digital wallet application enabling seamless peer-to-peer money transfers with secure authentication and real-time balance updates.",
        href: "#",
        tags: ["MERN", "JWT", "MongoDB"],
        icon: "💰",
        features: [
          "Peer-to-peer transactions",
          "Secure JWT authentication",
          "Real-time balance updates",
          "User search functionality"
        ],
        links: { code: "https://github.com/premrawat9873/Wallet_Website", demo: "https://project.prem-rawat.me" }
      },
      {
        title: "Course Selling API",
        subtitle: "Educational Platform",
        description:
          "Complete backend API for online course platform with role-based access control and comprehensive admin panel for content management.",
        href: "#",
        tags: ["Node.js", "Express.js", "MongoDB"],
        icon: "📚",
        features: [
          "JWT authentication system",
          "Role-based access control",
          "Admin panel APIs",
          "Course content management"
        ],
        links: { code: "https://github.com/premrawat9873/Online-Course-Selling-API" }
      },
      {
        title: "Algorithm Visualizer",
        subtitle: "Educational Tool",
        description:
          "Interactive web application for visualizing compression algorithms with real-time execution steps and comparative analysis tools.",
        href: "#",
        tags: ["React.js", "JavaScript", "Tailwind"],
        icon: "🔧",
        features: [
          "Huffman coding visualization",
          "LZW compression display",
          "Real-time algorithm steps",
          "Interactive comparison tools"
        ],
        links: { code: "https://github.com/premrawat9873/Huffman-LZW-Visualizer", demo: "https://daa.prem-rawat.me/" }
      },
    ],
    []
  );

  const certifications: {
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    link?: string;
    skills: string[];
  }[] = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy & Harkirat Singh Cohort 3",
    date: "2024",
    skills: ["React", "Node.js", "Express", "MongoDB", "MERN Stack"],
  },
  {
    title: "Data Structures & Algorithms (DSA)",
    issuer: "CodeHelp Supreme 3.0",
    date: "2024",
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Complexity Analysis"],
  },
];

  return (
    <div className="min-h-screen p-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      {/* Custom Cursor */}
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out ${
          isHovering ? 'bg-indigo-500 scale-150' : 'bg-gray-900 scale-100'
        }`}
        style={{
          left: `${cursorPosition.x - 12}px`,
          top: `${cursorPosition.y - 12}px`,
          mixBlendMode: 'difference',
        }}
      />
      <div
        className="fixed w-12 h-12 rounded-full border border-gray-400 pointer-events-none z-40 transition-all duration-200 ease-out"
        style={{
          left: `${cursorPosition.x - 24}px`,
          top: `${cursorPosition.y - 24}px`,
        }}
      />

      {/* Enhanced Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="font-bold text-xl md:text-2xl transform-gpu transition-transform duration-300 hover:scale-110"
            >
              <span className="text-indigo-600">&lt;</span>
              <span className="text-gray-900">Prem</span>
              <span className="text-indigo-600">/&gt;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`text-sm font-medium transition-colors relative group transform-gpu hover:scale-110 ${
                    activeSection === link.href.substring(1)
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                      activeSection === link.href.substring(1)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
              <button 
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-900 transform-gpu transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-6xl px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`block text-lg font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "text-indigo-600"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button 
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Enhanced 3D with Light Theme */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          ...calculate3DTransform(heroSectionRef.current),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Enhanced Animated background elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ transform: 'translateZ(-100px)' }}>
          <div className="hero-gradient-light absolute inset-0 opacity-40" />
          <div className="bg-grid-light absolute inset-0 opacity-30" />
          
          {/* Multiple gradient orbs for better depth */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) translateZ(-50px)`,
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px) translateZ(-50px)`,
              animationDelay: "1.5s"
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px) translateZ(-30px)`,
              animationDelay: "2s"
            }}
          />
        </div>

        <div className="relative z-10 px-6 py-20 w-full" style={{ transform: 'translateZ(50px)' }}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Terminal-style intro */}
            <div className={`inline-block mb-8 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`}
                 style={{ 
                   transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(20px)`,
                   transformStyle: 'preserve-3d'
                 }}>
              <span className="font-mono text-sm text-indigo-600 bg-white/80 px-4 py-2 rounded-full border border-gray-200 shadow-lg backdrop-blur-sm">
                <span className="text-purple-600">$</span> whoami
              </span>
            </div>

            {/* Name */}
            <h1 
              className={`text-5xl md:text-7xl font-bold mb-6 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ 
                animationDelay: "0.1s",
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(30px)`,
                transformStyle: 'preserve-3d',
                textShadow: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px 30px rgba(99, 102, 241, 0.2)`,
              }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.2))' }}>Prem Rawat</span>
            </h1>

            {/* Typing animation */}
            <div className={`h-12 md:h-16 mb-8 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ 
              animationDelay: "0.2s",
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(25px)`,
              transformStyle: 'preserve-3d'
            }}>
              <p className="text-2xl md:text-4xl font-mono text-gray-700">
                <span className="text-indigo-600">&lt;</span>
                {displayText}
                <span className="inline-block w-0.5 h-8 md:h-10 bg-indigo-600 ml-1 animate-pulse" />
                <span className="text-indigo-600">/&gt;</span>
              </p>
            </div>

            {/* Description */}
            <p 
              className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ 
                animationDelay: "0.3s",
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(20px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              Crafting digital experiences with clean code and modern technologies.
              Passionate about building scalable web applications that make a difference.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ 
              animationDelay: "0.4s",
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(15px)`,
              transformStyle: 'preserve-3d'
            }}>
              <button
                className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 transform-gpu hover:rotate-1"
                onClick={() => scrollToSection("projects")}
                style={{
                  boxShadow: `${mousePosition.x * 0.01}px ${mousePosition.y * 0.01}px 40px rgba(99, 102, 241, 0.2)`,
                }}
              >
                View My Work
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button
                className="border border-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 transform-gpu hover:scale-105 hover:-rotate-1"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div className={`flex justify-center gap-6 ${isHeroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ 
              animationDelay: "0.5s",
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg) translateZ(10px)`,
              transformStyle: 'preserve-3d'
            }}>
              <a
                href="https://github.com/premrawat9873/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-300 hover:border-indigo-500 hover:bg-gray-100 transition-all duration-300 group transform-gpu hover:scale-110 hover:rotate-12"
              >
                <Github className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/prem-r98733"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gray-300 hover:border-indigo-500 hover:bg-gray-100 transition-all duration-300 group transform-gpu hover:scale-110 hover:rotate-12"
              >
                <Linkedin className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </a>
              <a
                href="mailto:premwork125@gmail.com"
                className="p-3 rounded-full border border-gray-300 hover:border-indigo-500 hover:bg-gray-100 transition-all duration-300 group transform-gpu hover:scale-110 hover:rotate-12"
              >
                <Mail className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Fixed Scroll indicator - Properly centered */}
        <div
          className="absolute bottom-8 left-1/2"
          style={{ transform: 'translateX(-50%) translateZ(60px)' }}
        >
          <div
            className={`flex flex-col items-center gap-2 cursor-pointer group transform-gpu hover:scale-110 ${
              isHeroVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1s" }}
            onClick={() => scrollToSection("#about")}
          >
            <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
              Scroll Down
            </span>
            <ChevronDown className="h-5 w-5 text-indigo-600 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About - Terminal with Light Theme */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="py-12 relative overflow-hidden bg-white/50"
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isAboutVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              About <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
          </div>

          {/* Terminal and Description Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Terminal Window - Left Side */}
            <div className={`${isAboutVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative rounded-xl border border-gray-200 bg-white/80 overflow-hidden transform-gpu transition-all duration-300 hover:scale-105 shadow-lg">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 font-mono text-xs text-gray-600">
                      about-prem.js
                    </span>
                  </div>
                  
                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm">
                    <pre className="text-gray-800">
                      <code>
                        <span className="text-indigo-600">const</span>{" "}
                        <span className="text-purple-600">developer</span> = {`{`}
                        {"\n"}
                        {"  "}name: <span className="text-indigo-600">"Prem Rawat"</span>,
                        {"\n"}
                        {"  "}role: <span className="text-indigo-600">"Full Stack Developer"</span>,
                        {"\n"}
                        {"  "}location: <span className="text-indigo-600">"India"</span>,
                        {"\n"}
                        {"  "}education: <span className="text-indigo-600">"B.Tech CSE"</span>,
                        {"\n"}
                        {"  "}focus: [
                        {"\n"}
                        {"    "}<span className="text-indigo-600">"Web Development"</span>,
                        {"\n"}
                        {"    "}<span className="text-indigo-600">"Problem Solving"</span>,
                        {"\n"}
                        {"    "}<span className="text-indigo-600">"Building Products"</span>
                        {"\n"}
                        {"  "}],
                        {"\n"}
                        {"  "}available: <span className="text-purple-600">true</span>
                        {"\n"}
                        {`}`};
                      </code>
                    </pre>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-xl blur-xl" />
              </div>
            </div>

            {/* Description - Right Side */}
            <div className={`space-y-6 ${isAboutVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate <span className="text-indigo-600 font-semibold">Full Stack Web Developer</span> with 
                expertise in the MERN stack. Currently pursuing my B.Tech in Computer Science 
                Engineering, I love turning ideas into reality through code.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a strong foundation in <span className="text-indigo-600 font-semibold">Data Structures and Algorithms</span>, 
                I approach every project with a problem-solving mindset. I believe in writing 
                clean, maintainable code that scales.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or solving algorithmic challenges.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    className={`p-4 bg-white/60 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-300 group transform-gpu hover:scale-105 hover:-translate-y-1 shadow-md ${isAboutVisible ? "animate-scale-in" : "opacity-0"}`}
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <item.icon className="h-6 w-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills - Light Theme */}
      <section
        id="skills"
        ref={skillsSectionRef}
        className="py-12 bg-white/70 relative overflow-hidden"
        onMouseEnter={() => setIsHoveringSkill(true)}
        onMouseLeave={() => setIsHoveringSkill(false)}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="bg-grid-light absolute inset-0" />
        </div>
        
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isSkillsVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Skills & <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          {/* Tech Logos Marquee - Light Theme */}
          <div 
            className={`mb-16 overflow-hidden ${isSkillsVisible ? "animate-fade-up" : "opacity-0"}`} 
            style={{ animationDelay: "0.2s" }}
            onMouseEnter={() => setIsHoveringMarquee(true)}
            onMouseLeave={() => setIsHoveringMarquee(false)}
          >
            <div 
              ref={marqueeRef}
              className="flex gap-8 animate-marquee md:gap-8 gap-6"
              style={{
                animationPlayState: isHoveringMarquee ? 'paused' : 'running',
                transition: 'animation-play-state 0.2s ease',
                // Faster on mobile, unchanged on desktop
                animationDuration: windowSize.width < 768 ? '12s' : '20s',
              }}
            >
              {[...techLogos, ...techLogos].map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-6 py-3 bg-white/80 rounded-lg border border-gray-200 hover:border-indigo-400 transition-all duration-300 transform-gpu hover:scale-110 shadow-md"
                >
                  <span className="font-mono text-sm text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid - Light Theme */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`bg-white/80 rounded-xl border border-gray-200 p-6 hover:border-indigo-300 transition-all duration-300 transform-gpu hover:scale-105 shadow-md ${isSkillsVisible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + categoryIndex * 0.1}s` }}
                onMouseEnter={() => setIsHoveringSkill(true)}
                onMouseLeave={() => setIsHoveringSkill(false)}
              >
                <h3 className={`text-xl font-bold mb-6 ${category.color === "primary" ? "text-indigo-600" : "text-purple-600"}`}>
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-600 font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            category.color === "primary"
                              ? "bg-gradient-to-r from-indigo-500 to-indigo-400"
                              : "bg-gradient-to-r from-purple-500 to-purple-400"
                          }`}
                          style={{
                            width: isSkillsVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${0.5 + categoryIndex * 0.1 + skillIndex * 0.05}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Light Theme */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-8 bg-white/50">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Featured Projects</h2>
          <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition">View Resume</a>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-xl border border-gray-200 bg-white/80 hover:bg-white transition-all duration-300 overflow-hidden transform-gpu hover:scale-102 hover:-translate-y-1 shadow-md"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Action Links */}
                  <div className="flex gap-2 flex-wrap max-w-full md:max-w-none">
                    {project.links.code && (
                      <a
                        href={project.links.code}
                        className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 transform-gpu hover:scale-110"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Code
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 transform-gpu hover:scale-110"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md border border-gray-200 bg-gray-100 text-gray-700 transform-gpu hover:scale-110 transition-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* GitHub CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-gray-700 font-medium">
              Want to see more projects?
            </p>
            <a
              href="https://github.com/premrawat9873/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="py-12 bg-white/60 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-25">
          <div className="bg-grid-light absolute inset-0" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Verified credentials showcasing continuous learning and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <article
                key={`${cert.title}-${idx}`}
                className="group bg-white/80 rounded-xl border border-gray-200 p-6 hover:border-indigo-300 transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200 transform-gpu hover:scale-110"
                      aria-label={`View ${cert.title} credential`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Credential
                    </a>
                  ) : null}
                </div>

                {cert.credentialId ? (
                  <p className="text-xs text-gray-500 mb-4">
                    Credential ID: <span className="font-mono">{cert.credentialId}</span>
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded-md border border-gray-200 bg-gray-100 text-gray-700 transform-gpu group-hover:scale-105 transition-transform"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Contact Section - Light Theme */}
      <section
        id="contact"
        ref={contactSectionRef}
        className="py-12 relative overflow-hidden bg-white/70"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="hero-gradient-light absolute inset-0 opacity-30" />
          <div className="bg-grid-light absolute inset-0 opacity-20" />
        </div>
        
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isContactVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`${isContactVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-white/90 rounded-2xl border border-gray-200 p-8 transform-gpu transition-all duration-300 hover:scale-105 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Let's Start a Conversation</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 transform-gpu focus:scale-105"
                        placeholder="Send me a message"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 transform-gpu focus:scale-105"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 resize-none transform-gpu focus:scale-105"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform-gpu hover:rotate-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>

                  {submitMessage && (
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 text-sm animate-fade-up">
                      {submitMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info & Social Links - Light Theme */}
            <div className={`space-y-8 ${isContactVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
              {/* Direct Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch directly</h3>
                
                <a
                  href="mailto:premrawat9873@gmail.com"
                  className="group flex items-center gap-4 p-4 bg-white/80 border border-gray-200 rounded-lg hover:bg-white hover:border-indigo-300 transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">premrawat9873@gmail.com</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                </a>

                <a
                  href="tel:+918377913494"
                  className="group flex items-center gap-4 p-4 bg-white/80 border border-gray-200 rounded-lg hover:bg-white hover:border-indigo-300 transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">+91 8377913494</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                </a>
              </div>

              {/* Social Links - Light Theme */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Connect on social</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/premrawat9873/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-white hover:border-indigo-300 transition-all duration-300 group transform-gpu hover:scale-110 hover:rotate-12 shadow-md"
                  >
                    <Github className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prem-r98733"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/80 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-white hover:border-indigo-300 transition-all duration-300 group transform-gpu hover:scale-110 hover:rotate-12 shadow-md"
                  >
                    <Linkedin className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-gray-200 rounded-lg transform-gpu transition-all duration-300 hover:scale-105 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                </div>
                <p className="text-gray-700">
                  Faridabad, Haryana – 121001<br />
                  Available for remote work worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateZ(30px) translateY(0px) rotateY(45deg);
          }
          50% { 
            transform: translateZ(30px) translateY(-15px) rotateY(45deg);
          }
        }
        
        /* Light theme gradients */
        .hero-gradient-light {
          background:
            radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,0.15) 0%, transparent 60%),
            radial-gradient(900px 500px at 90% 20%, rgba(168,85,247,0.15) 0%, transparent 60%),
            radial-gradient(800px 400px at 50% 90%, rgba(236,72,153,0.15) 0%, transparent 60%);
        }
        
        .bg-grid-light {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(156,163,175,0.3) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        /* Hide default cursor */
        * {
          cursor: none !important;
        }
        
        /* Show default cursor on inputs and text areas */
        input, textarea, button, a {
          cursor: pointer !important;
        }
      `}</style>
    </div>
  );
}
