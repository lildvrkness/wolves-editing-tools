(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (reduce || !fine) return;

    const layers = Array.from(document.querySelectorAll('[data-parallax], .wolf-bg, .pack-wolf'));
    const shell = document.querySelector('.shell');

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax') || el.dataset.parallax || '22');
            const x = nx * speed;
            const y = ny * (speed * 0.7);
            if (el.classList.contains('wolf-bg') && getComputedStyle(el).left.includes('%')) {
                el.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
            } else {
                el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            }
        });
    });

    if (!shell) return;
    shell.style.transformStyle = 'preserve-3d';
    if (shell.parentElement) shell.parentElement.style.perspective = '1200px';
    shell.addEventListener('pointermove', (e) => {
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        shell.style.transform = 'rotateX(' + ((0.5 - py) * 5) + 'deg) rotateY(' + ((px - 0.5) * 7) + 'deg)';
    });
    shell.addEventListener('pointerleave', () => { shell.style.transform = ''; });
})();
