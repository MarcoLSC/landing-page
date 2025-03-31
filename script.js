document.addEventListener('DOMContentLoaded', () => {
    setupBackgroundCanvas();
    setupCardInteractions();
    setupModal();
    setupTypingAnimation();
    setup3DAnimation();
    setupResetButton();
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
            const details = initiativeDetails[title];
            
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
            
            // Show reset button after animation completes
            setTimeout(() => {
                document.getElementById('reset-animation').classList.add('visible');
                // Also show scroll hint when the animation completes
                document.getElementById('scroll-hint').classList.add('visible');
            }, 1000);
        }
    });
}

function setupResetButton() {
    const resetButton = document.getElementById('reset-animation');
    
    resetButton.addEventListener('click', () => {
        // Hide animation container and reset button
        document.getElementById('animation-container').classList.remove('fade-in');
        resetButton.classList.remove('visible');
        
        // Hide scroll hint when resetting
        document.getElementById('scroll-hint').classList.remove('visible');
        
        // Reset code container
        const codeContainer = document.getElementById('typing-code');
        codeContainer.classList.remove('fade-out');
        
        // Restart animation
        restartAnimation();
        
        // Restart typing animation
        setTimeout(() => {
            setupTypingAnimation();
        }, 500);
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
    
    // Create scroll hint if it doesn't exist
    if (!document.getElementById('scroll-hint')) {
        const scrollHint = document.createElement('div');
        scrollHint.id = 'scroll-hint';
        scrollHint.innerHTML = '<div class="arrow"></div><div class="pulse"></div><span>Discover Our Initiatives</span>';
        document.body.appendChild(scrollHint);
    }
    
    // Initialize the canvas and start animation
    const ctx = conceptCanvas.getContext('2d');
    
    // Create a collection of nodes (concepts) and connections (evolution paths)
    const nodes = [];
    const connections = [];
    const nodeCount = 60;
    
    // Colors
    const humanColors = ['#FF8D78', '#D94F4F', '#FF6347'];
    const aiColors = ['#67D4F8', '#9277FF', '#6F5CFA'];
    const evolutionColors = ['#E6C068', '#FFD700', '#FFA500'];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const isHuman = Math.random() > 0.5;
        nodes.push({
            x: Math.random() * conceptCanvas.width,
            y: Math.random() * conceptCanvas.height,
            radius: Math.random() * 5 + 3,
            type: isHuman ? 'human' : 'ai',
            color: isHuman ? 
                humanColors[Math.floor(Math.random() * humanColors.length)] : 
                aiColors[Math.floor(Math.random() * aiColors.length)],
            speed: {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            },
            pulse: Math.random() * 2 * Math.PI,
            evolving: false,
            evolutionTarget: null,
            evolutionProgress: 0
        });
    }
    
    // Create evolution events
    function triggerEvolution() {
        // Find nodes that aren't already evolving
        const availableHumanNodes = nodes.filter(n => n.type === 'human' && !n.evolving);
        const availableAINodes = nodes.filter(n => n.type === 'ai' && !n.evolving);
        
        if (availableHumanNodes.length > 0 && availableAINodes.length > 0) {
            // Pick random nodes to evolve together
            const humanNode = availableHumanNodes[Math.floor(Math.random() * availableHumanNodes.length)];
            const aiNode = availableAINodes[Math.floor(Math.random() * availableAINodes.length)];
            
            // Mark them as evolving
            humanNode.evolving = true;
            aiNode.evolving = true;
            humanNode.evolutionTarget = aiNode;
            aiNode.evolutionTarget = humanNode;
            
            // Create a connection between them
            connections.push({
                source: humanNode,
                target: aiNode,
                progress: 0,
                lifetime: 0,
                color: evolutionColors[Math.floor(Math.random() * evolutionColors.length)]
            });
        }
        
        // Schedule next evolution
        setTimeout(triggerEvolution, 1000 + Math.random() * 2000);
    }
    
    // Start evolution events
    setTimeout(triggerEvolution, 1000);
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, conceptCanvas.width, conceptCanvas.height);
        
        // Draw connections first (so they appear behind nodes)
        connections.forEach((connection, index) => {
            connection.progress += 0.01;
            connection.lifetime += 0.01;
            
            // Calculate the current position along the path
            const dx = connection.target.x - connection.source.x;
            const dy = connection.target.y - connection.source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Draw connection line with gradient
            const gradient = ctx.createLinearGradient(
                connection.source.x, connection.source.y,
                connection.target.x, connection.target.y
            );
            gradient.addColorStop(0, connection.source.color);
            gradient.addColorStop(1, connection.target.color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 3]);
            ctx.moveTo(connection.source.x, connection.source.y);
            ctx.lineTo(connection.target.x, connection.target.y);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw evolution particles along the connection
            const particleCount = 5;
            for (let i = 0; i < particleCount; i++) {
                const offset = (connection.progress + i/particleCount) % 1;
                const x = connection.source.x + dx * offset;
                const y = connection.source.y + dy * offset;
                
                ctx.beginPath();
                ctx.fillStyle = connection.color;
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // If connection is old enough, create a new evolved node and remove the connection
            if (connection.lifetime > 3) {
                // Create new "evolved" node at midpoint
                const midX = (connection.source.x + connection.target.x) / 2;
                const midY = (connection.source.y + connection.target.y) / 2;
                
                nodes.push({
                    x: midX,
                    y: midY,
                    radius: (connection.source.radius + connection.target.radius) / 1.5,
                    type: 'evolved',
                    color: connection.color,
                    speed: {
                        x: (Math.random() - 0.5) * 0.7,
                        y: (Math.random() - 0.5) * 0.7
                    },
                    pulse: Math.random() * 2 * Math.PI,
                    evolving: false
                });
                
                // Reset the original nodes
                connection.source.evolving = false;
                connection.target.evolving = false;
                
                // Remove the connection
                connections.splice(index, 1);
            }
        });
        
        // Update and draw nodes
        nodes.forEach(node => {
            // If node is evolving, move toward its target
            if (node.evolving && node.evolutionTarget) {
                const dx = node.evolutionTarget.x - node.x;
                const dy = node.evolutionTarget.y - node.y;
                node.x += dx * 0.02;
                node.y += dy * 0.02;
            } else {
                // Normal movement
                node.x += node.speed.x;
                node.y += node.speed.y;
                
                // Bounce off edges
                if (node.x < node.radius || node.x > conceptCanvas.width - node.radius) {
                    node.speed.x *= -1;
                }
                if (node.y < node.radius || node.y > conceptCanvas.height - node.radius) {
                    node.speed.y *= -1;
                }
            }
            
            // Draw node with pulsing effect
            node.pulse += 0.05;
            const pulseScale = 1 + Math.sin(node.pulse) * 0.2;
            
            // Draw glow
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 2.5
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(node.x, node.y, node.radius * 2.5 * pulseScale, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw node
            ctx.beginPath();
            ctx.fillStyle = node.color;
            ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
            ctx.fill();
            
            // Add a symbol inside based on type
            ctx.fillStyle = '#FFFFFF';
            if (node.type === 'human') {
                // Human symbol (simple person)
                ctx.fillRect(node.x - node.radius * 0.2, node.y - node.radius * 0.3, node.radius * 0.4, node.radius * 0.6);
                ctx.beginPath();
                ctx.arc(node.x, node.y - node.radius * 0.5, node.radius * 0.3, 0, Math.PI * 2);
                ctx.fill();
            } else if (node.type === 'ai') {
                // AI symbol (circuit-like pattern)
                const size = node.radius * 0.6;
                ctx.beginPath();
                ctx.moveTo(node.x - size, node.y - size);
                ctx.lineTo(node.x + size, node.y - size);
                ctx.lineTo(node.x + size, node.y + size);
                ctx.lineTo(node.x - size, node.y + size);
                ctx.closePath();
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y - size);
                ctx.lineTo(node.x, node.y + size);
                ctx.moveTo(node.x - size, node.y);
                ctx.lineTo(node.x + size, node.y);
                ctx.stroke();
            } else if (node.type === 'evolved') {
                // Evolved symbol (star/burst)
                const points = 6;
                const innerRadius = node.radius * 0.3;
                const outerRadius = node.radius * 0.7;
                
                ctx.beginPath();
                for (let i = 0; i < points * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i / (points * 2)) * Math.PI * 2;
                    const x = node.x + Math.cos(angle) * radius;
                    const y = node.y + Math.sin(angle) * radius;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.fill();
            }
        });
        
        // Add some floating text/concept labels that occasionally appear
        if (Math.random() < 0.005 && container.classList.contains('fade-in')) {
            const concepts = ['Co-evolution', 'Synergy', 'Augmentation', 'Symbiosis', 
                             'Integration', 'Amplification', 'Enhancement', 'Adaptation'];
            const concept = concepts[Math.floor(Math.random() * concepts.length)];
            
            const conceptText = document.createElement('div');
            conceptText.className = 'floating-concept';
            conceptText.textContent = concept;
            conceptText.style.left = Math.random() * (conceptCanvas.width - 150) + 'px';
            conceptText.style.top = Math.random() * (conceptCanvas.height - 50) + 'px';
            
            container.appendChild(conceptText);
            
            // Animate it
            gsap.fromTo(conceptText, 
                { opacity: 0, scale: 0.5 }, 
                { opacity: 1, scale: 1, duration: 1 }
            );
            
            // Then fade out and remove
            setTimeout(() => {
                gsap.to(conceptText, {
                    opacity: 0, 
                    y: '-=30', 
                    duration: 1.5,
                    onComplete: () => {
                        if (conceptText.parentNode === container) {
                            container.removeChild(conceptText);
                        }
                    }
                });
            }, 3000);
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
