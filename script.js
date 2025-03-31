document.addEventListener('DOMContentLoaded', () => {
    setupBackgroundCanvas();
    setupCardInteractions();
    setupModal();
    setupTypingAnimation();
    setup3DAnimation();
});

// Code to be typed out in animation
const codeSnippet = `from coevolve import ai

# Create a symbiotic AI instance
system = ai.Symbiotic()

# Define your cognitive patterns
system.learn(your_thinking_patterns)

# Let it evolve with you
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
    'Suddenly': {
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
        const learnMore = card.querySelector('.learn-more');
        const color = getComputedStyle(card).getPropertyValue('--theme-color');
        
        // Set modal content and open it on click
        learnMore.addEventListener('click', () => {
            const details = initiativeDetails[title];
            
            // Set modal content with the appropriate theme color
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = details.description;
            document.getElementById('modal-title').style.color = details.color;
            
            // Show modal
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
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

function setupTypingAnimation() {
    const codeContainer = document.getElementById('typing-code');
    const codeElement = codeContainer.querySelector('code');
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    
    let i = 0;
    const speed = 50; // typing speed in milliseconds
    
    function typeWriter() {
        if (i < codeSnippet.length) {
            const char = codeSnippet.charAt(i);
            if (char === '\n') {
                codeElement.innerHTML += '<br>';
            } else {
                codeElement.innerHTML += char;
            }
            i++;
            
            // Scroll to bottom to show latest typed text
            codeContainer.scrollTop = codeContainer.scrollHeight;
            
            // Random typing speed variation for more realistic effect
            const randomSpeed = speed + Math.random() * 100 - 50;
            setTimeout(typeWriter, randomSpeed);
        } else {
            // Add cursor at the end
            codeElement.appendChild(cursor);
            
            // When typing is complete, transition to 3D animation
            setTimeout(() => {
                codeContainer.classList.add('fade-out');
                document.getElementById('animation-container').classList.add('fade-in');
            }, 1500);
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 500);
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
            color: `rgba(45, 45, 45, ${Math.random() * 0.06 + 0.01})`, // Changed to dark grey
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
                    ctx.strokeStyle = `rgba(45, 45, 45, ${0.02 * (1 - distance / 180)})`; // Changed to dark grey
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

function setup3DAnimation() {
    const container = document.getElementById('animation-container');
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);
    
    // Set camera position
    camera.position.z = 15;
    
    // Create computer mesh (simplified box)
    const computerGeometry = new THREE.BoxGeometry(5, 3, 0.5);
    const computerEdges = new THREE.EdgesGeometry(computerGeometry);
    const computerLines = new THREE.LineSegments(
        computerEdges,
        new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 1 })
    );
    
    // Create human figure mesh (simplified stick figure)
    const humanGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.CircleGeometry(1, 32);
    const headEdges = new THREE.EdgesGeometry(headGeometry);
    const head = new THREE.LineSegments(
        headEdges,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    head.position.y = 4;
    humanGroup.add(head);
    
    // Body
    const bodyGeometry = new THREE.BufferGeometry();
    bodyGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
        0, 4, 0, // Neck
        0, 0, 0, // Bottom of torso
        0, 0, 0, // Center
        -2, 2, 0, // Left arm
        0, 0, 0, // Center
        2, 2, 0, // Right arm
        0, 0, 0, // Hip
        -1, -3, 0, // Left leg
        0, 0, 0, // Hip
        1, -3, 0 // Right leg
    ], 3));
    const body = new THREE.LineSegments(
        bodyGeometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    humanGroup.add(body);
    
    // Add meshes to scene
    computerLines.position.x = -8;
    humanGroup.position.x = 8;
    
    scene.add(computerLines);
    scene.add(humanGroup);
    
    // Animation variables
    let mergeProgress = 0;
    let merged = false;
    let rotationSpeed = 0;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (container.classList.contains('fade-in')) {
            if (!merged && mergeProgress < 1) {
                // Move computer and human toward center
                mergeProgress += 0.01;
                
                computerLines.position.x = -8 + mergeProgress * 8;
                humanGroup.position.x = 8 - mergeProgress * 8;
                
                // Start rotation after halfway
                if (mergeProgress > 0.5) {
                    rotationSpeed += 0.0008;
                    computerLines.rotation.y += rotationSpeed;
                    humanGroup.rotation.y += rotationSpeed;
                }
                
                // Create merged entity
                if (mergeProgress >= 1) {
                    merged = true;
                    
                    // Hide separate entities
                    scene.remove(computerLines);
                    scene.remove(humanGroup);
                    
                    // Create merged entity (combination of computer and human)
                    const mergedGroup = new THREE.Group();
                    
                    // Add stylized human-computer hybrid
                    const hybridGeometry = new THREE.BufferGeometry();
                    const hybridPoints = [
                        // Head with digital elements
                        0, 4, 0,
                        -1, 5, 0,
                        0, 4, 0,
                        1, 5, 0,
                        0, 4, 0,
                        0, 5.5, 0,
                        
                        // Augmented body
                        0, 4, 0,
                        0, 0, 0,
                        
                        // Circuit-like arms
                        0, 3, 0,
                        -3, 2, 0,
                        -3, 2, 0,
                        -2, 1, 0,
                        -2, 1, 0,
                        -3, 0, 0,
                        
                        0, 3, 0,
                        3, 2, 0,
                        3, 2, 0,
                        2, 1, 0,
                        2, 1, 0,
                        3, 0, 0,
                        
                        // Digital legs
                        0, 0, 0,
                        -1.5, -3, 0,
                        0, 0, 0,
                        1.5, -3, 0,
                        
                        // Connecting elements
                        -1, 3, 0,
                        1, 3, 0,
                        -1, 2, 0,
                        1, 2, 0,
                        -1, 1, 0,
                        1, 1, 0
                    ];
                    
                    hybridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hybridPoints, 3));
                    
                    const hybrid = new THREE.LineSegments(
                        hybridGeometry,
                        new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 })
                    );
                    
                    mergedGroup.add(hybrid);
                    scene.add(mergedGroup);
                    
                    // Add animation to merged entity
                    mergedGroup.rotation.y = Math.PI / 4;
                }
            } else if (merged) {
                // Rotate merged entity when complete
                scene.children[0].rotation.y += 0.01;
                scene.children[0].rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
            }
        }
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
    
    // Start animation
    animate();
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