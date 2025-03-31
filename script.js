document.addEventListener('DOMContentLoaded', () => {
    setupBackgroundCanvas();
    setupCardInteractions();
    setupModal();
    setupTypingAnimation();
    setupConceptAnimation();
    setupScrollHint();
});

// Code to be typed out in animation - shortened for faster typing
const codeSnippet = `from coevolve import ai

# Symbiotic AI system
system = ai.Symbiotic()

# Learn humans
system.learn(humans)

# Co-evolve
system.coevolve()`;

// Initiative content for the modal
const initiativeDetails = {
    'Lindy': {
        color: 'var(--golden)',
        description: 'Lindy represents our commitment to long-lasting knowledge frameworks. We are building systems where humans and AI collaborate not just as tools, but as extensions of human cognition, continuously adapting to your evolving understanding and creating value that compounds over time.'
    },
    'Capybara': {
        color: 'var(--purple)',
        description: 'In a world mediated by AI understanding, digital presence must evolve. Capybara reimagines how we represent ourselves online, crafting meaning from our digital footprints. We\'re creating systems that understand context beyond keywords, comprehending the resonance of ideas across domains and time.'
    },
    'Minary': {
        color: 'var(--lightblue)',
        description: 'Current information architecture is built around static forms of data. Minary restructures work around meaning and intention, allowing for dynamic organization that learns and evolves with your thinking process, freeing ideas from rigid formats and enabling fluid thought structures.'
    },
    'Suddenly AI': {
        color: 'var(--salmon)',
        description: 'Some transformations happen gradually, then suddenly. We identify critical leverage points where AI can catalyze profound change, enabling quiet revolutions in how we think, create, and solve problems collectively. The future arrives unevenly—we find the acceleration paths.'
    },
    'Human Intelligence': {
        color: 'var(--red)',
        description: 'The most profound technologies disappear into use. We are pursuing the art of frictionless interaction between humans and intelligent systems—where the boundaries blur and cognitive enhancement feels natural, intuitive, and profoundly human, amplifying rather than replacing human agency and creativity.'
    },
    'Solid Intelligence': {
        color: 'var(--black)',
        description: 'We envision a future where intelligence is ambient—embedded in objects, environments, and systems. Not calling attention to itself, but silently augmenting human capability, like oxygen for thought, enabling new forms of collective cognition and extending our minds beyond biological constraints.'
    }
};

function setupCardInteractions() {
    const cards = document.querySelectorAll('.initiative-card');
    const modal = document.getElementById('modal');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const color = getComputedStyle(card).getPropertyValue('--theme-color');
        
        // Make the entire card clickable
        card.addEventListener('click', () => {
            // Find the matching initiative detail
            let details;
            // First try exact match
            if (initiativeDetails[title]) {
                details = initiativeDetails[title];
            } else {
                // Try to find by partial match (for "Suddenly" vs "Suddenly AI")
                const detailsKey = Object.keys(initiativeDetails).find(key => 
                    key.includes(title) || title.includes(key)
                );
                details = detailsKey ? initiativeDetails[detailsKey] : null;
            }
            
            if (!details) {
                console.error(`No details found for initiative: ${title}`);
                return;
            }
            
            // Set modal content with the appropriate theme color
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = details.description;
            document.getElementById('modal-title').style.color = details.color;
            document.querySelector('.modal-content').style.setProperty('--theme-color', details.color);
            
            // Show modal with animation
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function setupTypingAnimation() {
    const codeContainer = document.getElementById('typing-code');
    const codeElement = codeContainer.querySelector('code');
    
    // Clear previous content if any
    codeElement.innerHTML = '';
    
    let i = 0;
    const speed = 15; // Fast typing speed
    
    function typeWriter() {
        if (i < codeSnippet.length) {
            const char = codeSnippet.charAt(i);
            
            if (char === '\n') {
                codeElement.innerHTML += '<br>';
            } else {
                // Create a span for each character for animated transition
                const charSpan = document.createElement('span');
                charSpan.className = 'code-character';
                charSpan.textContent = char;
                codeElement.appendChild(charSpan);
            }
            
            i++;
            
            // Random typing speed variation for more realistic effect
            const randomSpeed = speed + Math.random() * 10;
            setTimeout(typeWriter, randomSpeed);
        } else {
            // When typing is complete, transition to concept visualization
            setTimeout(() => {
                transformCodeToIllustration();
            }, 200);
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 200);
}

function transformCodeToIllustration() {
    const codeCharacters = document.querySelectorAll('.code-character');
    const codeContainer = document.getElementById('typing-code');
    const animationContainer = document.getElementById('animation-container');
    
    // Fade out code with a simple opacity transition
    gsap.to(codeContainer, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            codeContainer.classList.add('fade-out');
            animationContainer.classList.add('fade-in');
            
            // Show subtle scroll hint when the animation completes
            setTimeout(() => {
                document.getElementById('scroll-hint').classList.add('visible');
            }, 1000);
        }
    });
}

function setupScrollHint() {
    // Create scroll hint if it doesn't exist
    if (!document.getElementById('scroll-hint')) {
        const scrollHint = document.createElement('div');
        scrollHint.id = 'scroll-hint';
        scrollHint.innerHTML = '<div class="arrow"></div><span>Explore</span>';
        document.body.appendChild(scrollHint);
    }
    
    // Hide scroll hint when user scrolls
    window.addEventListener('scroll', function() {
        const scrollHint = document.getElementById('scroll-hint');
        if (scrollHint && window.scrollY > 50) {
            scrollHint.classList.remove('visible');
        }
    });
}

function restartAnimation() {
    // Reset animation state
    isAnimationComplete = false;
    
    // Clear and reinitialize the animation container
    const container = document.getElementById('animation-container');
    
    // Remove existing canvas or animation elements
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Setup new animation
    setupConceptAnimation();
}

// Global variable to track animation state
let isAnimationComplete = false;

function setup3DAnimation() {
    // This function is now replaced by setupConceptAnimation
    setupConceptAnimation();
}

function setupConceptAnimation() {
    const container = document.getElementById('animation-container');
    
    // Create the concept visualization container
    const conceptCanvas = document.createElement('canvas');
    conceptCanvas.id = 'concept-canvas';
    conceptCanvas.width = container.clientWidth;
    conceptCanvas.height = container.clientHeight;
    container.appendChild(conceptCanvas);
    
    // Initialize the canvas and start animation
    const ctx = conceptCanvas.getContext('2d');
    
    // Monochromatic particles system
    const particles = [];
    const connections = [];
    const particleCount = 80;
    
    // Create particles with different shades of grey
    for (let i = 0; i < particleCount; i++) {
        const shade = Math.floor(Math.random() * 40) + 30; // Darker grey (30-70)
        const size = Math.random() * 3 + 1;
        
        particles.push({
            x: Math.random() * conceptCanvas.width,
            y: Math.random() * conceptCanvas.height,
            size: size,
            color: `rgba(${shade}, ${shade}, ${shade}, ${Math.random() * 0.5 + 0.5})`,
            speed: {
                x: (Math.random() - 0.5) * 0.4,
                y: (Math.random() - 0.5) * 0.4
            },
            // Some particles will be anchor points that don't move as much
            isAnchor: Math.random() > 0.7,
            connectionCount: 0,
            maxConnections: Math.floor(Math.random() * 3) + 2
        });
    }
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, conceptCanvas.width, conceptCanvas.height);
        
        // Update and draw connections
        connections.length = 0; // Reset connections
        
        // Calculate connections
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            
            if (p1.connectionCount >= p1.maxConnections) continue;
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                
                if (p2.connectionCount >= p2.maxConnections) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect nearby particles
                if (distance < 100) {
                    connections.push({
                        from: p1,
                        to: p2,
                        opacity: 1 - (distance / 100)
                    });
                    
                    p1.connectionCount++;
                    p2.connectionCount++;
                    
                    if (p1.connectionCount >= p1.maxConnections) break;
                }
            }
        }
        
        // Draw connections
        connections.forEach(connection => {
            const shade = Math.floor(Math.random() * 40) + 50; // Mid grey for connections
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${connection.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(connection.from.x, connection.from.y);
            ctx.lineTo(connection.to.x, connection.to.y);
            ctx.stroke();
            
            // Add subtle pulse effect along connections
            if (Math.random() > 0.95) {
                const midX = (connection.from.x + connection.to.x) / 2;
                const midY = (connection.from.y + connection.to.y) / 2;
                
                // Draw pulse
                const pulseSize = 2 + Math.random() * 3;
                const pulseOpacity = 0.4 + Math.random() * 0.3;
                const pulseShade = 180 + Math.floor(Math.random() * 75); // Lighter grey for pulses
                
                ctx.beginPath();
                ctx.fillStyle = `rgba(${pulseShade}, ${pulseShade}, ${pulseShade}, ${pulseOpacity})`;
                ctx.arc(midX, midY, pulseSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Update and draw particles
        particles.forEach(particle => {
            // Reset connection count for next frame
            particle.connectionCount = 0;
            
            // Update position with different behavior for anchors
            if (particle.isAnchor) {
                // Anchor points move very slowly
                particle.x += particle.speed.x * 0.2;
                particle.y += particle.speed.y * 0.2;
            } else {
                // Normal particles move at regular speed
                particle.x += particle.speed.x;
                particle.y += particle.speed.y;
            }
            
            // Bounce off edges with some padding
            const padding = 50;
            if (particle.x < -padding || particle.x > conceptCanvas.width + padding) {
                particle.speed.x *= -1;
            }
            if (particle.y < -padding || particle.y > conceptCanvas.height + padding) {
                particle.speed.y *= -1;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw subtle glow for anchor points
            if (particle.isAnchor) {
                const glow = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 5
                );
                
                const shade = parseInt(particle.color.match(/\d+/)[0]);
                
                glow.addColorStop(0, `rgba(${shade}, ${shade}, ${shade}, 0.3)`);
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.beginPath();
                ctx.fillStyle = glow;
                ctx.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Create occasional text "echoes" that fade in and out
        if (Math.random() < 0.003 && container.classList.contains('fade-in')) {
            const concepts = [
                'humans',
                'intelligence',
                'systems',
                'adaptation',
                'symbiosis',
                'co-evolve',
                'augment',
                'learn',
                'integrate'
            ];
            
            const concept = concepts[Math.floor(Math.random() * concepts.length)];
            const shade = Math.floor(Math.random() * 50) + 30; // Dark grey text
            
            // Find a relatively empty area
            let x, y;
            let attempts = 0;
            const maxAttempts = 10;
            
            do {
                x = conceptCanvas.width * 0.2 + Math.random() * conceptCanvas.width * 0.6;
                y = conceptCanvas.height * 0.2 + Math.random() * conceptCanvas.height * 0.6;
                
                // Check if this position is far enough from other particles
                let isClear = true;
                for (const particle of particles) {
                    const dx = x - particle.x;
                    const dy = y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 50) {
                        isClear = false;
                        break;
                    }
                }
                
                if (isClear) break;
                attempts++;
            } while (attempts < maxAttempts);
            
            // Create element
            const echoText = document.createElement('div');
            echoText.className = 'text-echo';
            echoText.textContent = concept;
            echoText.style.left = x + 'px';
            echoText.style.top = y + 'px';
            echoText.style.color = `rgba(${shade}, ${shade}, ${shade}, 0.9)`;
            container.appendChild(echoText);
            
            // Animate in and out
            gsap.fromTo(echoText, 
                { opacity: 0, scale: 0.7 }, 
                { 
                    opacity: 0.8, 
                    scale: 1, 
                    duration: 2,
                    onComplete: () => {
                        gsap.to(echoText, {
                            opacity: 0,
                            duration: 2,
                            delay: 1,
                            onComplete: () => {
                                if (echoText.parentNode === container) {
                                    container.removeChild(echoText);
                                }
                            }
                        });
                    }
                }
            );
        }
        
        if (container.classList.contains('fade-in')) {
            requestAnimationFrame(animate);
        }
    }
    
    // Handle window resize
    function resizeConceptCanvas() {
        conceptCanvas.width = container.clientWidth;
        conceptCanvas.height = container.clientHeight;
    }
    
    window.addEventListener('resize', resizeConceptCanvas);
    
    // Start animation loop
    animate();
}

function setupBackgroundCanvas() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particles for background
    const particles = [];
    const particleCount = 70;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            color: `rgba(45, 45, 45, ${Math.random() * 0.06 + 0.01})`, // Dark grey
            speed: {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2
            }
        });
    }
    
    // Draw function
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 180) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(45, 45, 45, ${0.02 * (1 - distance / 180)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speed.x;
            particle.y += particle.speed.y;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speed.x *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speed.y *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(draw);
    }
    
    // Start animation
    draw();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
