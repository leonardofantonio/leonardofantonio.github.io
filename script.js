let buffs = {
    1: {
        duration: 10, // duração em segundos
        onCooldown: false
    },
    2: {
        duration: 10, // duração em segundos
        onCooldown: false
    }
    // Adicione mais buffs conforme necessário
};

function useBuff(buffId) {
    if (!buffs[buffId].onCooldown) {
        let cooldownTime = prompt("Insira o tempo de cooldown em segundos:", "30");
        if (cooldownTime != null) {
            activateBuff(buffId, parseInt(cooldownTime));
        }
    } else {
        alert("Buff está em cooldown!");
    }
}

function activateBuff(buffId, cooldownTime) {
    const buff = buffs[buffId];
    buff.onCooldown = true;

    const cooldownTimeElement = document.getElementById(`buff${buffId}-cooldown-time`);
    cooldownTimeElement.innerText = cooldownTime;

    const cooldownElement = document.getElementById(`buff${buffId}-cooldown`);
    const notificationElement = document.getElementById(`buff${buffId}-notification`);

    // Mostrar sobreposição de cooldown
    cooldownElement.style.visibility = "visible";
    notificationElement.style.visibility = "hidden";

    let elapsed = 0;

    const interval = setInterval(() => {
        elapsed += 1;
        let remainingCooldown = cooldownTime - elapsed;
        cooldownTimeElement.innerText = remainingCooldown;

        if (remainingCooldown <= 0) {
            clearInterval(interval);
            cooldownElement.style.visibility = "hidden";
            notificationElement.style.visibility = "visible";
            buff.onCooldown = false;

            // Mostrar popup
            showPopup();

            // Tocar som
            playSound();
        }
    }, 1000);
}

function showPopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    popup.style.display = "block";
    overlay.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    popup.style.display = "none";
    overlay.style.display = "none";
}

function playSound() {
    const sound = document.getElementById("alertSound");
    sound.play();
}