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

# Learn patterns
system.learn(thinking_patterns)

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
        const color = getComputedStyle(card).getPropertyValue('--theme-color');
        
        // Make the entire card clickable
        card.addEventListener('click', () => {
            const details = initiativeDetails[title];
            
            // Set modal content with the appropriate theme color
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = details.description;
            document.getElementById('modal-title').style.color = details.color;
            
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
    const speed = 20; // Much faster typing speed
    
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
            const randomSpeed = speed + Math.random() * 20; // Reduced randomness for faster typing
            setTimeout(typeWriter, randomSpeed);
        } else {
            // When typing is complete, transition to 3D animation after a short pause
            setTimeout(() => {
                // Start transitioning characters to prepare for 3D
                transformCodeToAnimation();
            }, 300);
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 300);
}

function transformCodeToAnimation() {
    const codeCharacters = document.querySelectorAll('.code-character');
    const codeContainer = document.getElementById('typing-code');
    const animationContainer = document.getElementById('animation-container');
    
    // Animate each character to prepare for 3D transition
    codeCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('transform-out');
        }, index * 10); // Staggered effect
    });
    
    // After characters animate out, transition containers
    setTimeout(() => {
        codeContainer.classList.add('fade-out');
        animationContainer.classList.add('fade-in');
        
        // Show reset button after animation completes
        setTimeout(() => {
            document.getElementById('reset-animation').classList.add('visible');
        }, 2000);
    }, codeCharacters.length * 10 + 300);
}

function setupResetButton() {
    const resetButton = document.getElementById('reset-animation');
    
    resetButton.addEventListener('click', () => {
        // Hide animation container and reset button
        document.getElementById('animation-container').classList.remove('fade-in');
        resetButton.classList.remove('visible');
        
        // Reset code container
        const codeContainer = document.getElementById('typing-code');
        codeContainer.classList.remove('fade-out');
        
        // Clear 3D scene and restart
        restartAnimation();
        
        // Restart typing animation
        setTimeout(() => {
            setupTypingAnimation();
        }, 500);
    });
}

function restartAnimation() {
    // The 3D animation will be restarted by removing and recreating the scene
    const container = document.getElementById('animation-container');
    
    // Remove existing canvas
    const existingCanvas = container.querySelector('canvas');
    if (existingCanvas) {
        container.removeChild(existingCanvas);
    }
    
    // Reset animation state
    isAnimationComplete = false;
    
    // Setup new animation
    setup3DAnimation();
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

// Global variable to track animation state
let isAnimationComplete = false;

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
    
    // Create more detailed computer mesh
    const computerGroup = new THREE.Group();
    
    // Monitor
    const monitorGeometry = new THREE.BoxGeometry(5, 3, 0.2);
    const monitorEdges = new THREE.EdgesGeometry(monitorGeometry);
    const monitorLines = new THREE.LineSegments(
        monitorEdges,
        new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 1 })
    );
    computerGroup.add(monitorLines);
    
    // Screen inner details
    const screenDetailsGeometry = new THREE.BufferGeometry();
    const screenPoints = new Float32Array([
        // Screen horizontal lines
        -2, 1, 0.11,
        2, 1, 0.11,
        
        -2, 0, 0.11,
        2, 0, 0.11,
        
        -2, -1, 0.11,
        2, -1, 0.11,
        
        // Screen vertical lines
        -1, 1.4, 0.11,
        -1, -1.4, 0.11,
        
        0, 1.4, 0.11,
        0, -1.4, 0.11,
        
        1, 1.4, 0.11,
        1, -1.4, 0.11,
    ]);
    screenDetailsGeometry.setAttribute('position', new THREE.BufferAttribute(screenPoints, 3));
    const screenDetails = new THREE.LineSegments(
        screenDetailsGeometry,
        new THREE.LineBasicMaterial({ color: 0x333333, opacity: 0.3, transparent: true })
    );
    computerGroup.add(screenDetails);
    
    // Stand
    const standGeometry = new THREE.BufferGeometry();
    const standPoints = new Float32Array([
        0, -1.5, 0,
        0, -3, 0,
        
        -1.5, -3, 0,
        1.5, -3, 0
    ]);
    standGeometry.setAttribute('position', new THREE.BufferAttribute(standPoints, 3));
    const stand = new THREE.LineSegments(
        standGeometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    computerGroup.add(stand);
    
    // Create more detailed human figure mesh
    const humanGroup = new THREE.Group();
    
    // Head - more detailed
    const headGeometry = new THREE.CircleGeometry(1, 32);
    const headEdges = new THREE.EdgesGeometry(headGeometry);
    const head = new THREE.LineSegments(
        headEdges,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    head.position.y = 4;
    humanGroup.add(head);
    
    // Add eyes
    const eyesGeometry = new THREE.BufferGeometry();
    const eyesPoints = new Float32Array([
        // Left eye
        -0.3, 4.2, 0.1,
        -0.1, 4.2, 0.1,
        
        // Right eye
        0.3, 4.2, 0.1,
        0.1, 4.2, 0.1
    ]);
    eyesGeometry.setAttribute('position', new THREE.BufferAttribute(eyesPoints, 3));
    const eyes = new THREE.LineSegments(
        eyesGeometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    humanGroup.add(eyes);
    
    // Body with more details
    const bodyGeometry = new THREE.BufferGeometry();
    const bodyPoints = new Float32Array([
        // Neck
        0, 4, 0,
        0, 3, 0,
        
        // Shoulders
        0, 3, 0,
        -2, 2.5, 0,
        
        0, 3, 0,
        2, 2.5, 0,
        
        // Torso
        0, 3, 0,
        0, 0, 0,
        
        // Arms - left with elbow
        -2, 2.5, 0,
        -2.5, 1.5, 0,
        
        -2.5, 1.5, 0,
        -3.5, 0.5, 0,
        
        // Arms - right with elbow
        2, 2.5, 0,
        2.5, 1.5, 0,
        
        2.5, 1.5, 0,
        3.5, 0.5, 0,
        
        // Legs with knees
        0, 0, 0,
        -1, -1.5, 0,
        
        -1, -1.5, 0,
        -1.5, -3.5, 0,
        
        0, 0, 0,
        1, -1.5, 0,
        
        1, -1.5, 0,
        1.5, -3.5, 0
    ]);
    bodyGeometry.setAttribute('position', new THREE.BufferAttribute(bodyPoints, 3));
    const body = new THREE.LineSegments(
        bodyGeometry,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    humanGroup.add(body);
    
    // Add meshes to scene
    computerGroup.position.x = -8;
    humanGroup.position.x = 8;
    
    scene.add(computerGroup);
    scene.add(humanGroup);
    
    // Animation variables
    let mergeProgress = 0;
    let merged = false;
    let rotationSpeed = 0;
    
    // Create the merged entity in advance (but don't add to scene yet)
    const mergedGroup = createMergedEntity();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (container.classList.contains('fade-in') && !isAnimationComplete) {
            if (!merged && mergeProgress < 1) {
                // Move computer and human toward center with slight oscillation
                mergeProgress += 0.01;
                
                computerGroup.position.x = -8 + mergeProgress * 8;
                humanGroup.position.x = 8 - mergeProgress * 8;
                
                // Add subtle movement
                computerGroup.position.y = Math.sin(mergeProgress * Math.PI * 2) * 0.2;
                humanGroup.position.y = Math.sin(mergeProgress * Math.PI * 2 + Math.PI) * 0.2;
                
                // Start rotation after halfway
                if (mergeProgress > 0.5) {
                    rotationSpeed += 0.0008;
                    computerGroup.rotation.y += rotationSpeed;
                    humanGroup.rotation.y += rotationSpeed;
                }
                
                // Create merged entity
                if (mergeProgress >= 1) {
                    merged = true;
                    
                    // Hide separate entities
                    scene.remove(computerGroup);
                    scene.remove(humanGroup);
                    
                    // Add merged entity
                    scene.add(mergedGroup);
                    
                    // Set initial rotation
                    mergedGroup.rotation.y = Math.PI / 4;
                    
                    // Use GSAP for a nice intro animation
                    gsap.from(mergedGroup.scale, {
                        x: 0.6, y: 0.6, z: 0.6,
                        duration: 1,
                        ease: "elastic.out(1, 0.3)"
                    });
                    
                    // Mark animation as complete
                    isAnimationComplete = true;
                }
            } else if (merged) {
                // Rotate merged entity when complete
                mergedGroup.rotation.y += 0.007;
                mergedGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
                
                // Subtle breathing animation
                const breathScale = 1 + Math.sin(Date.now() * 0.002) * 0.02;
                mergedGroup.scale.set(breathScale, breathScale, breathScale);
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

function createMergedEntity() {
    // Create a complex merged entity (combination of computer and human)
    const mergedGroup = new THREE.Group();
    
    // Add stylized human-computer hybrid with more details
    const hybridGeometry = new THREE.BufferGeometry();
    
    // Create much more detailed points for a human-computer hybrid
    const hybridPoints = [
        // Head with digital elements
        0, 4, 0,
        -1, 5, 0,
        
        0, 4, 0,
        1, 5, 0,
        
        0, 4, 0,
        0, 5.5, 0,
        
        // Digital face
        -0.5, 4.3, 0,
        0.5, 4.3, 0,
        
        -0.5, 3.7, 0,
        0.5, 3.7, 0,
        
        // Face circuit lines
        -0.8, 4.5, 0,
        -0.3, 4.5, 0,
        
        0.8, 4.5, 0,
        0.3, 4.5, 0,
        
        -0.5, 4.8, 0,
        0.5, 4.8, 0,
        
        // Augmented body center
        0, 4, 0,
        0, 2.5, 0,
        
        0, 2.5, 0,
        0, 0, 0,
        
        // Shoulder frame
        -2, 2.5, 0,
        2, 2.5, 0,
        
        // Left detailed arm
        -2, 2.5, 0,
        -3, 2, 0,
        
        -3, 2, 0,
        -3.5, 1, 0,
        
        -3.5, 1, 0,
        -4, 0, 0,
        
        // Geometric left arm details 
        -3, 2, 0,
        -2.7, 1.5, 0,
        
        -2.7, 1.5, 0,
        -3.2, 1, 0,
        
        -3.2, 1, 0,
        -3, 0.5, 0,
        
        // Right detailed arm
        2, 2.5, 0,
        3, 2, 0,
        
        3, 2, 0,
        3.5, 1, 0,
        
        3.5, 1, 0,
        4, 0, 0,
        
        // Geometric right arm details
        3, 2, 0,
        2.7, 1.5, 0,
        
        2.7, 1.5, 0,
        3.2, 1, 0,
        
        3.2, 1, 0,
        3, 0.5, 0,
        
        // Digital legs with details
        0, 0, 0,
        -1.5, -2, 0,
        
        -1.5, -2, 0,
        -2, -4, 0,
        
        0, 0, 0,
        1.5, -2, 0,
        
        1.5, -2, 0,
        2, -4, 0,
        
        // Leg details - circuits
        -1.5, -2, 0,
        -1, -2.5, 0,
        
        -1, -2.5, 0,
        -1.5, -3, 0,
        
        1.5, -2, 0,
        1, -2.5, 0,
        
        1, -2.5, 0,
        1.5, -3, 0,
        
        // Torso circuit details
        -1, 2, 0,
        1, 2, 0,
        
        -1.5, 1, 0,
        1.5, 1, 0,
        
        -1, 0, 0,
        1, 0, 0,
        
        // Vertical connectors
        -1, 2, 0,
        -1, 0, 0,
        
        1, 2, 0,
        1, 0, 0,
        
        // Digital aura/glow (more dense in center)
        -0.5, 5.2, 0,
        0.5, 5.2, 0,
        
        -2.2, 3, 0,
        -2.5, 3.5, 0,
        
        2.2, 3, 0,
        2.5, 3.5, 0,
        
        // Display panel on chest
        -1, 1.5, 0,
        1, 1.5, 0,
        
        1, 1.5, 0,
        1, 0.5, 0,
        
        1, 0.5, 0,
        -1, 0.5, 0,
        
        -1, 0.5, 0,
        -1, 1.5, 0,
        
        // Display details
        -0.8, 1.3, 0,
        0.8, 1.3, 0,
        
        -0.8, 1.1, 0,
        0.8, 1.1, 0,
        
        -0.8, 0.9, 0,
        0.8, 0.9, 0,
        
        -0.8, 0.7, 0,
        0.8, 0.7, 0
    ];
    
    hybridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hybridPoints, 3));
    
    const hybrid = new THREE.LineSegments(
        hybridGeometry,
        new THREE.LineBasicMaterial({ 
            color: 0x333333, 
            linewidth: 1.5, 
            transparent: true, 
            opacity: 0.9 
        })
    );
    
    // Add a subtle glow effect using a point light
    const light = new THREE.PointLight(0x6F5CFA, 0.5, 10);
    light.position.set(0, 0, 3);
    mergedGroup.add(light);
    
    mergedGroup.add(hybrid);
    return mergedGroup;
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