gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();

    // Animaciones scroll
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach((element) => {
        gsap.fromTo(element,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.content');

        button.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.content').classList.add('hidden');
                otherItem.querySelector('button').lastElementChild.style.transform = 'rotate(0deg)';
                otherItem.classList.remove('border-white/30');
            });
            if (!isOpen) {
                content.classList.remove('hidden');
                button.lastElementChild.style.transform = 'rotate(180deg)';
                item.classList.add('border-white/30');
            }
        });
    });

    // Navbar scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('border-b', 'border-white/10');
            nav.classList.remove('border-white/5');
        } else {
            nav.classList.remove('border-white/10');
            nav.classList.add('border-white/5');
        }
    });

    // Menú mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    function toggleMenu(force) {
        menuOpen = force !== undefined ? force : !menuOpen;
        mobileMenu.classList.toggle('hidden', !menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        menuBtn.innerHTML = `<i id="mobile-menu-icon" data-lucide="${menuOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>`;
        lucide.createIcons({ nodes: [menuBtn] });
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', () => toggleMenu());
    }

    // Cerrar al clickear un link del menú
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Cerrar al clickear el fondo oscuro
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu || e.target === mobileMenu.firstElementChild) {
                toggleMenu(false);
            }
        });
    }

    // Formulario Formspree
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitText.textContent = 'Enviando...';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(function(res) {
                if (res.ok) {
                    form.style.display = 'none';
                    successMsg.classList.remove('hidden');
                } else {
                    submitText.textContent = 'Error al enviar. Intentá de nuevo.';
                    submitBtn.disabled = false;
                }
            })
            .catch(function() {
                submitText.textContent = 'Sin conexión. Intentá de nuevo.';
                submitBtn.disabled = false;
            });
        });
    }

    // Email protegido — construido en JS para evadir bots
    const u = 'siteflowuy';
    const d = 'gmail.com';
    const mail = u + '@' + d;

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
        const a = document.createElement('a');
        a.href = 'mailto:' + mail;
        a.textContent = mail;
        a.className = 'hover:text-white transition-colors';
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'mail');
        icon.className = 'w-4 h-4 mr-2 flex-shrink-0';
        a.prepend(icon);
        footerEmail.appendChild(a);
        lucide.createIcons({ nodes: [a] });
    }

    const contactEmail = document.getElementById('contact-email');
    const contactEmailText = document.getElementById('contact-email-text');
    if (contactEmail && contactEmailText) {
        contactEmail.href = 'mailto:' + mail;
        contactEmailText.textContent = mail;
    }

    // WhatsApp flotante — aparece a los 5s
    setTimeout(function() {
        const btn = document.getElementById('whatsapp-float');
        if (btn) btn.style.opacity = '1';
    }, 5000);

});
