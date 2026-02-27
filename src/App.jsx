import "./App.css";
import React, { useEffect, useState } from "react";
import dark from "./assets/dark.jpg";
import image from "./assets/image.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FaTiktok } from "react-icons/fa";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Typewriter() {
  const roles = [
    "Game Developer...",
    "Web Designer...",
    "3D Artist...",
    "Video Editor...",
    "Graphic Designer...",
  ];

  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
          setSpeed(50);
        }, speed);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setSpeed(500);
      }
    } else {
      // Typing text
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          setSpeed(100);
        }, speed);
      } else {
        // Finished typing, wait then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
          setSpeed(50);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, speed]);

  return (
    <span className="text-[#ED2279] text-4xl font-bold">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function App() {
  useEffect(() => {
    // Place your MP4 at `public/computer.mp4` (so it is available at `/computer.mp4`).
    const video = document.createElement("video");
    video.src = "/computer.mp4";
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "anonymous";

    const size = 64; // favicon size (32 or 64)
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    let intervalId = null;

    const start = async () => {
      try {
        await video.play();
      } catch (e) {
        // Autoplay might be blocked; we still attempt to draw frames once available.
      }

      intervalId = window.setInterval(() => {
        try {
          ctx.drawImage(video, 0, 0, size, size);
          const href = canvas.toDataURL("image/png");
          let link = document.querySelector("link[rel*='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
          }
          link.type = "image/png";
          link.href = href;
        } catch (err) {
          // drawImage may throw until the video has loaded a frame
        }
      }, 100); // 100ms => ~10fps
    };

    video.addEventListener("loadeddata", start);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", start);
      if (intervalId) clearInterval(intervalId);
      video.pause();
    };
  }, []);

  return (
    <>
      <div
        className="min-h-screen text-white bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${dark})` }}
      >
        <nav className="fixed top-0 left-0 w-full bg-black flex justify-around items-center py-4 text-lg text-white z-50">
          <h1 className=" text-3xl font-bold text-[#ED2279]">Jacob Baddoo.</h1>
          <ul className="flex space-x-8">
            <li>
              <a href="#home" className=" hover:text-[#ED2279] font-bold">
                Home
              </a>{" "}
            </li>
            <li>
              <a href="#about" className=" hover:text-[#ED2279] font-bold">
                About
              </a>{" "}
            </li>
            <li>
              <a href="#service" className=" hover:text-[#ED2279] font-bold">
                Services
              </a>{" "}
            </li>
          </ul>
          <a href="#contact">
            <button className=" bg-[#ED2279] text-black px-5 py-1 rounded-full mr-3 hover:cursor-pointer font-bold">
              Contact Me
            </button>
          </a>
        </nav>
        <section
          id="home"
          className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-20"
        >
          <div className="max-w-xl space-y-6">
            <h1 className="text-3xl font-bold ">
              Hello I'm, <br />
              <span className="text-[#ED2279] text-6xl">
                Jacob Nii Lantei Baddoo
              </span>{" "}
            </h1>
            <h2 className="text-4xl font-bold">
              I'm a <Typewriter />
            </h2>
            <p className="text-gray-300">
              I am a pioneer in the journey of  crafting immersive digital experiences at the intersection of art and technology. I build visually compelling, interactive content through 3D, AI, Video's, animation, game design, and modern software development.
            </p>

            <div className="flex flex-col items-center space-y-4 mt-6">
              <a href="/Jacob_Baddoo.CV.pdf" download className="bg-[#ED2279] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer inline-block">
                Download Now
              </a>

              <div className="flex space-x-6 items-center mt-2">
                <a href="https://github.com/boredcreator124" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <span className="border-2 border-[#ED2279] p-3 rounded-lg hover:bg-[#ED2279] hover:text-black hover:rounded-full transition-all duration-200 flex items-center justify-center w-14 h-14">
                    <GitHubIcon sx={{ fontSize: 30 }} />
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/jacob-baddoo-687573310" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <span className="border-2 border-[#ED2279] p-3 rounded-lg hover:bg-[#ED2279] hover:text-black hover:rounded-full transition-all duration-200 flex items-center justify-center w-14 h-14">
                    <LinkedInIcon sx={{ fontSize: 30 }} />
                  </span>
                </a>
                <a href="https://www.tiktok.com/@mythicraft_studio" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <span className="border-2 border-[#ED2279] p-3 rounded-lg hover:bg-[#ED2279] hover:text-black hover:rounded-full transition-all duration-200 flex items-center justify-center w-14 h-14">
                    <FaTiktok size={24} color="white" />
                  </span>
                </a>
              </div>
            </div>
            <span></span>
          </div>
          <img
            src={image}
            alt=""
            width={420}
            height={400}
            className="bg-[#ED2279] rounded-full shadow-[0_0_30px_#ED2279] hover:shadow-[0_0_50px_#ED2279] hover:brightness-110 transition"
          />
        </section>

        <section id="about" className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-[#ED2279] mb-8">About Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            I am a passionate 3D Artist, Graphic Designer, and Software Developer
            with a diverse range of creative and technical skills. I
            specialize in transforming ideas into visually captivating and
            functional digital experiences through the use of
            industry-standard tools and innovative design principles. My
            expertise spans across 3D modeling, animation, game design, visual
            effects, and graphic design, as well as software development using
            modern programming languages and frameworks. I thrive at the
            intersection of art and technology — building interactive,
            immersive, and meaningful digital content that inspires and
            engages audiences. I'm constantly exploring new ways to merge
            creativity with code to bring unique visions to life, whether
            through games, apps, or visual storytelling. Let's connect and
            create something exceptional.
          </p>
        </section>

        <section id="service" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-[#ED2279] mb-12 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">3D Modeling & Animation</h3>
              <p className="text-gray-300 leading-relaxed">
                Create stunning 3D models and animations for games, films, and interactive experiences. From character design to environmental modeling, I bring your vision to life in 3D.
              </p>
            </div>

            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">Game Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Full game development services including game design, programming, and asset creation. I create engaging and immersive gaming experiences across multiple platforms.
              </p>
            </div>

            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">Web Design & Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Build modern, responsive websites and web applications using cutting-edge technologies. I create beautiful, functional digital experiences tailored to your needs.
              </p>
            </div>

            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">Graphic Design</h3>
              <p className="text-gray-300 leading-relaxed">
                Professional graphic design for branding, marketing materials, UI/UX design, and visual content. I create compelling visuals that communicate your message effectively.
              </p>
            </div>

            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">Video & Visual Effects</h3>
              <p className="text-gray-300 leading-relaxed">
                Professional video editing, motion graphics, and visual effects production. I create engaging video content with stunning effects for social media, marketing, and entertainment.
              </p>
            </div>

            <div className="bg-black bg-opacity-60 border border-[#ED2279] rounded-lg p-8 hover:shadow-lg hover:shadow-[#ED2279] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#ED2279] mb-4">UI/UX Design</h3>
              <p className="text-gray-300 leading-relaxed">
                User-centered design for applications and websites. I create intuitive, visually appealing interfaces that enhance user experience and engagement.
              </p>
            </div>

          </div>
        </section>

        <section id="contact" className="bg-black bg-opacity-80 max-w-6xl mx-auto px-4 py-20 rounded-lg">
          <h2 className="text-4xl font-bold text-[#ED2279] mb-8 text-center">Contact Me</h2>
          <div className="flex flex-col items-center justify-center space-y-8">
            <p className="text-gray-300 text-lg text-center max-w-2xl">
              Ready to bring your project to life? Get in touch with me directly via phone or reach out through my social channels.
            </p>
            <div className="text-center">
              <p className="text-gray-400 mb-2">Phone Number:</p>
              <a href="tel:0268237447" className="text-3xl font-bold text-[#ED2279] hover:text-white transition">
                0268237447
              </a>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400 mb-2">Email:</p>
              <a href="mailto:jacobniilanteibaddoo6@gmail.com" className="text-3xl font-bold text-[#ED2279] hover:text-white transition">
                jacobniilanteibaddoo6@gmail.com
              </a>
            </div>
            {/* replaced button with simple text link */}
            <p className="text-3xl font-bold text-[#ED2279]">
              Call Me Now
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
