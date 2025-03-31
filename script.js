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

    // CRT-like monitor shell with curved edges
    const shellGeometry = new THREE.SphereGeometry(3.2, 32, 16, 0, Math.PI);
    shellGeometry.scale(1, 0.65, 1);
    const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true,
        transparent: true,
        opacity: 0.75
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.rotation.x = -Math.PI / 2;
    group.add(shell);

    // Smoothly curved screen surface inside the shell
    const screenGeometry = new THREE.SphereGeometry(2.7, 32, 16, 0, Math.PI);
    screenGeometry.scale(1, 0.6, 1);
    const screenMaterial = new THREE.MeshBasicMaterial({
        color: 0x55FF55,
        transparent: true,
        opacity: 0.15
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.rotation.x = -Math.PI / 2;
    screen.position.z = 0.05;
    group.add(screen);

    // Subtle GSAP glow pulse on the screen
    gsap.to(screenMaterial, {
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Internal circuit “rings” that revolve inside
    const circuitGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
        const ringGeom = new THREE.RingGeometry(1.5 + i * 0.3, 1.7 + i * 0.3, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x55FF55,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.4 - i * 0.06
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = -0.2 * i;
        circuitGroup.add(ring);
    }
    group.add(circuitGroup);

    // Animate the circuit rings rotating at slightly different speeds
    gsap.to(circuitGroup.rotation, {
        z: "+=6.283", // 2π rotation
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    // Stylized CPU block at bottom of screen
    const cpuGeometry = new THREE.BoxGeometry(1, 0.4, 1);
    const cpuMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFF55,
        transparent: true,
        opacity: 0.8
    });
    const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
    cpu.position.y = -1.8;
    group.add(cpu);

    // Animate CPU color flicker
    gsap.to(cpuMaterial, {
        opacity: 0.2,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Keyboard-like base using torus geometry
    const keyboardTorusGeometry = new THREE.TorusGeometry(3, 0.15, 16, 50);
    const keyboardTorusMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const keyboardTorus = new THREE.Mesh(keyboardTorusGeometry, keyboardTorusMaterial);
    keyboardTorus.rotation.x = Math.PI / 2;
    keyboardTorus.position.y = -3;
    group.add(keyboardTorus);

    // Slight overall rotation to keep it moving
    gsap.to(group.rotation, {
        y: "+=6.283",
        duration: 25,
        repeat: -1,
        ease: "none"
    });

    return group;
}

function createHumanModel() {
    const group = new THREE.Group();

    // Create a head with a “low-poly” sphere aesthetic
    const headGeometry = new THREE.SphereGeometry(1.2, 12, 8);
    const headMaterial = new THREE.MeshBasicMaterial({
        color: 0x888888,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 3.5;
    group.add(head);

    // Add orbiting “thought orbs” around head
    const thoughtGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        const orbGeom = new THREE.SphereGeometry(0.15, 8, 8);
        const orbMat = new THREE.MeshBasicMaterial({
            color: 0x00FF99,
            transparent: true,
            opacity: 0.7
        });
        const orb = new THREE.Mesh(orbGeom, orbMat);

        // Place them in a ring around the head
        const angle = (i / 5) * Math.PI * 2;
        const radius = 2;
        orb.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        thoughtGroup.add(orb);

        // Animate each orb’s scale pulsation
        gsap.to(orb.scale, {
            x: 1.3,
            y: 1.3,
            z: 1.3,
            duration: 1 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
        });
    }
    thoughtGroup.position.y = 3.5;
    group.add(thoughtGroup);

    // Rotate the entire thought group
    gsap.to(thoughtGroup.rotation, {
        y: "+=6.283",
        duration: 10,
        repeat: -1,
        ease: "none"
    });

    // Torso: Stylized shape from lathe geometry
    const torsoPoints = [];
    for (let i = 0; i <= 10; i++) {
        // y from 0 -> -3, radius from 1 -> 0.3
        const y = -0.3 * i;
        const r = 1 - (i / 10) * 0.7;
        torsoPoints.push(new THREE.Vector2(r, y));
    }
    const torsoGeometry = new THREE.LatheGeometry(torsoPoints, 12);
    const torsoMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 1;
    group.add(torso);

    // Arms made of arcs
    const armGroup = new THREE.Group();
    for (let side of [-1, 1]) {
        const arcShape = new THREE.TorusGeometry(0.9, 0.15, 8, 16, Math.PI);
        const arcMat = new THREE.MeshBasicMaterial({
            color: 0xAAAAAA,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const arc = new THREE.Mesh(arcShape, arcMat);
        arc.rotation.z = side === -1 ? Math.PI / 2 : -Math.PI / 2;
        arc.position.set(side * 1.0, 0.6, 0);
        armGroup.add(arc);
    }
    armGroup.position.y = 1;
    group.add(armGroup);

    // Legs made of two elongated cones
    const legGroup = new THREE.Group();
    for (let side of [-1, 1]) {
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2.5, 8, 1, true);
        const legMaterial = new THREE.MeshBasicMaterial({
            color: 0x888888,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.x = side * 0.5;
        leg.position.y = -2.6;
        leg.rotation.x = -Math.PI / 2;
        legGroup.add(leg);
    }
    group.add(legGroup);

    // Subtle entire rotation
    gsap.to(group.rotation, {
        y: "+=6.283",
        duration: 20,
        repeat: -1,
        ease: "none"
    });

    return group;
}

function createMergedEntity() {
    const group = new THREE.Group();

    // Hybrid shape: a set of swirling curves + partial “body” + partial “monitor”
    // We'll create a large swirl ring that transitions from “human” side to “computer” side
    const swirlGroup = new THREE.Group();
    const swirlMaterial = new THREE.LineBasicMaterial({
        color: 0xFFFF00,
        transparent: true,
        opacity: 0.7
    });
    const swirlGeometry = new THREE.BufferGeometry();
    const swirlPoints = [];
    const swirlSegments = 200;
    for (let i = 0; i <= swirlSegments; i++) {
        const t = i / swirlSegments; 
        const angle = t * Math.PI * 6; // multiple revolutions
        // radius transitions from 1 -> 3 -> 1
        const radius = 1 + 2 * Math.sin(t * Math.PI);
        const x = radius * Math.cos(angle);
        const y = -5 + t * 10;         // swirl from bottom to top
        const z = radius * Math.sin(angle);
        swirlPoints.push(x, y, z);
    }
    swirlGeometry.setAttribute("position", new THREE.Float32BufferAttribute(swirlPoints, 3));
    const swirlLine = new THREE.Line(new THREE.BufferGeometry(), swirlMaterial);
    swirlLine.geometry = swirlGeometry;
    swirlGroup.add(swirlLine);

    // Animate swirl color flicker
    gsap.to(swirlMaterial, {
        opacity: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    group.add(swirlGroup);

    // Hybrid "body" using extruded shape
    const shape = new THREE.Shape();
    shape.moveTo(-1, 0);
    shape.bezierCurveTo(-1.5, 1, -1.5, 3, -0.5, 4);
    shape.bezierCurveTo(0.5, 5, 1.5, 5, 1.5, 3);
    shape.bezierCurveTo(1.5, 1, 0.5, -0.5, -1, 0);
    const extrudeSettings = { depth: 0.2, bevelEnabled: false, steps: 1 };
    const hybridBodyGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const hybridBodyMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FFEE,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const hybridBody = new THREE.Mesh(hybridBodyGeometry, hybridBodyMaterial);
    hybridBody.rotation.x = Math.PI / 2;
    hybridBody.rotation.z = Math.PI / 2;
    hybridBody.position.y = -2;
    group.add(hybridBody);

    // A floating ring to represent the “merged” synergy
    const synergyRingGeometry = new THREE.RingGeometry(0.8, 1.0, 32);
    const synergyRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF00FF,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
    });
    const synergyRing = new THREE.Mesh(synergyRingGeometry, synergyRingMaterial);
    synergyRing.position.y = 2;
    group.add(synergyRing);

    // Animate the synergy ring
    gsap.to(synergyRing.rotation, {
        x: "+=6.283",
        duration: 4,
        repeat: -1,
        ease: "none"
    });
    gsap.to(synergyRing.scale, {
        x: 1.2,
        y: 1.2,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // A subtle overall rotation
    gsap.to(group.rotation, {
        y: "+=6.283",
        duration: 30,
        repeat: -1,
        ease: "none"
    });

    return group;
}

function createParticles() {
    const group = new THREE.Group();

    // Color set with bright neon tints
    const colors = [0xFF00FF, 0x00FFFF, 0xFFFF00, 0xFFAA00];

    for (let i = 0; i < 70; i++) {
        const size = 0.05 + Math.random() * 0.1;
        const particleGeometry = new THREE.SphereGeometry(size, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.2 + Math.random() * 0.5
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        // Random spherical distribution
        const radius = 6 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);

        // Optional rotation variation
        particle.rotation.x = Math.random() * Math.PI;
        particle.rotation.y = Math.random() * Math.PI;

        group.add(particle);

        // Animate random float movement
        gsap.to(particle.position, {
            y: particle.position.y + (Math.random() * 2 - 1),
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random()
        });
    }

    return group;
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
