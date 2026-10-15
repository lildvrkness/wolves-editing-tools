```javascript
(function () {
    'use strict';

    // Respect accessibility and device capabilities.
    if (
        !window.matchMedia ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches
    ) {
        return;
    }

    if (!document.body || document.body.classList.contains('no-fx')) {
        return;
    }

    // Prepare background and wolf image layers.
    const layers = Array.from(
        document.querySelectorAll('[data-parallax], .wolf-bg, .pack-wolf')
    );

    layers.forEach(function (el) {
        if (el.tagName === 'IMG') {
            el.decoding = 'async';
            el.loading = 'lazy';
            el.draggable = false;
        }
    });

    // Mouse-based parallax effect.
    let nx = 0;
    let ny = 0;
    let pending = false;

    function paint() {
        pending = false;

        layers.forEach(function (el) {
            const rawSpeed = parseFloat(
                el.getAttribute('data-parallax') || '22'
            );

            const speed = Number.isFinite(rawSpeed) ? rawSpeed : 22;
            const x = nx * speed;
            const y = ny * speed * 0.65;

            // Preserve the centered positioning of the wolf background.
            if (
                el.classList.contains('wolf-bg') &&
                el.style.left &&
                el.style.left.includes('%')
            ) {
                el.style.transform =
                    'translate(calc(-50% + ' + x + 'px), calc(-50% + ' +
                    y + 'px))';
            } else {
                el.style.transform =
                    'translate3d(' + x + 'px, ' + y + 'px, 0)';
            }
        });
    }

    window.addEventListener(
        'pointermove',
        function (event) {
            if (event.pointerType !== 'mouse') return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            if (!width || !height) return;

            nx = event.clientX / width - 0.5;
            ny = event.clientY / height - 0.5;

            if (!pending) {
                pending = true;
                window.requestAnimationFrame(paint);
            }
        },
        { passive: true }
    );

    // Stop here if tilt is disabled or the shell does not exist.
    const shell = document.querySelector('.shell');

    if (!shell || document.body.classList.contains('no-tilt')) {
        return;
    }

    // Mouse tilt effect.
    shell.style.transformStyle = 'preserve-3d';

    if (shell.parentElement) {
        shell.parentElement.style.perspective = '1200px';
    }

    shell.addEventListener(
        'pointermove',
        function (event) {
            if (event.pointerType !== 'mouse') return;

            const rect = shell.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;

            const rotateX = (0.5 - py) * 3.5;
            const rotateY = (px - 0.5) * 5;

            shell.style.transform =
                'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        },
        { passive: true }
    );

    shell.addEventListener('pointerleave', function () {
        shell.style.transform = '';
    });
})();
```
