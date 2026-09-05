(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (reduce || !fine) return;

    const wolfBg = document.querySelector('.wolf-bg');
    const shell = document.querySelector('.shell');

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        if (wolfBg) {
            const x = (e.clientX / window.innerWidth - 0.5) * 28;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;
            wolfBg.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        }
    });

    if (!shell) return;
    shell.style.transformStyle = 'preserve-3d';
    if (shell.parentElement) shell.parentElement.style.perspective = '1200px';

    shell.addEventListener('pointermove', (e) => {
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 5;
        const ry = (px - 0.5) * 7;
        shell.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    shell.addEventListener('pointerleave', () => { shell.style.transform = ''; });
})();
