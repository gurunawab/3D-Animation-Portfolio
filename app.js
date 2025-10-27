// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    gsap.to(themeToggle, {
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
    })
})

const menuToggle = document.getElementById("menuToggle")
const mobileMenu = document.getElementById("mobileMenu")


menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
        body.style.overflow = "hidden"
    } else {
        body.style.overflow = ""
    }
})



function initloader() {
    const loader = document.querySelector(".loader")
    const loaderText = document.querySelector(".loader-text")
    const LoaderProgress = document.querySelector(".loader-progress")

    gsap.to(loaderText, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
    })

    gsap.to(LoaderProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    loader.style.display = "none"
                    initAnimations()
                }
            })
        }
    })
}

window.addEventListener("load", initloader)

if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
        })

        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY -20,
            duration: 0.2,
        })
    })
}

function initAnimations() {
    gsap.to("nav", {
        y: 0,
        duration: 1,
        ease: "power3.out",
    });

    const heroT1 = gsap.timeline() 
    heroT1.to(".hero-title", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.2,
        ease: "power3.out",
    })

    .to(".hero-subtitle", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    },  "-=0.5")

    .to(".hero-description", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    },  "-=0.3")

    .to(".cta-button", {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    },  "-=0.3")

    if (ScrollTrigger) {
        // About section Animations
        gsap.from(".about-content", {
         y: 40,
         opacity: 0,
         duration: 0.9,
         ease: "power3.out",
         scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
            toggleActions: "play none none none"
           }
        });

        gsap.from(".about-image",{
            y: 40,
            opacity: 0,
            duration: 0.9,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".about",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

   
    // Skills section animations
    gsap.from(".skills-title", {
        scrollTrigger: {
            trigger: ".skills",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".skills-lead", {
        scrollTrigger: {
            trigger: ".skills",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });

    // Animate skill items one by one
    gsap.utils.toArray(".skill-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out"
        });

        // Animate the skill bar fill
        gsap.to(item.querySelector(".skill-bar-fill"), {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            scaleX: item.dataset.level ? item.dataset.level / 100 : 0,
            duration: 1.5,
            delay: i * 0.1 + 0.5,
            ease: "power3.inOut"
        });
    });

    // contact section animations
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%"
        }
    });

    contactTl
        .from(".contact-title", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from(".contact-lead", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".contact-form", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.4")
        .from(".form-field", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.6")
        .from(".contact-card", {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=1");

    // Optional form submission animation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Button press effect
            gsap.to("#contactSubmit", {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });

            // Success message animation
            gsap.to(".contact-success", {
                opacity: 1,
                y: -20,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => {
                    setTimeout(() => {
                        gsap.to(".contact-success", {
                            opacity: 0,
                            y: 0,
                            duration: 0.5
                        });
                    }, 2000);
                }
            });

            contactForm.reset();
        });
    }
}
}

// Safe nav/mobile click handler (no need to change HTML hrefs)
(function() {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  if (!navLinks || navLinks.length === 0) return;

  const nameToId = {
    home: 'home',
    about: 'about',
    skills: 'skills',
    projects: 'projects',
    contact: 'contact'
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const text = (link.textContent || '').trim().toLowerCase();
      const targetId = nameToId[text];
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) return; // leave default behaviour if no matching section

      e.preventDefault();
      const navHeight = document.querySelector('nav')?.offsetHeight || 90;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });

      // close mobile menu if open (guarded)
      const mobileMenu = document.getElementById('mobileMenu');
      const menuToggle = document.getElementById('menuToggle');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
})();


// Add this animation in your contact section timeline
contactTl.from(".social-link", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out"
}, "-=0.8");

  gsap.from("footer", {
        scrollTrigger: {
            trigger: "footer",
            start: "top 95%"
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out"
    });

      gsap.from(".download-resume", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
    });