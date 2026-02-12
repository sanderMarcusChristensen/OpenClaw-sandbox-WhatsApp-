const stats = {
    strength: { level: 1, xp: 0, xpNeeded: 100 },
    intelligence: { level: 1, xp: 0, xpNeeded: 100 },
    creativity: { level: 1, xp: 0, xpNeeded: 100 },
    social: { level: 1, xp: 0, xpNeeded: 100 }
};

function addXP(statName, xp) {
    const stat = stats[statName];
    stat.xp += xp;
    if (stat.xp >= stat.xpNeeded) {
        stat.xp -= stat.xpNeeded;
        stat.level++;
        stat.xpNeeded += 100;
        createFireworks(statName);
    }
    updateDisplay(statName);
    saveProgress();
}

function createFireworks(statName) {
    const colors = {
        strength: 'rgba(76, 175, 80,',
        intelligence: 'rgba(33, 150, 243,',
        creativity: 'rgba(156, 39, 176,',
        social: 'rgba(255, 152, 0,'
    };
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const statDiv = document.getElementById(statName).getBoundingClientRect();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: statDiv.left + statDiv.width / 2,
            y: statDiv.top,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            alpha: 1
        });
    }
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.alpha -= 0.01;
            if (particle.alpha <= 0) particles.splice(index, 1);
            context.fillStyle = colors[statName] + particle.alpha + ')';
            context.beginPath();
            context.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            context.fill();
        });
        if (particles.length > 0) requestAnimationFrame(draw);
        else document.body.removeChild(canvas);
    }
    draw();
    alertLevelUp(statName);
}

function alertLevelUp(statName) {
    const message = document.createElement('div');
    message.textContent = 'Level Up!';
    message.style.position = 'absolute';
    message.style.left = '50%';
    message.style.top = '50px';
    message.style.transform = 'translateX(-50%)';
    message.style.fontSize = '24px';
    message.style.color = '#FFF';
    document.body.appendChild(message);
    setTimeout(() => document.body.removeChild(message), 2000);
}

function updateDisplay(statName) {
    const statDiv = document.getElementById(statName);
    const stat = stats[statName];
    const progressPercent = (stat.xp / stat.xpNeeded) * 100;
    statDiv.querySelector('.level').textContent = stat.level;
    statDiv.querySelector('.xp').textContent = stat.xp;
    statDiv.querySelector('.progress').style.width = `${progressPercent}%`;
    updateTotalLevel();
}

function updateTotalLevel() {
    const totalLevel = Object.values(stats).reduce((acc, stat) => acc + stat.level, 0);
    document.getElementById('total-level').textContent = totalLevel;
}

function saveProgress() {
    localStorage.setItem('rpgStats', JSON.stringify(stats));
}

function loadProgress() {
    const savedStats = JSON.parse(localStorage.getItem('rpgStats'));
    if (savedStats) {
        Object.assign(stats, savedStats);
        for (let statName in stats) {
            updateDisplay(statName);
        }
    }
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', theme === 'light');
}

function resetProgress() {
    for (let statName in stats) {
        stats[statName] = { level: 1, xp: 0, xpNeeded: 100 };
        updateDisplay(statName);
    }
    saveProgress();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}

window.onload = loadProgress;
