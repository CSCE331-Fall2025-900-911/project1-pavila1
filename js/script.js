// --- THE BRAIN OF THE OPERATION ---
const terminal = document.getElementById('terminal');
const loadingScreen = document.getElementById('loading-screen');
const loadingLog = document.getElementById('loading-log');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const interactiveSection = document.getElementById('interactive-section');
const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const terminalContainer = document.getElementById('terminal-container');
const mainContent = document.getElementById('main-content');
const loadingGifContainer = document.getElementById('loading-gif-container');
const themeSwitchCheckbox = document.getElementById('theme-checkbox');

// --- THE FAKE LOADING TEXT ---
const loadingSteps = [
    { text: "Initializing system...", delay: 200 },
    { text: "Connecting to mainframe...", delay: 300 },
    { text: "Decrypting access codes...", delay: 250 },
    { text: "Compiling assets...", delay: 400 },
    { text: "Boot sequence complete.", delay: 150 },
];

// --- LOADING FINALE ---
function finishLoading() {
    loadingScreen.classList.add('hidden');
    interactiveSection.classList.remove('hidden');
    const welcomeMsg = document.createElement('div');
    welcomeMsg.innerHTML = `Welcome. Type '<span class="text-pink">help</span>' for available commands.`;
    outputDiv.appendChild(welcomeMsg);
    commandInput.focus();
}

// --- RUN THE LOADING SHOW ---
function runLoadingSequence(step = 0) {
    if (step >= loadingSteps.length) {
        setTimeout(finishLoading, 300);
        return;
    }
    const currentStep = loadingSteps[step];
    const logEntry = document.createElement('div');
    logEntry.textContent = currentStep.text;
    loadingLog.appendChild(logEntry);
    const progress = ((step + 1) / loadingSteps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Loading... ${Math.round(progress)}%`;
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(() => runLoadingSequence(step + 1), currentStep.delay);
}

// --- THE BIG BOOK OF COMMANDS ---
const commands = {
    'help': `Available commands: <span class="text-pink">help</span>, <span class="text-pink">about</span>, <span class="text-pink">clear</span>, <span class="text-pink">enter</span>`,
    'about': 'This terminal is a gateway to my personal space on the web. Built with pure HTML, CSS, and JS.',
    'clear': () => {
        outputDiv.innerHTML = `Welcome. Type '<span class="text-pink">help</span>' for available commands.`;
        return ''; 
    },
    'enter': () => {
        // This function now handles the transition from terminal to the icon grid
        terminalContainer.classList.add('opacity-0');
        setTimeout(() => {
            terminalContainer.classList.add('hidden');
            loadingGifContainer.classList.remove('hidden');
            setTimeout(() => loadingGifContainer.classList.add('opacity-100'), 10);
            setTimeout(() => {
                loadingGifContainer.classList.remove('opacity-100');
                setTimeout(() => {
                    loadingGifContainer.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    setTimeout(() => mainContent.classList.add('opacity-100'), 10);
                }, 500);
            }, 3000); // GIF display time
        }, 1000); // Fade out time
        return 'Accessing secure page... Welcome.';
    }
};

// --- HEY, LISTEN! (FOR THE 'ENTER' KEY) ---
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim().toLowerCase();
        const commandOutput = document.createElement('div');
        commandOutput.innerHTML = `<span class="prompt">&gt;&nbsp;</span>${command}`;
        outputDiv.appendChild(commandOutput);
        handleCommand(command);
        commandInput.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }
});

// --- THE COMMAND INTERPRETER ---
function handleCommand(command) {
    const response = document.createElement('div');
    if (commands[command]) {
        const result = commands[command];
        response.innerHTML = (typeof result === 'function') ? result() : result;
    } else if (command === '') {
        return;
    } else {
        response.innerHTML = `Command not found: <span class="text-error">${command}</span>. Type 'help' for commands.`;
    }
    if (response.innerHTML) {
         outputDiv.appendChild(response);
    }
}

// --- THEME SWITCHER LOGIC (For future use) ---
themeSwitchCheckbox.addEventListener('change', () => {
    mainContent.classList.toggle('theme-light');
});


// --- LET THERE BE LIGHT! ---
window.onload = () => {
    runLoadingSequence();
};