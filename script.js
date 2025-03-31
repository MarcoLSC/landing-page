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
        description: 'Lindy represents our commitment to long-lasting knowledge frameworks. We are building systems where humans and AI collaborate not just as tools, but as extensions of human cognition, continuously adapting to your evolving understanding.'
    },
    'Capybara': {
        color: 'var(--purple)',
        description: 'In a world mediated by AI understanding, digital presence must evolve. Capybara reimagines how we represent ourselves online, crafting meaning from our digital footprints. We\'re creating systems that understand context beyond keywords, comprehending the resonance of ideas.'
    },
    'Minary': {
        color: 'var(--lightblue)',
        description: 'Current information architecture is built around static forms of data. Minary restructures work around meaning and intention, allowing for dynamic organization that learns and evolves with your thinking process, freeing ideas from rigid formats.'
    },
    'Suddenly': {
        color: 'var(--salmon)',
        description: 'Some transformations happen gradually, then suddenly. We identify critical leverage points where AI can catalyze profound change, enabling quiet revolutions in how we think, create, and solve problems collectively.'
    },
    'Human Intelligence': {
        color: 'var(--red)',
        description: 'The most profound technologies disappear into use. We are pursuing the art of frictionless interaction between humans and intelligent systems—where the boundaries blur and cognitive enhancement feels natural, intuitive, and profoundly human.'
    },
    'Solid Intelligence': {
        color: 'var(--black)',
        description: 'We envision a future where intelligence is ambient—embedded in objects, environments, and systems. Not calling attention to itself, but silently augmenting human capability, like oxygen for thought, enabling new forms of collective cognition.'
    }
};

function setupInitiatives() {
    const initiatives = document.querySelectorAll('.initiative');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const orbitRadius = Math.min(window.innerWidth, window.innerHeight) * 0.35; // Responsive orbit
    
    // Position each initiative in orbit
    initiatives.forEach((initiative, index) => {
        // Calculate position in orbit
        const angle = (index * ((2 * Math.PI) / initiatives.length)) + (Math.random() * 0.2 - 0.1);
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;
        
        // Apply position
        initiative.style.left = `${x - (initiative.offsetWidth / 2)}px`;
        initiative.style.top = `${y - (initiative.offsetHeight / 2)}px`;
        
        // Assign unique animation delay
        initiative.style.animationDelay = `${index * 0.2}s`;
        
        // Add slight animation to each initiative
        animateInitiative(initiative, x, y, index);
    });
}

function animateInitiative(initiative, baseX, baseY, index) {
    // Different parameters for each initiative
    const speed = 10000 + (index * 2000); // Different speeds
    const distance = 30 + (index * 5); // Different travel distances
    const delay = index * 200; // Staggered starts
    
    // Create orbit animation
    setTimeout(() => {
        // Add a gentle floating animation
        initiative.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${Math.sin(index) * distance}px, ${Math.cos(index * 0.7) * distance}px)` },
            { transform: `translate(${Math.cos(index * 0.5) * distance}px, ${Math.sin(index * 0.9) * distance}px)` },
            { transform: `translate(0, 0)` }
        ], {
            duration: speed,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }, delay);
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
            
            // Show modal
            modal.classList.add('active');
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
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
    
    // Neural network nodes
    const nodes = [];
    const nodeCount = 100;
    const maxDistance = 150; // Max distance for connections
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2
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
                color: getComputedStyle(initiative).borderColor
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
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.speed.x;
            node.y += node.speed.y;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.speed.x *= -1;
            if (node.y < 0 || node.y > canvas.height) node.speed.y *= -1;
            
            // Draw connections between nodes
            nodes.forEach(otherNode => {
                const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                if (distance < maxDistance && distance > 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.stroke();
                }
            });
            
            // Draw connections to initiatives
            initiativePositions.forEach(initiative => {
                const distance = Math.hypot(node.x - initiative.x, node.y - initiative.y);
                const maxInitiativeDistance = initiative.isLogo ? 200 : 100;
                
                if (distance < maxInitiativeDistance) {
                    ctx.beginPath();
                    
                    if (initiative.isLogo) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / maxInitiativeDistance)})`;
                    } else {
                        // Use initiative color
                        const color = initiative.color || 'rgba(255, 255, 255, 0.1)';
                        ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${0.15 * (1 - distance / maxInitiativeDistance)})`);
                    }
                    
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(initiative.x, initiative.y);
                    ctx.stroke();
                }
            });
            
            // Draw node
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.1})`;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Animation loop
        requestAnimationFrame(drawNetwork);
    }
    
    // Start animation
    drawNetwork();
} 