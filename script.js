document.addEventListener('DOMContentLoaded', () => {
    // Set up initiatives positions and animation
    setupInitiatives();
    
    // Set up neural network canvas
    setupNeuralNetwork();
    
    // Set up modal interactions
    setupModal();
});

// Modal content for each initiative
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

// Store initiative positions and sizes for collision detection
const initiativePositions = [];
const bubbleSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bubble-size'));
const BUBBLE_BUFFER = 30; // Minimum space between bubbles

function setupInitiatives() {
    const initiatives = document.querySelectorAll('.initiative');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate appropriate orbit radius based on screen size and number of initiatives
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    const baseOrbitRadius = minDimension * 0.38;
    
    // Adjust orbit based on screen size to prevent edge collisions
    let orbitRadius = baseOrbitRadius;
    if (window.innerWidth < 768) {
        orbitRadius = minDimension * 0.32;
    }
    
    // Use Fibonacci angle for more even bubble placement
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Clear previous positions
    initiativePositions.length = 0;
    
    // First pass: Calculate positions
    const initialPositions = [];
    initiatives.forEach((initiative, index) => {
        // Calculate position in orbit using golden ratio for more harmonic spacing
        const angle = index * goldenAngle;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        
        initialPositions.push({
            index,
            angle,
            x,
            y,
            width: bubbleSize,
            height: bubbleSize
        });
    });
    
    // Second pass: Check for overlaps and adjust if needed
    let iterations = 0;
    const maxIterations = 20;
    let hasOverlap = true;
    
    // Fine-tune positions to avoid overlaps
    while (hasOverlap && iterations < maxIterations) {
        hasOverlap = false;
        
        for (let i = 0; i < initialPositions.length; i++) {
            for (let j = i + 1; j < initialPositions.length; j++) {
                const pos1 = initialPositions[i];
                const pos2 = initialPositions[j];
                
                // Check distance between bubbles
                const dx = pos2.x - pos1.x;
                const dy = pos2.y - pos1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (pos1.width + pos2.width) / 2 + BUBBLE_BUFFER;
                
                // If overlapping, adjust positions
                if (distance < minDistance) {
                    hasOverlap = true;
                    
                    // Calculate the amount of overlap
                    const overlap = minDistance - distance;
                    
                    // Direction vector between bubbles
                    const dirX = dx / distance;
                    const dirY = dy / distance;
                    
                    // Move bubbles apart along the direction vector
                    const moveAmount = overlap / 2;
                    initialPositions[i].x -= dirX * moveAmount;
                    initialPositions[i].y -= dirY * moveAmount;
                    initialPositions[j].x += dirX * moveAmount;
                    initialPositions[j].y += dirY * moveAmount;
                }
            }
        }
        
        iterations++;
    }
    
    // Apply positions and start animations
    initiatives.forEach((initiative, index) => {
        const position = initialPositions[index];
        
        // Apply non-overlapping position
        initiative.style.left = `${position.x - (bubbleSize / 2)}px`;
        initiative.style.top = `${position.y - (bubbleSize / 2)}px`;
        
        // Store final position for neural network connections
        initiativePositions.push({
            element: initiative,
            x: position.x,
            y: position.y,
            width: bubbleSize,
            height: bubbleSize,
            angle: position.angle
        });
        
        // Assign unique animation delay for staggered appearance
        initiative.style.animationDelay = `${0.8 + index * 0.2}s`;
        
        // Add orbital animation
        animateInitiative(initiative, position, index, orbitRadius, centerX, centerY);
    });
}

function animateInitiative(initiative, position, index, radius, centerX, centerY) {
    // Different parameters for each initiative
    const orbitPeriod = 180000 + (index * 20000); // Slow, gentle orbit (3-4 minute cycle)
    const orbitDirection = index % 2 ? 1 : -1; // Alternate directions
    const floatSpeed = 8000 + (index * 1000); // Gentle floating movement
    const floatDistance = 15 + (index * 2); // Different float distances - reduced to minimize overlap
    const floatDelay = index * 300; // Staggered animation start
    
    // Initialize current angle
    let currentAngle = position.angle;
    const bubbleRadius = bubbleSize / 2;
    
    // Create orbital animation
    setTimeout(() => {
        // Orbital movement function
        function orbit() {
            // Update angle very slightly
            currentAngle += (0.00002 * orbitDirection);
            
            // Calculate new position
            const newX = centerX + Math.cos(currentAngle) * radius;
            const newY = centerY + Math.sin(currentAngle) * radius;
            
            // Check for collisions with other initiatives
            let hasCollision = false;
            for (const pos of initiativePositions) {
                if (pos.element === initiative) continue;
                
                const dx = newX - pos.x;
                const dy = newY - pos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If too close, don't update position this frame
                if (distance < bubbleSize + BUBBLE_BUFFER) {
                    hasCollision = true;
                    break;
                }
            }
            
            // If no collision, update position
            if (!hasCollision) {
                // Apply new position
                initiative.style.left = `${newX - bubbleRadius}px`;
                initiative.style.top = `${newY - bubbleRadius}px`;
                
                // Update stored position
                const posIndex = initiativePositions.findIndex(p => p.element === initiative);
                if (posIndex !== -1) {
                    initiativePositions[posIndex].x = newX;
                    initiativePositions[posIndex].y = newY;
                }
            }
            
            // Continue animation
            requestAnimationFrame(orbit);
        }
        
        // Start orbital movement
        orbit();
        
        // Add floating animation on top of orbit
        initiative.animate([
            { transform: 'translate3d(0, 0, 0)' },
            { transform: `translate3d(${Math.sin(index) * floatDistance}px, ${Math.cos(index * 0.7) * floatDistance}px, ${Math.sin(index * 0.5) * 8}px)` },
            { transform: `translate3d(${Math.cos(index * 0.5) * floatDistance}px, ${Math.sin(index * 0.9) * floatDistance}px, ${Math.cos(index * 0.7) * 8}px)` },
            { transform: 'translate3d(0, 0, 0)' }
        ], {
            duration: floatSpeed,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }, floatDelay);
}

function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const initiatives = document.querySelectorAll('.initiative');
    
    // Open modal when clicking on an initiative
    initiatives.forEach(initiative => {
        initiative.addEventListener('click', () => {
            const name = initiative.dataset.name;
            const details = initiativeDetails[name];
            
            // Set modal content
            document.getElementById('modal-title').textContent = name;
            document.getElementById('modal-description').textContent = details.description;
            document.getElementById('modal-title').style.color = details.color;
            
            // Show modal with fade-in effect
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500); // Match transition duration
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    });
}

function setupNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        setupInitiatives(); // Reposition initiatives
    });
    
    resizeCanvas();
    
    // Neural network nodes and connections
    const nodes = [];
    const nodeCount = 130; // Increased node count
    const maxDistance = 180; // Max distance for normal connections
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 100 - 50, // 3D Z position
            radius: Math.random() * 1.8 + 0.4,
            speed: {
                x: (Math.random() - 0.5) * 0.15,
                y: (Math.random() - 0.5) * 0.15,
                z: (Math.random() - 0.5) * 0.05  // Slow z-axis movement
            },
            opacity: 0.05 + Math.random() * 0.15,
            pulse: {
                speed: 0.005 + Math.random() * 0.01,
                min: 0.05 + Math.random() * 0.1,
                max: 0.15 + Math.random() * 0.2,
                current: 0.05 + Math.random() * 0.15,
                direction: Math.random() > 0.5 ? 1 : -1
            }
        });
    }

    // Draw neural network
    function drawNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get center logo position 
        const logoElement = document.querySelector('.center-logo');
        const logoRect = logoElement.getBoundingClientRect();
        const centerNode = {
            x: logoRect.left + logoRect.width / 2,
            y: logoRect.top + logoRect.height / 2,
            isLogo: true
        };
        
        // Draw direct lines connecting each initiative to center 
        // This ensures lines don't overlay the bubbles themselves
        initiativePositions.forEach(initiative => {
            const rect = initiative.element.getBoundingClientRect();
            const bubbleCenterX = rect.left + rect.width / 2;
            const bubbleCenterY = rect.top + rect.height / 2;
            
            // Get color from initiative
            const color = getComputedStyle(initiative.element).getPropertyValue('--' + initiative.element.dataset.color);
            
            // Calculate vector from bubble to center
            const dx = centerNode.x - bubbleCenterX;
            const dy = centerNode.y - bubbleCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Normalize vector
            const nx = dx / distance;
            const ny = dy / distance; 
            
            // Calculate points that start at bubble edge and end at center logo edge
            const bubbleRadius = rect.width / 2;
            const logoRadius = logoRect.width / 2;
            
            // Start point: just outside the bubble
            const startX = bubbleCenterX + nx * (bubbleRadius + 5);
            const startY = bubbleCenterY + ny * (bubbleRadius + 5);
            
            // End point: just before the logo
            const endX = centerNode.x - nx * (logoRadius + 5);
            const endY = centerNode.y - ny * (logoRadius + 5);
            
            // Draw line with gradient
            const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, color.replace(/[^,]+(?=\))/, '0.4'));
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Add a pulsing particle along the connection
            const particlePosition = Math.sin(Date.now() / 2000 + initiative.angle) * 0.5 + 0.5;
            const particleX = startX + (endX - startX) * particlePosition;
            const particleY = startY + (endY - startY) * particlePosition;
            
            ctx.beginPath();
            ctx.fillStyle = color.replace(/[^,]+(?=\))/, '0.8');
            ctx.arc(particleX, particleY, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Update node states (position, pulse)
        nodes.forEach(node => {
            // Update position
            node.x += node.speed.x;
            node.y += node.speed.y;
            node.z += node.speed.z;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.speed.x *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speed.y *= -1;
            if (node.z < -50 || node.z > 50) node.speed.z *= -1;
            
            // Update pulse
            node.pulse.current += node.pulse.speed * node.pulse.direction;
            if (node.pulse.current > node.pulse.max || node.pulse.current < node.pulse.min) {
                node.pulse.direction *= -1;
            }
            
            // Calculate visual radius based on Z position (3D effect)
            const depthFactor = (node.z + 50) / 100; // 0 to 1 based on z-position
            const visualRadius = node.radius * (0.5 + depthFactor);
            
            // Draw connections between nodes - fewer connections for better performance
            nodes.forEach((otherNode, index) => {
                // Only connect to every third node to reduce connections
                if (index % 3 !== 0) return;
                
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const dz = node.z - otherNode.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < maxDistance && distance > 0) {
                    // Calculate opacity based on distance and z-position
                    const distanceFactor = 1 - distance / maxDistance;
                    const depthEffect = ((node.z + otherNode.z) / 2 + 50) / 100; // 0 to 1
                    const opacity = 0.02 * distanceFactor * (0.5 + depthEffect);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.2 + 0.3 * depthEffect;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                }
            });
            
            // Draw connections to initiatives
            initiativePositions.forEach(initiative => {
                const rect = initiative.element.getBoundingClientRect();
                const initiativeX = rect.left + rect.width / 2;
                const initiativeY = rect.top + rect.height / 2;
                
                const dx = node.x - initiativeX;
                const dy = node.y - initiativeY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const bubbleRadius = rect.width / 2;
                const maxInitiativeDistance = 140;
                
                if (distance < maxInitiativeDistance && distance > bubbleRadius + 5) {
                    // Get color from initiative
                    const color = getComputedStyle(initiative.element).getPropertyValue('--' + initiative.element.dataset.color);
                    
                    // Calculate opacity based on distance and pulse
                    const opacity = 0.15 * (1 - distance / maxInitiativeDistance) * node.pulse.current;
                    
                    ctx.beginPath();
                    ctx.strokeStyle = color.replace(/[^,]+(?=\))/, `${opacity}`);
                    ctx.lineWidth = 0.5 * depthFactor;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(initiativeX, initiativeY);
                    ctx.stroke();
                }
            });
            
            // Draw connections to center logo
            const dx = node.x - centerNode.x;
            const dy = node.y - centerNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxLogoDistance = 220;
            const logoRadius = logoRect.width / 2;
            
            if (distance < maxLogoDistance && distance > logoRadius + 5) {
                // Center logo connections are white
                const opacity = 0.1 * (1 - distance / maxLogoDistance) * node.pulse.current;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.6 * depthFactor;
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(centerNode.x, centerNode.y);
                ctx.stroke();
            }
            
            // Draw node with pulsing and 3D effect
            ctx.beginPath();
            const nodeOpacity = node.pulse.current * (0.7 + depthFactor * 0.3);
            ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`;
            ctx.arc(node.x, node.y, visualRadius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Animation loop
        requestAnimationFrame(drawNetwork);
    }
    
    // Start animation
    drawNetwork();
} 