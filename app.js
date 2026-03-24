
lucide.createIcons();


gsap.registerPlugin(ScrollTrigger);


document.addEventListener('DOMContentLoaded', () => {
    

    const revealElements = document.querySelectorAll('.gs-reveal');
    
    revealElements.forEach((element) => {
        gsap.fromTo(element, 
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });


    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.content');
        const icon = item.querySelector('i[data-lucide="chevron-down"]');
        
        button.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');
            

            faqItems.forEach(otherItem => {
                otherItem.querySelector('.content').classList.add('hidden');
                otherItem.querySelector('i').style.transform = 'rotate(0deg)';
                otherItem.classList.remove('border-white/30');
            });
            
            if (!isOpen) {

                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
                item.classList.add('border-white/30');
            }
        });
    });


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
});
