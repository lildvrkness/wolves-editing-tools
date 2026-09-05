(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer:fine)').matches;
    if (reduce || !fine) return;
    if (document.body.classList.contains('no-fx')) return;

    const layers = Array.from(document.querySelectorAll('[data-parallax], .wolf-bg, .pack-wolf'));
    layers.forEach((el) => {
        el.decoding = 'async';
        el.loading = 'lazy';
        el.draggable = false;
    });

    const shell = document.querySelector('.shell');
    let nx = 0, ny = 0, pending = false;

    function paint() {
        pending = false;
        layers.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax') || '22');
            const x = nx * speed;
            const y = ny * (speed * 0.65);
            if (el.classList.contains('wolf-bg') && el.style.left && el.style.left.indexOf('%') !== -1) {
                el.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
            } else {
                el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
            }
        });
    }

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        nx = e.clientX / window.innerWidth - 0.5;
        ny = e.clientY / window.innerHeight - 0.5;
        if (!pending) {
            pending = true;
            requestAnimationFrame(paint);
        }
    }, { passive: true });

    if (!shell || document.body.classList.contains('no-tilt')) return;
    shell.style.transformStyle = 'preserve-3d';
    if (shell.parentElement) shell.parentElement.style.perspective = '1200px';
    shell.addEventListener('pointermove', (e) => {
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        shell.style.transform = 'rotateX(' + ((0.5 - py) * 3.5) + 'deg) rotateY(' + ((px - 0.5) * 5) + 'deg)';
    });
    shell.addEventListener('pointerleave', () => { shell.style.transform = ''; });
})();
