document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Animation ---
    const roles = [
        "Python Programming Trainer",
        "AI & Automation Expert",
        "Laravel & Web Developer",
        "Robotics & Hardware Builder",
        "CSE Student"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-animation');
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = displayText;

        let typeSpeed = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typeSpeed);
    }
    if(typingElement) type();


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // --- Dynamic Project Loading ---
    const softwareProjects = [
        {
            name: "AI-Powered Automation Workflow",
            description: "Developed a custom n8n workflow using NLP to parse incoming emails, extract intent, and automatically trigger actions in a CRM system, reducing manual data entry by 90%.",
            repoLink: "https://github.com/Utsho25"
        },
        {
            name: "Real-Time Object Detection API",
            description: "Built a Python-based REST API using FastAPI and OpenCV that processes video streams to detect and classify objects in real-time with high accuracy.",
            repoLink: "https://github.com/Utsho25"
        },
        {
            name: "Laravel E-commerce Platform",
            description: "A full-featured e-commerce site with product management, user authentication, and a complete checkout system, built with the Laravel PHP framework.",
            repoLink: "https://github.com/Utsho25"
        }
    ];

    const hardwareProjects = [
        {
            title: "Multi-Protocol Wireless Security Toolkit",
            purpose: "MPWST V1 is a portable ESP32-powered hardware platform capable of scanning, analyzing, and visualizing WiFi, BLE, and RF signals in real time.",
            image: "Hd11.png"
        },
        {
            title: "Obstacle-Avoiding Rover",
            purpose: "An intelligent rover designed to autonomously navigate complex environments, featuring real-time obstacle detection and avoidance using a custom ultrasonic sensor array.",
            image: "project 2.jpeg"
        }
    ];

    const softwareContainer = document.getElementById('software-projects-container');
    const hardwareContainer = document.getElementById('hardware-projects-container');

    function createProjectCard(project, isHardware = false) {
        const card = document.createElement('div');
        // Add 'interactive-card' class for the 3D tilt effect
        card.className = 'project-card interactive-card';
        
        let content = '';

        if (isHardware) {
            if (project.image) {
                content += `<img src="${project.image}" alt="${project.title}" class="project-image">`;
            } else {
                content += `<div class="hardware-placeholder">Image Coming Soon</div>`;
            }
            content += `<h4>${project.title}</h4>`;
            content += `<p>${project.purpose}</p>`;
        } else {
            content += `<h4>${project.name}</h4>`;
            content += `<p>${project.description}</p>`;
            content += `<a href="${project.repoLink}" target="_blank" class="repo-link">View on GitHub</a>`;
        }
        
        card.innerHTML = content;
        return card;
    }

    if(softwareContainer) {
        softwareProjects.forEach(project => {
            softwareContainer.appendChild(createProjectCard(project));
        });
    }

    if(hardwareContainer) {
        hardwareProjects.forEach(project => {
            hardwareContainer.appendChild(createProjectCard(project, true));
        });
    }

    // --- WOW EFFECT: 3D Card Tilt ---
    const interactiveCards = document.querySelectorAll('.interactive-card, .skill-card, .achievement-item');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 20; // Adjust divisor for sensitivity

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });


    // --- WOW EFFECT: Particle Animation ---
    const canvas = document.getElementById('particle-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        const mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 120) * (canvas.width / 120)
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = 'rgba(0, 240, 255, 0.8)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                   ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            mouse.radius = ((canvas.height/80) * (canvas.width/80));
            init();
        });

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        init();
        animate();
    }
});