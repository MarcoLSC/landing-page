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
    const speed = 15; // Even faster typing speed
    
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
            const randomSpeed = speed + Math.random() * 10; // Reduced randomness for faster typing
            setTimeout(typeWriter, randomSpeed);
        } else {
            // When typing is complete, transition to 3D animation after a short pause
            setTimeout(() => {
                // Start transitioning characters to prepare for 3D
                transformCodeToAnimation();
            }, 200);
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 200);
}

function transformCodeToAnimation() {
    const codeCharacters = document.querySelectorAll('.code-character');
    const codeContainer = document.getElementById('typing-code');
    const animationContainer = document.getElementById('animation-container');
    
    // More varied animations for characters to transform in different ways
    const animations = [
        { transform: 'translateY(-40px) rotate(45deg) scale(0)', opacity: 0 },
        { transform: 'translateY(40px) rotate(-45deg) scale(0)', opacity: 0 },
        { transform: 'translateX(-40px) scale(0)', opacity: 0 },
        { transform: 'translateX(40px) scale(0)', opacity: 0 },
        { transform: 'translateY(-30px) translateX(-30px) rotate(90deg) scale(0)', opacity: 0 },
        { transform: 'translateY(30px) translateX(30px) rotate(-90deg) scale(0)', opacity: 0 },
        { transform: 'translateY(-20px) translateX(20px) rotate(180deg) scale(0)', opacity: 0 },
        { transform: 'translateY(20px) translateX(-20px) rotate(-180deg) scale(0)', opacity: 0 }
    ];
    
    const colors = ['#E6C068', '#9277FF', '#67D4F8', '#FF8D78', '#D94F4F'];
    
    // Apply random transformations to each character with GSAP for smoother animations
    codeCharacters.forEach((char, index) => {
        const animation = animations[Math.floor(Math.random() * animations.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set initial bright color
        gsap.set(char, { color: color });
        
        // Create staggered, more impressive animation
        gsap.to(char, {
            ...animation,
            duration: 0.8,
            delay: index * 0.02,
            ease: "power2.out"
        });
    });
    
    // After characters animate out, transition containers
    gsap.to(codeContainer, {
        opacity: 0,
        duration: 0.5,
        delay: codeCharacters.length * 0.02 + 0.2,
        onComplete: () => {
            codeContainer.classList.add('fade-out');
            animationContainer.classList.add('fade-in');
            
            // Show reset button after animation completes
            setTimeout(() => {
                document.getElementById('reset-animation').classList.add('visible');
            }, 1500);
        }
    });
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
    
    // Create a more detailed computer model
    const computerGroup = createComputerModel();
    
    // Create a more detailed human model
    const humanGroup = createHumanModel();
    
    // Position initial models
    computerGroup.position.x = -8;
    humanGroup.position.x = 8;
    
    scene.add(computerGroup);
    scene.add(humanGroup);
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Animation variables
    let mergeProgress = 0;
    let merged = false;
    let rotationSpeed = 0;
    
    // Create the merged entity in advance (but don't add to scene yet)
    const mergedGroup = createMergedEntity();
    
    // Floating particles
    const particles = createParticles();
    scene.add(particles);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles
        if (particles.children.length > 0) {
            particles.children.forEach((particle, i) => {
                particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
                particle.rotation.y += 0.01;
            });
        }
        
        if (container.classList.contains('fade-in') && !isAnimationComplete) {
            if (!merged && mergeProgress < 1) {
                // Move computer and human toward center with slight oscillation
                mergeProgress += 0.01;
                
                computerGroup.position.x = -8 + mergeProgress * 8;
                humanGroup.position.x = 8 - mergeProgress * 8;
                
                // Add subtle movement
                computerGroup.position.y = Math.sin(mergeProgress * Math.PI * 2) * 0.3;
                humanGroup.position.y = Math.sin(mergeProgress * Math.PI * 2 + Math.PI) * 0.3;
                
                // Add subtle rotation
                computerGroup.rotation.z = Math.sin(mergeProgress * Math.PI) * 0.1;
                humanGroup.rotation.z = -Math.sin(mergeProgress * Math.PI) * 0.1;
                
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
                        duration: 1.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                    
                    // Add light animation
                    const pointLight = new THREE.PointLight(0x9277FF, 2, 10);
                    pointLight.position.set(0, 0, 2);
                    mergedGroup.add(pointLight);
                    
                    // Animate the light intensity
                    gsap.to(pointLight, {
                        intensity: 0.8,
                        duration: 2,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut"
                    });
                    
                    // Mark animation as complete
                    isAnimationComplete = true;
                }
            } else if (merged) {
                // Rotate merged entity when complete
                mergedGroup.rotation.y += 0.007;
                mergedGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
                
                // Complex breathing animation
                const breathScale = 1 + Math.sin(Date.now() * 0.002) * 0.02;
                mergedGroup.scale.set(breathScale, breathScale, breathScale);
                
                // Slight floating movement
                mergedGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
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

function createComputerModel() {
    const group = new THREE.Group();
    
    // Slight rotation animation for a subtle 'floating' effect
    gsap.to(group.rotation, {
        y: "+=6.283", // 2π (one full rotation)
        duration: 30,
        repeat: -1,
        ease: "none"
    });
    
    // Monitor frame
    const monitorFrameGeometry = new THREE.BoxGeometry(6.2, 4.2, 0.6);
    const monitorFrameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x222222, 
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const monitorFrame = new THREE.Mesh(monitorFrameGeometry, monitorFrameMaterial);
    group.add(monitorFrame);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(5.5, 3.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00FF00,
        transparent: true,
        opacity: 0.15
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.31;
    group.add(screen);
    
    // Circuit board
    const circuitGeometry = new THREE.BufferGeometry();
    const circuitPositions = [];
    for (let x = -2.5; x <= 2.5; x += 0.5) {
        for (let y = -1.5; y <= 1.5; y += 0.5) {
            if (Math.random() > 0.45) {
                // Horizontal line
                if (Math.random() > 0.5) {
                    circuitPositions.push(x, y, 0.32);
                    circuitPositions.push(x + 0.4 * Math.random(), y, 0.32);
                }
                // Vertical line
                if (Math.random() > 0.5) {
                    circuitPositions.push(x, y, 0.32);
                    circuitPositions.push(x, y + 0.4 * Math.random(), 0.32);
                }
                // Connection node
                if (Math.random() > 0.75) {
                    const nodeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
                    const nodeMaterial = new THREE.MeshBasicMaterial({ 
                        color: 0x00FF00,
                        transparent: true,
                        opacity: 0.9
                    });
                    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                    node.position.set(x, y, 0.33);
                    group.add(node);
                }
            }
        }
    }
    circuitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(circuitPositions, 3));
    const circuitMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00FF00, 
        transparent: true,
        opacity: 0.7
    });
    const circuits = new THREE.LineSegments(circuitGeometry, circuitMaterial);
    group.add(circuits);
    
    // Processor (glowing)
    const processorGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const processorMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF, 
        transparent: true,
        opacity: 0.8
    });
    const processor = new THREE.Mesh(processorGeometry, processorMaterial);
    processor.position.z = 0.35;
    group.add(processor);

    // Animate processor glow
    gsap.to(processorMaterial, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Data lines from processor
    const dataLinesGeometry = new THREE.BufferGeometry();
    const dataLinesPositions = [];
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.5;
        const startX = 0, startY = 0;
        const endX = Math.cos(angle) * (radius + 1 + Math.random());
        const endY = Math.sin(angle) * (radius + 1 + Math.random());
        dataLinesPositions.push(startX, startY, 0.36);
        dataLinesPositions.push(endX, endY, 0.36);
    }
    dataLinesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dataLinesPositions, 3));
    const dataLinesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00FF00, 
        transparent: true,
        opacity: 0.4
    });
    const dataLines = new THREE.LineSegments(dataLinesGeometry, dataLinesMaterial);
    group.add(dataLines);
    
    // Keyboard base
    const keyboardBaseGeometry = new THREE.BoxGeometry(5, 1.5, 0.2);
    const keyboardBaseMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x222222,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const keyboardBase = new THREE.Mesh(keyboardBaseGeometry, keyboardBaseMaterial);
    keyboardBase.position.y = -3;
    keyboardBase.position.z = 0.1;
    group.add(keyboardBase);
    
    // Keys
    for (let x = -2; x <= 2; x += 0.5) {
        for (let y = -3.5; y <= -2.5; y += 0.4) {
            const keyGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.05);
            const keyMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x333333,
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(x, y, 0.15);
            group.add(key);
        }
    }
    
    // Stand
    const standGeometry = new THREE.BufferGeometry();
    const standPositions = [
        // center support
        0, -2, 0, 0, -3, 0,
        // base horizontal
        -1.5, -3, 0, 1.5, -3, 0,
        // base front
        -1.5, -3, 0.2, 1.5, -3, 0.2,
        // connect verticals
        -1.5, -3, 0, -1.5, -3, 0.2,
        1.5, -3, 0, 1.5, -3, 0.2,
        // extra beams
        -0.5, -2, 0, -0.5, -3, 0,
        0.5, -2, 0, 0.5, -3, 0
    ];
    standGeometry.setAttribute('position', new THREE.Float32BufferAttribute(standPositions, 3));
    const standMaterial = new THREE.LineBasicMaterial({ color: 0x222222 });
    const stand = new THREE.LineSegments(standGeometry, standMaterial);
    group.add(stand);
    
    return group;
}

function createHumanModel() {
    const group = new THREE.Group();
    
    // Subtle rotation
    gsap.to(group.rotation, {
        y: "+=6.283",
        duration: 30,
        repeat: -1,
        ease: "none"
    });
    
    // Head
    const headGeometry = new THREE.SphereGeometry(1, 16, 16);
    const headMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444444, 
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 4;
    group.add(head);
    
    // Brain group
    const brainGroup = new THREE.Group();
    brainGroup.position.y = 4; 
    const leftHemisphereGeometry = new THREE.SphereGeometry(0.7, 16, 16, 0, Math.PI);
    const rightHemisphereGeometry = new THREE.SphereGeometry(0.7, 16, 16, Math.PI, Math.PI);
    const brainMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    const leftHemisphere = new THREE.Mesh(leftHemisphereGeometry, brainMaterial);
    leftHemisphere.rotation.y = Math.PI / 2;
    leftHemisphere.position.x = -0.1;
    const rightHemisphere = new THREE.Mesh(rightHemisphereGeometry, brainMaterial);
    rightHemisphere.rotation.y = -Math.PI / 2;
    rightHemisphere.position.x = 0.1;
    brainGroup.add(leftHemisphere, rightHemisphere);
    
    // Simple neural network
    const neuralGeometry = new THREE.BufferGeometry();
    const neuralPositions = [];
    const brainPoints = [];
    for (let i = 0; i < 20; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.6 * Math.random();
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        brainPoints.push({ x, y, z });
    }
    for (let i = 0; i < brainPoints.length; i++) {
        const p1 = brainPoints[i];
        for (let j = 0; j < 2; j++) {
            const p2 = brainPoints[Math.floor(Math.random() * brainPoints.length)];
            neuralPositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
    }
    neuralGeometry.setAttribute('position', new THREE.Float32BufferAttribute(neuralPositions, 3));
    const neuralMaterial = new THREE.LineBasicMaterial({
        color: 0x00FF00,
        transparent: true,
        opacity: 0.6
    });
    const neuralNetwork = new THREE.LineSegments(neuralGeometry, neuralMaterial);
    brainGroup.add(neuralNetwork);
    
    // Pulses
    for (let i = 0; i < 10; i++) {
        const idx = Math.floor(Math.random() * brainPoints.length);
        const point = brainPoints[idx];
        const pulseGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const pulseMaterial = new THREE.MeshBasicMaterial({
            color: 0x00FF00,
            transparent: true,
            opacity: 0.8
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.position.set(point.x, point.y, point.z);
        gsap.to(pulseMaterial, {
            opacity: 0.1,
            duration: 0.8 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        brainGroup.add(pulse);
    }
    group.add(brainGroup);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const eyeOuterMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.7
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeOuterMaterial);
    leftEye.position.set(-0.35, 4.1, 0.85);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeOuterMaterial);
    rightEye.position.set(0.35, 4.1, 0.85);
    
    const pupilGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.z = 0.12;
    leftEye.add(leftPupil);
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.z = 0.12;
    rightEye.add(rightPupil);
    
    group.add(leftEye, rightEye);
    
    // Body (line-based)
    const torsoGeometry = new THREE.BufferGeometry();
    const torsoPositions = [];
    // (all original torso points preserved below)
    // Neck
    torsoPositions.push(0, 3, 0,  -0.2, 2.7, 0.1);
    torsoPositions.push(0, 3, 0,   0.2, 2.7, 0.1);
    torsoPositions.push(-0.2, 2.7, 0.1, 0, 2.5, 0.15);
    torsoPositions.push(0.2, 2.7, 0.1, 0, 2.5, 0.15);
    // Shoulders
    torsoPositions.push(0, 2.5, 0.15, -0.5, 2.3, 0.1);
    torsoPositions.push(0, 2.5, 0.15,  0.5, 2.3, 0.1);
    torsoPositions.push(-0.5, 2.3, 0.1, -1.5, 2.2, 0);
    torsoPositions.push(0.5, 2.3, 0.1,  1.5, 2.2, 0);
    // Chest
    torsoPositions.push(-0.5, 2.3, 0.1, -0.8, 1.8, 0.2);
    torsoPositions.push( 0.5, 2.3, 0.1,  0.8, 1.8, 0.2);
    torsoPositions.push(-0.8, 1.8, 0.2, -0.4, 1.2, 0.25);
    torsoPositions.push( 0.8, 1.8, 0.2,  0.4, 1.2, 0.25);
    torsoPositions.push(-0.4, 1.2, 0.25,  0, 1, 0.2);
    torsoPositions.push( 0.4, 1.2, 0.25,  0, 1, 0.2);
    torsoPositions.push(0, 2.5, 0.15, 0, 1, 0.2);
    torsoPositions.push(0, 1, 0.2, 0, -0.5, 0);
    // Abs
    torsoPositions.push(-0.4, 1, 0.2, -0.4, 0.5, 0.15);
    torsoPositions.push( 0.4, 1, 0.2,  0.4, 0.5, 0.15);
    torsoPositions.push(-0.4, 0.5, 0.15, -0.3, 0, 0.1);
    torsoPositions.push( 0.4, 0.5, 0.15,  0.3, 0, 0.1);
    torsoPositions.push(-0.3, 0, 0.1, 0, -0.5, 0);
    torsoPositions.push( 0.3, 0, 0.1, 0, -0.5, 0);
    // Hips
    torsoPositions.push(0, -0.5, 0, -1, -1, 0);
    torsoPositions.push(0, -0.5, 0,  1, -1, 0);
    torsoPositions.push(-1, -1, 0, 1, -1, 0);
    // Arms
    torsoPositions.push(-1.5, 2.2, 0, -2, 1.7, 0);
    torsoPositions.push(-2, 1.7, 0, -2.2, 1.2, 0);
    torsoPositions.push(-2.2, 1.2, 0, -2.3, 0.7, 0);
    torsoPositions.push(-2.3, 0.7, 0, -2.7, 0, 0);
    torsoPositions.push(-2.7, 0, 0, -3, -0.5, 0);
    torsoPositions.push(-1.5, 2.2, 0, -1.8, 1.5, -0.1);
    torsoPositions.push(-1.8, 1.5, -0.1, -2.2, 1.2, 0);
    torsoPositions.push(-2.3, 0.7, 0, -2.5, 0.5, -0.1);
    torsoPositions.push(-2.5, 0.5, -0.1, -2.7, 0, 0);
    torsoPositions.push(1.5, 2.2, 0, 2, 1.7, 0);
    torsoPositions.push(2, 1.7, 0, 2.2, 1.2, 0);
    torsoPositions.push(2.2, 1.2, 0, 2.3, 0.7, 0);
    torsoPositions.push(2.3, 0.7, 0, 2.7, 0, 0);
    torsoPositions.push(2.7, 0, 0, 3, -0.5, 0);
    torsoPositions.push(1.5, 2.2, 0, 1.8, 1.5, -0.1);
    torsoPositions.push(1.8, 1.5, -0.1, 2.2, 1.2, 0);
    torsoPositions.push(2.3, 0.7, 0, 2.5, 0.5, -0.1);
    torsoPositions.push(2.5, 0.5, -0.1, 2.7, 0, 0);
    // Legs
    torsoPositions.push(-1, -1, 0, -1.1, -1.5, 0);
    torsoPositions.push(-1.1, -1.5, 0, -1.2, -2, 0);
    torsoPositions.push(-1.2, -2, 0, -1.1, -2.5, 0);
    torsoPositions.push(-1.1, -2.5, 0, -1, -3, 0);
    torsoPositions.push(-1, -3, 0, -0.9, -3.5, 0);
    torsoPositions.push(-0.9, -3.5, 0, -0.8, -4, 0);
    torsoPositions.push(-1, -1, 0, -0.8, -1.3, 0.1);
    torsoPositions.push(-0.8, -1.3, 0.1, -1.1, -1.5, 0);
    torsoPositions.push(-1.1, -2.5, 0, -0.9, -2.3, 0.1);
    torsoPositions.push(-0.9, -2.3, 0.1, -1, -2, 0);
    torsoPositions.push(1, -1, 0, 1.1, -1.5, 0);
    torsoPositions.push(1.1, -1.5, 0, 1.2, -2, 0);
    torsoPositions.push(1.2, -2, 0, 1.1, -2.5, 0);
    torsoPositions.push(1.1, -2.5, 0, 1, -3, 0);
    torsoPositions.push(1, -3, 0, 0.9, -3.5, 0);
    torsoPositions.push(0.9, -3.5, 0, 0.8, -4, 0);
    torsoPositions.push(1, -1, 0, 0.8, -1.3, 0.1);
    torsoPositions.push(0.8, -1.3, 0.1, 1.1, -1.5, 0);
    torsoPositions.push(1.1, -2.5, 0, 0.9, -2.3, 0.1);
    torsoPositions.push(0.9, -2.3, 0.1, 1, -2, 0);
    
    torsoGeometry.setAttribute('position', new THREE.Float32BufferAttribute(torsoPositions, 3));
    const torsoMaterial = new THREE.LineBasicMaterial({ 
        color: 0x444444,
        transparent: true,
        opacity: 0.8
    });
    const torso = new THREE.LineSegments(torsoGeometry, torsoMaterial);
    group.add(torso);
    
    // Neural system (spinal cord + branches)
    const neuralSystemGeometry = new THREE.BufferGeometry();
    const neuralSystemPositions = [];
    const spinalPoints = [];
    for (let y = 3.5; y >= -3.5; y -= 0.2) {
        const x = Math.sin(y * 2) * 0.05;
        spinalPoints.push({ x, y, z: 0.05 });
    }
    for (let i = 0; i < spinalPoints.length - 1; i++) {
        const p1 = spinalPoints[i];
        const p2 = spinalPoints[i + 1];
        neuralSystemPositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        if (i % 3 === 0) {
            neuralSystemPositions.push(p1.x, p1.y, p1.z, p1.x - 0.5 - Math.random() * 0.5, p1.y, p1.z - 0.05);
            neuralSystemPositions.push(p1.x, p1.y, p1.z, p1.x + 0.5 + Math.random() * 0.5, p1.y, p1.z - 0.05);
        }
    }
    neuralSystemGeometry.setAttribute('position', new THREE.Float32BufferAttribute(neuralSystemPositions, 3));
    const neuralSystemMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00FF00,
        transparent: true,
        opacity: 0.3
    });
    const neuralSystem = new THREE.LineSegments(neuralSystemGeometry, neuralSystemMaterial);
    group.add(neuralSystem);
    
    // Aura
    const auraGeometry = new THREE.SphereGeometry(4.5, 16, 16);
    const auraMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        transparent: true,
        opacity: 0.03,
        side: THREE.BackSide
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    gsap.to(aura.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    group.add(aura);
    
    return group;
}

function createMergedEntity() {
    const group = new THREE.Group();
    
    // Slow rotation
    gsap.to(group.rotation, {
        y: "+=6.283",
        duration: 40,
        repeat: -1,
        ease: "none"
    });
    
    // Core hybrid
    const hybridGeometry = new THREE.BufferGeometry();
    const points = [];
    
    // Head/monitor hybrid
    const headPoints = [
        -1.5, 5, 0,  1.5, 5, 0,
        -1.5, 5, 0, -1.5, 3.5, 0,
         1.5, 5, 0,  1.5, 3.5, 0,
        -1.5, 3.5, 0,  1.5, 3.5, 0,
        -0.7, 4.5, 0.1, -0.3, 4.5, 0.1,
         0.7, 4.5, 0.1,  0.3, 4.5, 0.1,
        -1.2, 4.8, 0.1, -0.8, 4.8, 0.1,
         0.8, 4.8, 0.1,  1.2, 4.8, 0.1,
        -1, 4.3, 0.1, -0.2, 4.3, 0.1,
         0.2, 4.3, 0.1,  1, 4.3, 0.1,
        -1.2, 3.8, 0.1, -0.4, 3.8, 0.1,
         0.4, 3.8, 0.1,  1.2, 3.8, 0.1,
         0, 3.5, 0, 0, 3, 0
    ];
    
    // Torso/chassis
    const torsoPoints = [
        0, 3, 0, 0, 2, 0,
        -2, 2, 0, 2, 2, 0,
        -2, 2, 0, -2, -1, 0,
         2, 2, 0,  2, -1, 0,
        -2, -1, 0,  2, -1, 0,
        -1.5, 1.5, 0.1, 1.5, 1.5, 0.1,
        -1.5, 1, 0.1,   1.5, 1, 0.1,
        -1.5, 0.5, 0.1, 1.5, 0.5, 0.1,
        -1.5, 0, 0.1,   1.5, 0, 0.1,
        -1.5, -0.5, 0.1, 1.5, -0.5, 0.1,
        -1, 2, 0.1, -1, -1, 0.1,
         0, 2, 0.1,  0, -1, 0.1,
         1, 2, 0.1,  1, -1, 0.1,
        -0.7, 1, 0.2, 0.7, 1, 0.2,
         0.7, 1, 0.2, 0.7, 0, 0.2,
         0.7, 0, 0.2, -0.7, 0, 0.2,
        -0.7, 0, 0.2, -0.7, 1, 0.2
    ];
    
    // Arms
    const armPoints = [
        -2, 2, 0, -2.5, 1.5, 0,
        -2.5, 1.5, 0, -3, 0.5, 0,
        -3, 0.5, 0, -3.5, -0.5, 0,
        -2.5, 1.5, 0.1, -2.2, 1.2, 0.1,
        -2.2, 1.2, 0.1, -2.7, 0.8, 0.1,
        -2.7, 0.8, 0.1, -3, 0.5, 0.1,
         2, 2, 0, 2.3, 1.3, 0,
         2.3, 1.3, 0, 3, 0.7, 0,
         3, 0.7, 0, 3.5, -0.3, 0,
         2.3, 1.3, 0.1, 2.5, 1, 0.1,
         2.5, 1, 0.1, 2.8, 0.9, 0.1,
         2.8, 0.9, 0.1, 3, 0.7, 0.1
    ];
    
    // Legs
    const legPoints = [
        -1.5, -1, 0, -1.5, -2, 0,
        -1.5, -2, 0, -1.5, -3, 0,
        -1.5, -3, 0, -1, -4, 0,
        -1.5, -2, 0.1, -1.2, -2, 0.1,
        -1.5, -3, 0.1, -1.3, -3, 0.1,
         1.5, -1, 0, 1.3, -2, 0,
         1.3, -2, 0, 1.5, -3, 0,
         1.5, -3, 0, 1, -4, 0,
         1.3, -2, 0.1, 1.4, -2.5, 0.1,
         1.4, -2.5, 0.1, 1.5, -3, 0.1
    ];
    
    // Connections
    const connectionPoints = [
        -1, 3.5, 0.15, -1.5, 3, 0.15,
         1, 3.5, 0.15,  1.5, 3, 0.15,
         0, 0.5, 0.2,  -2, 1, 0.2,
         0, 0.5, 0.2,   2, 1, 0.2,
         0, 0, 0.2, -1, -1.5, 0.2,
         0, 0, 0.2,  1, -1.5, 0.2,
        -1, 1.5, 0.15,  1, 0, 0.15,
         1, 1.5, 0.15, -1, 0, 0.15
    ];
    
    // Circuitry overlays
    const circuitryPoints = [];
    for (let i = 0; i < 35; i++) {
        const x1 = (Math.random() - 0.5) * 3;
        const y1 = (Math.random() - 0.5) * 8;
        const z1 = 0.3;
        const length = 0.2 + Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        const x2 = x1 + Math.cos(angle) * length;
        const y2 = y1 + Math.sin(angle) * length;
        circuitryPoints.push(x1, y1, z1, x2, y2, z1);
    }
    
    // Combine main shape
    points.push(
        ...headPoints,
        ...torsoPoints,
        ...armPoints,
        ...legPoints,
        ...connectionPoints
    );
    hybridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const hybridMaterial = new THREE.LineBasicMaterial({ 
        color: 0x222222,
        linewidth: 1.5
    });
    const hybrid = new THREE.LineSegments(hybridGeometry, hybridMaterial);
    group.add(hybrid);
    
    // Add circuitry
    const circuitryGeometry = new THREE.BufferGeometry();
    circuitryGeometry.setAttribute('position', new THREE.Float32BufferAttribute(circuitryPoints, 3));
    const circuitryMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00FF00,
        transparent: true,
        opacity: 0.7
    });
    const circuitry = new THREE.LineSegments(circuitryGeometry, circuitryMaterial);
    group.add(circuitry);
    
    // Glow
    const glowGeometry = new THREE.SphereGeometry(5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        transparent: true,
        opacity: 0.05
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(1, 1.5, 0.5);
    group.add(glow);
    
    // Circuitry opacity animation
    gsap.to(circuitry.material, {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    return group;
}

function createParticles() {
    const group = new THREE.Group();
    
    // Neon-ish palette
    const colors = [0x00FF00, 0xFF00FF, 0x00FFFF, 0xFFFF00];
    
    for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(
            new THREE.CircleGeometry(0.05 + Math.random() * 0.1, 8),
            new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.3 + Math.random() * 0.3,
                side: THREE.DoubleSide
            })
        );
        
        // Random spherical position
        const radius = 5 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Billboard rotation
        particle.rotation.x = -Math.PI / 2;
        
        group.add(particle);
    }
    
    return group;
}

// Smooth scrolling
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
