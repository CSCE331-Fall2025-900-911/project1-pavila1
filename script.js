document.addEventListener("DOMContentLoaded", () => {
  const introInput = document.getElementById("intro-input");
  const introOutput = document.getElementById("intro-output");
  const browserFrame = document.getElementById("browser-frame");
  const loadingOverlay = document.getElementById("loading-overlay");
  const welcomeP = document.querySelector("#terminal-intro .welcome-message-text");
  const proceedP = document.querySelector("#terminal-intro .terminal-body p:nth-of-type(2)");
  const indexPage = document.getElementById("index-page");
  const toggleStyleBtn = document.getElementById("toggle-style-btn");
  const cssLink = document.getElementById("theme-style");
  const loadingGif = document.getElementById("loading-gif");

  let isTyping = false;
  let currentStyle = sessionStorage.getItem("currentStyle") || "style2";

  // 🔧 Custom icon swap
  function updateCustomIcons(styleName) {
    const isStyle1 = styleName === "style1";

    // About Me Icon
    const aboutMeIcon = document.getElementById("about-me-icon");
    if (aboutMeIcon) {
      aboutMeIcon.src = isStyle1
        ? "https://i.pinimg.com/736x/8e/42/a6/8e42a61fb4310135aa9b49895365b53d.jpg" // Style 1
        : "https://i.pinimg.com/736x/5d/4d/4f/5d4d4fac73031fd4510169439fc4c804.jpg"; // Style 2
    }
    const projectsIcon = document.getElementById("projects-icon");
  if (projectsIcon) {
    projectsIcon.src = isStyle1
      ? "https://i.pinimg.com/1200x/3e/51/8f/3e518fa032ed9bb8007d4a423d66225e.jpg" // Style 1
      : "https://i.pinimg.com/736x/3a/74/f9/3a74f9b4f85e336ade4aac263dbf8480.jpg"; // Style 2
  }
    const serviceIcon = document.getElementById("service-icon");
  if (serviceIcon) {
    serviceIcon.src = isStyle1
      ? "https://i.pinimg.com/736x/21/44/6b/21446ba8b6ed773beb340c39b568a1b2.jpg" // Style 1
      : "https://i.pinimg.com/736x/99/7f/55/997f554e995e8ae2994d9a434090f0eb.jpg"; // Style 2
  }
    const qualificationsIcon = document.getElementById("qualifications-icon");
  if (qualificationsIcon) {
    qualificationsIcon.src = isStyle1
      ? "https://i.pinimg.com/736x/9a/e2/86/9ae286aa11281a83fbda0e8dc3324c98.jpg" // Style 1
      : "https://i.pinimg.com/736x/87/6d/14/876d140cd60b2fdc68dc3d4f51c8b1fa.jpg"; // Style 2
  }
  const genaiIcon = document.getElementById("genai-icon");
  if (genaiIcon) {
    genaiIcon.src = isStyle1
      ? "https://i.pinimg.com/736x/63/32/27/633227365ff79e5f63e1a5c56133f7e0.jpg" // Style 1
      : "https://i.pinimg.com/736x/3d/a1/4c/3da14cd64a005d4c4536bb68c556df98.jpg"; // Style 2
  }
    const mailIcon = document.getElementById("mail-icon");
  if (mailIcon) {
    mailIcon.src = isStyle1
      ? "https://i.pinimg.com/736x/34/1c/69/341c692fb4fad9c46274f2adf1e06b51.jpg" // Style 1
      : "https://i.pinimg.com/736x/81/42/6c/81426c950b50f514d1a1148736600268.jpg"; // Style 2
  }
}
  

  function applyStyle(styleName) {
    currentStyle = styleName;
    cssLink.href = styleName + ".css";
    sessionStorage.setItem("currentStyle", currentStyle);

    if (loadingGif) {
      loadingGif.src =
        styleName === "style1"
          ? "https://i.pinimg.com/originals/05/bf/b1/05bfb13dbad7c8f3815c723d4c0c34be.gif"
          : "https://i.pinimg.com/originals/2a/2b/ce/2a2bce0f8c0efa1042428363bb4fa3d3.gif";
    }

    // ✅ Update icons whenever theme changes
    updateCustomIcons(styleName);
  }

  function toggleStyles() {
    const newStyle = currentStyle === "style2" ? "style1" : "style2";
    applyStyle(newStyle);
    if (introOutput) {
      introOutput.innerHTML += `<p>Style switched to ${newStyle}!</p>`;
    }
  }

  function hideLoadingOverlay() {
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 1000);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("page") === "dashboard") {
    if (loadingOverlay) loadingOverlay.style.display = "none";
    if (indexPage) indexPage.style.display = "flex";
    sessionStorage.removeItem("navigationStartTime");
  } else {
    window.addEventListener("load", () => {
      const navigationStartTime = sessionStorage.getItem("navigationStartTime");
      const minimumDisplayTime = 1000;

      if (navigationStartTime) {
        const timeElapsed = Date.now() - parseInt(navigationStartTime, 10);
        const timeToWait = Math.max(0, minimumDisplayTime - timeElapsed);

        setTimeout(() => {
          hideLoadingOverlay();
          if (document.getElementById("terminal-intro")) {
            showTerminal();
          }
        }, timeToWait);

        sessionStorage.removeItem("navigationStartTime");
      } else {
        setTimeout(() => {
          const isFirstVisit = !sessionStorage.getItem("navigationStartTime");
          if (isFirstVisit) {
            hideLoadingOverlay();
            showTerminal();
          }
        }, 3000);
      }
    });
  }

  function typeWriter(message, element, callback) {
    isTyping = true;
    element.innerHTML = "";
    let charIndex = 0;

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
    if (browserFrame) browserFrame.style.display = "flex";
    if (welcomeP && proceedP) {
      const welcomeMessage = "Welcome to my website";
      const proceedMessage = "Type 'enter' to proceed.";
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

  window.showLoadingAndNavigate = function (url) {
    sessionStorage.setItem("navigationStartTime", Date.now());
    if (loadingOverlay) {
      loadingOverlay.style.display = "flex";
      loadingOverlay.style.opacity = "1";
    }
    window.location.href = url;
  };

  if (introInput) {
    introInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = introInput.value.trim().toLowerCase();
        const commandOutput = document.createElement("p");
        commandOutput.innerHTML = `<span class="prompt-text">></span> <span class="typed-command">${command}</span>`;
        if (introOutput) introOutput.appendChild(commandOutput);
        introInput.value = "";

        if (!isTyping) {
          if (command === "enter") {
            if (loadingOverlay) {
              loadingOverlay.style.display = "flex";
              loadingOverlay.style.opacity = "1";
            }
            setTimeout(() => {
              if (browserFrame) browserFrame.style.display = "none";
              if (indexPage) indexPage.style.display = "flex";
              hideLoadingOverlay();
            }, 1000);
          } else if (command === "help") {
            if (introOutput) {
              introOutput.innerHTML += `
                <div class="help-message-container">
                    <p>--- HELP ---</p>
                    <p>To view the site, type '<span class="prompt-text">enter</span>'.</p>
                    <p>For more information, type '<span class="prompt-text">info</span>'.</p>
                    <p>To clear the terminal, type '<span class="prompt-text">clear</span>'.</p>
                    <p>To toggle styles, type '<span class="prompt-text">style</span>'.</p>
                    <p>To see this list of commands again, type '<span class="prompt-text">help</span>'.</p>
                </div>`;
            }
          } else if (command === "info") {
            if (introOutput) {
              introOutput.innerHTML += `<p>This is my personal website built with HTML, CSS, and JavaScript.</p>`;
            }
          } else if (command === "style") {
            toggleStyles();
          } else if (command === "clear") {
            if (introOutput) {
              const children = introOutput.children;
              for (let i = children.length - 1; i >= 2; i--) {
                introOutput.removeChild(children[i]);
              }
            }
          } else {
            if (introOutput) {
              introOutput.innerHTML += `<p style="color: var(--text-error);">Error: Command not found. Type '<span class="prompt-text">help</span>' for a list of commands.</p>`;
            }
          }
        }
        if (introOutput) introOutput.scrollTop = introOutput.scrollHeight;
      }
    });
  }

  if (toggleStyleBtn) {
    toggleStyleBtn.addEventListener("click", toggleStyles);
  }

  window.showHomepage = function () {
    showLoadingAndNavigate("index.html?page=dashboard");
  };

  // ✅ Ensure About Me icon is set correctly on first load
  updateCustomIcons(currentStyle);
});
