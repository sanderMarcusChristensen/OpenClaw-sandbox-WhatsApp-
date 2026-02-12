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
        alert(`Level Up! ${statName.charAt(0).toUpperCase() + statName.slice(1)} is now level ${stat.level}!`);
    }
    updateDisplay(statName);
    saveProgress();
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
}

function resetProgress() {
    for (let statName in stats) {
        stats[statName] = { level: 1, xp: 0, xpNeeded: 100 };
        updateDisplay(statName);
    }
    saveProgress();
}

window.onload = loadProgress;
