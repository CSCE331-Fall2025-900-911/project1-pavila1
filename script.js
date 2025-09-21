document.addEventListener('DOMContentLoaded', () => {
    const introInput = document.getElementById('intro-input');
    const introOutput = document.getElementById('intro-output');
    const browserFrame = document.getElementById('browser-frame');
    const loadingOverlay = document.getElementById('loading-overlay');
    const welcomeP = document.querySelector('#terminal-intro .welcome-message-text');
    const proceedP = document.querySelector('#terminal-intro .terminal-body p:nth-of-type(2)');
    const indexPage = document.getElementById('index-page');
    const toggleStyleBtn = document.getElementById('toggle-style-btn');

    const welcomeMessage = "Welcome to my website";
    const proceedMessage = "Type 'enter' to proceed.";
    let charIndex = 0;
    let isTyping = false;

    // Show loading overlay on page load
    loadingOverlay.style.display = 'flex';

    // Wait a bit before showing the terminal
    setTimeout(showTerminal, 3000); // 3 seconds delay for loading screen

    function typeWriter(message, element, callback) {
        isTyping = true;
        element.innerHTML = '';
        charIndex = 0;

        function type() {
            if (charIndex < message.length) {
                element.innerHTML += message.charAt(charIndex);
                charIndex++;
                setTimeout(type, 70);
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }
        type();
    }

    function showTerminal() {
        loadingOverlay.style.display = 'none';
        if (browserFrame) browserFrame.style.display = 'flex';
        
        if (welcomeP && proceedP) {
            typeWriter(welcomeMessage, welcomeP, () => {
                typeWriter(proceedMessage, proceedP, () => {
                    if (introInput) {
                        introInput.disabled = false;
                        introInput.focus();
                    }
                });
            });
        }
    }

    if (introInput) {
        introInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = introInput.value.trim().toLowerCase();
                
                const commandOutput = document.createElement('p');
                commandOutput.innerHTML = `<span class="prompt-text">></span> ${command}`;
                if (introOutput) introOutput.appendChild(commandOutput);
                
                introInput.value = '';

                if (!isTyping) {
                    if (command === 'enter') {
                        if (browserFrame) browserFrame.style.display = 'none';
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'flex';
                            loadingOverlay.style.opacity = '1';
                        }

                        setTimeout(() => {
                            if (loadingOverlay) loadingOverlay.style.opacity = '0';
                            setTimeout(() => {
                                if (loadingOverlay) loadingOverlay.style.display = 'none';
                                if (indexPage) indexPage.style.display = 'flex';
                            }, 1000);
                        }, 3000);
                    } else if (command === 'help') {
                        const helpMessage = `
                            <p>--- HELP ---</p>
                            <p>To view the site, type '<span class="prompt-text">enter</span>'.</p>
                            <p>For more information, type '<span class="prompt-text">info</span>'.</p>
                            <p>To clear the terminal, type '<span class="prompt-text">clear</span>'.</p>
                            <p>To see this list of commands again, type '<span class="prompt-text">help</span>'.</p>
                        `;
                        if (introOutput) introOutput.innerHTML += helpMessage;
                    } else if (command === 'info') {
                        const infoMessage = `<p>This is my personal website filled with skills as HTML, CSS, and JavaScript.</p>`;
                        if (introOutput) introOutput.innerHTML += infoMessage;
                    } else if (command === 'clear') {
                        if (introOutput) introOutput.innerHTML = '';
                        showTerminal();
                    } else {
                        const errorMessage = `<p style="color: var(--text-error);">Error: Command not found. Type '<span class="prompt-text">help</span>' for a list of commands.</p>`;
                        if (introOutput) introOutput.innerHTML += errorMessage;
                    }
                }
                
                if (introOutput) introOutput.scrollTop = introOutput.scrollHeight;
            }
        });
    }
    
    if (toggleStyleBtn) {
        toggleStyleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light-theme');
            const desktopContainer = document.querySelector('.desktop-container');
            if (desktopContainer) {
                desktopContainer.classList.toggle('light-theme-bg');
            }
        });
    }

    // Function to handle switching to other pages
    window.showPage = function(pageId) {
        const desktopContainer = document.getElementById('index-page');
        const targetPage = document.getElementById(pageId);
        
        if (desktopContainer) desktopContainer.style.display = 'none';
        if (targetPage) targetPage.style.display = 'flex';
    }

    // Function to handle returning to the terminal
    window.goBackToTerminal = function() {
        const desktopContainer = document.getElementById('index-page');
        const browserFrame = document.getElementById('browser-frame');

        if (desktopContainer) desktopContainer.style.display = 'none';
        if (browserFrame) browserFrame.style.display = 'flex';
        
        showTerminal();
    }
});