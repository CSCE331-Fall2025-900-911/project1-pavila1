// --- THE BRAIN OF THE OPERATION ---
// Grab all the important bits from the HTML so we can play with them.
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
const iconGrid = document.querySelector('.icon-grid');
// Page Navigation Elements
const comingSoonPage = document.getElementById('coming-soon-page');
const comingSoonTitle = document.getElementById('coming-soon-title');
const comingSoonBackButton = document.getElementById('coming-soon-back-button');
const pageLinks = document.querySelectorAll('.page-link');

// Window Page Elements
const aboutMePage = document.getElementById('about-me-page');
const resumePage = document.getElementById('resume-page'); 

// NEW: Theme switcher checkbox
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
            }, 3000);
        }, 1000);
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

// --- PAGE NAVIGATION WIZARDRY ---
function showPage(pageElement) {
    iconGrid.classList.add('opacity-0');
    setTimeout(() => {
        iconGrid.style.display = 'none';
        pageElement.classList.remove('hidden');
        setTimeout(() => { pageElement.style.opacity = '1'; }, 10);
    }, 500);
}

function hidePage(pageElement) {
    pageElement.style.opacity = '0';
    setTimeout(() => {
        pageElement.classList.add('hidden');
        iconGrid.style.display = 'grid';
        setTimeout(() => { iconGrid.classList.remove('opacity-0'); }, 10);
    }, 500);
}

pageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const pageTitle = this.dataset.pageTitle;
        
        if (pageTitle === 'About Me') {
            showPage(aboutMePage);
        } else if (pageTitle === 'Resume') { // NEW
            showPage(resumePage);
        }else {
            comingSoonTitle.textContent = `${pageTitle} - Coming Soon`;
            showPage(comingSoonPage);
        }
    });
});

comingSoonBackButton.addEventListener('click', () => hidePage(comingSoonPage));

// --- WINDOWS 95 MODE ACTIVATED (FOR ALL WINDOWS) ---
function initializeWindow(windowId) {
    const windowPane = document.getElementById(windowId);
    if (!windowPane) return;

    const header = windowPane.querySelector('.window-header');
    const body = windowPane.querySelector('.resume-body, .about-me-body');
    const minimizeBtn = header.querySelector('.minimize');
    const maximizeBtn = header.querySelector('.maximize');
    const closeBtn = header.querySelector('.close');
    const pageContainer = document.getElementById(closeBtn.dataset.page);

    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-control-btn')) return;
        isDragging = true;
        offsetX = e.clientX - windowPane.offsetLeft;
        offsetY = e.clientY - windowPane.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowPane.style.left = `${e.clientX - offsetX}px`;
            windowPane.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    closeBtn.addEventListener('click', () => hidePage(pageContainer));

    maximizeBtn.addEventListener('click', () => {
         windowPane.classList.toggle('maximized');
    });

    minimizeBtn.addEventListener('click', () => {
        const isMinimized = body.style.display === 'none';
        body.style.display = isMinimized ? '' : 'none';
        if (!isMinimized) {
            windowPane.dataset.originalHeight = windowPane.style.height;
            windowPane.style.height = header.offsetHeight + 'px';
            windowPane.style.resize = 'none';
        } else {
            windowPane.style.height = windowPane.dataset.originalHeight || '';
            windowPane.style.resize = 'both';
        }
    });
}

initializeWindow('about-me-window');
initializeWindow('resume-window'); 

// --- NEW: THEME SWITCHER LOGIC ---
themeSwitchCheckbox.addEventListener('change', () => {
    mainContent.classList.toggle('theme-light');
});


// --- LET THERE BE LIGHT! ---
window.onload = () => {
    runLoadingSequence();
};