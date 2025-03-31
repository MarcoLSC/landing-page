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

function setupInitiatives() {
    const initiatives = document.querySelectorAll('.initiative');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const orbitRadius = Math.min(window.innerWidth, window.innerHeight) * 0.38; // Slightly larger orbit
    
    // Calculate golden ratio angle for more natural distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    
    // Position each initiative in orbit
    initiatives.forEach((initiative, index) => {
        // Calculate position in orbit using golden ratio for more harmonic spacing
        const angle = index * goldenAngle;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        
        // Apply position
        initiative.style.left = `${x - (initiative.offsetWidth / 2)}px`;
        initiative.style.top = `${y - (initiative.offsetHeight / 2)}px`;
        
        // Assign unique animation delay for staggered appearance
        initiative.style.animationDelay = `${0.8 + index * 0.2}s`;
        
        // Add orbital animation
        animateInitiative(initiative, angle, index, orbitRadius, centerX, centerY);
    });
}

function animateInitiative(initiative, angle, index, radius, centerX, centerY) {
    // Different parameters for each initiative
    const orbitSpeed = 180000 + (index * 20000); // Slow, gentle orbit (3-4 minute cycle)
    const orbitDirection = index % 2 ? 1 : -1; // Alternate directions
    const floatSpeed = 8000 + (index * 1000); // Gentle floating movement
    const floatDistance = 20 + (index * 3); // Different float distances
    const floatDelay = index * 300; // Staggered animation start
    
    // Initialize current angle
    let currentAngle = angle;
    
    // Create orbital animation
    setTimeout(() => {
        // Orbital movement function
        function orbit() {
            // Update angle
            currentAngle += (0.00003 * orbitDirection);
            
            // Calculate new position
            const x = centerX + Math.cos(currentAngle) * radius;
            const y = centerY + Math.sin(currentAngle) * radius;
            
            // Apply new position
            initiative.style.left = `${x - (initiative.offsetWidth / 2)}px`;
            initiative.style.top = `${y - (initiative.offsetHeight / 2)}px`;
            
            // Continue animation
            requestAnimationFrame(orbit);
        }
        
        // Start orbital movement
        orbit();
        
        // Add floating animation on top of orbit
        initiative.animate([
            { transform: 'translate(0, 0)' },
            { transform: `translate(${Math.sin(index) * floatDistance}px, ${Math.cos(index * 0.7) * floatDistance}px)` },
            { transform: `translate(${Math.cos(index * 0.5) * floatDistance}px, ${Math.sin(index * 0.9) * floatDistance}px)` },
            { transform: 'translate(0, 0)' }
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
    const nodeCount = 120; // Increased node count
    const maxDistance = 180; // Max distance for connections
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.8 + 0.4,
            speed: {
                x: (Math.random() - 0.5) * 0.15,
                y: (Math.random() - 0.5) * 0.15
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
        
        // Get initiative positions for connections
        const initiatives = document.querySelectorAll('.initiative');
        const initiativePositions = [];
        
        initiatives.forEach(initiative => {
            const rect = initiative.getBoundingClientRect();
            initiativePositions.push({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                isInitiative: true,
                color: getComputedStyle(initiative).boxShadow.match(/rgba?\([\d\s,\.]+\)/)[0]
            });
        });
        
        // Add center logo as a node
        const logoElement = document.querySelector('.center-logo');
        const logoRect = logoElement.getBoundingClientRect();
        
        initiativePositions.push({
            x: logoRect.left + logoRect.width / 2,
            y: logoRect.top + logoRect.height / 2,
            isInitiative: true,
            isLogo: true
        });
        
        // Draw connections between initiatives and center
        initiativePositions.forEach(initiative => {
            if (!initiative.isLogo) {
                const logoPos = initiativePositions[initiativePositions.length - 1];
                ctx.beginPath();
                ctx.strokeStyle = initiative.color.replace(/[\d.]+\)$/, '0.1)');
                ctx.lineWidth = 0.8;
                ctx.moveTo(initiative.x, initiative.y);
                ctx.lineTo(logoPos.x, logoPos.y);
                ctx.stroke();
            }
        });
        
        // Update node states (position, pulse)
        nodes.forEach(node => {
            // Update position
            node.x += node.speed.x;
            node.y += node.speed.y;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.speed.x *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speed.y *= -1;
            
            // Update pulse
            node.pulse.current += node.pulse.speed * node.pulse.direction;
            if (node.pulse.current > node.pulse.max || node.pulse.current < node.pulse.min) {
                node.pulse.direction *= -1;
            }
            
            // Draw connections between nodes
            nodes.forEach(otherNode => {
                const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                if (distance < maxDistance && distance > 0) {
                    // Calculate opacity based on distance
                    const opacity = 0.015 * (1 - distance / maxDistance);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                }
            });
            
            // Draw connections to initiatives and center
            initiativePositions.forEach(initiative => {
                const distance = Math.hypot(node.x - initiative.x, node.y - initiative.y);
                const maxInitiativeDistance = initiative.isLogo ? 220 : 140;
                
                if (distance < maxInitiativeDistance) {
                    ctx.beginPath();
                    
                    if (initiative.isLogo) {
                        // Center logo connections are white
                        const opacity = 0.08 * (1 - distance / maxInitiativeDistance) * node.pulse.current;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.6;
                    } else {
                        // Use initiative color
                        const opacity = 0.15 * (1 - distance / maxInitiativeDistance) * node.pulse.current;
                        ctx.strokeStyle = initiative.color.replace(/[\d.]+\)$/, `${opacity})`);
                        ctx.lineWidth = 0.7;
                    }
                    
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(initiative.x, initiative.y);
                    ctx.stroke();
                }
            });
            
            // Draw node with pulsing
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${node.pulse.current})`;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Animation loop
        requestAnimationFrame(drawNetwork);
    }
    
    // Start animation
    drawNetwork();
} 