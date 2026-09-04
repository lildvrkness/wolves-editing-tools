(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (reduce || !fine) return;

    const shell = document.querySelector('.shell');
    if (!shell) return;
    shell.style.transformStyle = 'preserve-3d';
    shell.parentElement && (shell.parentElement.style.perspective = '1200px');

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
