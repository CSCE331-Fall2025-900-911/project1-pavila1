document.addEventListener('DOMContentLoaded', () => {
    const introInput = document.getElementById('intro-input');
    const introOutput = document.getElementById('intro-output');
    const browserFrame = document.getElementById('browser-frame');
    const indexPage = document.getElementById('index-page');
    const loadingOverlay = document.getElementById('loading-overlay');

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
        browserFrame.style.display = 'flex';
        
        const welcomeP = document.getElementById('welcome-message-text');
        const proceedP = document.getElementById('proceed-message');

        if (welcomeP && proceedP) {
            typeWriter(welcomeMessage, welcomeP, () => {
                typeWriter(proceedMessage, proceedP, () => {
                    introInput.disabled = false;
                    introInput.focus();
                });
            });
        }
    }

    if (introInput) {
        introInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = introInput.value.trim().toLowerCase();
                introInput.value = '';
                if (!isTyping) {
                    if (command === 'enter' || command === '') {
                        browserFrame.style.display = 'none';
                        indexPage.style.display = 'flex';
                    } else if (command === 'help') {
                        const helpMessage = `
                            <p>--- HELP ---</p>
                            <p>To view the site, type '<span class="prompt-text">enter</span>'.</p>
                            <p>For more information, type '<span class="prompt-text">info</span>'.</p>
                            <p>To clear the terminal, type '<span class="prompt-text">clear</span>'.</p>
                        `;
                        const outputElement = document.getElementById('intro-output');
                        if(outputElement) {
                            outputElement.innerHTML += helpMessage;
                            outputElement.scrollTop = outputElement.scrollHeight;
                        }
                    } else if (command === 'info') {
                        const infoMessage = `<p>This is my personal website filled with skills as HTML, CSS, and JavaScript.</p>`;
                        const outputElement = document.getElementById('intro-output');
                        if(outputElement) {
                            outputElement.innerHTML += infoMessage;
                            outputElement.scrollTop = outputElement.scrollHeight;
                        }
                    } else if (command === 'clear') {
                        const outputElement = document.getElementById('intro-output');
                        if (outputElement) {
                            outputElement.innerHTML = '';
                        }
                        showTerminal();
                    } else {
                        const errorP = document.createElement('p');
                        errorP.style.color = 'var(--text-error)';
                        errorP.textContent = `Error: Command not found. Type 'help' for a list of commands.`;
                        const outputElement = document.getElementById('intro-output');
                        if(outputElement) {
                            outputElement.innerHTML += errorP.outerHTML;
                            outputElement.scrollTop = outputElement.scrollHeight;
                        }
                    }
                }
            }
        });
    }

    const toggleStyleBtn = document.getElementById('toggle-style-btn');
    if (toggleStyleBtn) {
        toggleStyleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light-theme');
            const desktopContainer = document.querySelector('.desktop-container');
            if (desktopContainer) {
                desktopContainer.classList.toggle('light-theme-bg');
            }
        });
    }
});