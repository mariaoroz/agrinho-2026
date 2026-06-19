document.addEventListener("DOMContentLoaded", () => {
    initFadeAnimation();
    initSmoothScroll();
    initActiveNav();
    initButtonEffects();
    initCardInteractions();
    initFormValidation();
    initStatsAnimation();
});

function initFadeAnimation() {
    const fadeElements = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    fadeElements.forEach((element) => observer.observe(element));
}

function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveLink() {
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
}

function initButtonEffects() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.style.boxShadow = "0 15px 35px rgba(56,189,248,0.45)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.boxShadow = "0 10px 30px rgba(14,165,233,0.35)";
        });

        button.addEventListener("click", () => {
            button.style.transform = "scale(0.98)";

            setTimeout(() => {
                button.style.transform = "";
            }, 150);
        });
    });
}

function initCardInteractions() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("selected");
        });
    });
}

function initFormValidation() {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = form.querySelector('input[name="nome"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="mensagem"]');

        const nome = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const mensagem = messageInput ? messageInput.value.trim() : "";

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Digite um e-mail válido.");
            return;
        }

        alert("Formulário enviado com sucesso.");
        form.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initStatsAnimation() {
    const statNumbers = document.querySelectorAll(".stat h3");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateStat(entry.target);
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach((stat) => observer.observe(stat));
}

function animateStat(element) {
    const originalText = element.textContent.trim();

    const numberMatch = originalText.match(/\d+/);
    if (!numberMatch) return;

    const target = parseInt(numberMatch[0], 10);
    const prefix = originalText.startsWith("+") ? "+" : "";
    const suffix = originalText.includes("%") ? "%" : "";

    let current = 0;
    const duration = 1500;
    const increment = Math.max(1, Math.ceil(target / 60));
    const intervalTime = Math.floor(duration / (target / increment));

    const counter = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(counter);
        }

        element.textContent = `${prefix}${current}${suffix}`;
    }, intervalTime);
}
