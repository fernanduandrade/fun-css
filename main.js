const cursor = document.getElementById('js-cursor')
const cursorSmall = document.querySelector('.cursor__small')
const dot = document.querySelector('.dot')
const divTest = document.getElementById('teste')

let mouseX = 0, mouseY = 0
let cursorX = 0, cursorY = 0
let dotX = 0, dotY = 0

const easingFactorCursor = 0.15
const easingFactorDot = 0.25

let animationId
function animateCursor() {
    cursorX += (mouseX - cursorX) * easingFactorCursor
    cursorY += (mouseY - cursorY) * easingFactorCursor

    dotX += (mouseX - dotX) * easingFactorDot
    dotY += (mouseY - dotY) * easingFactorDot

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
    dot.style.transform = `translate(${dotX}px, ${dotY}px)`
    animationId = requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

[...document.querySelectorAll('.flow')].forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
        cancelAnimationFrame(animationId)
        target = e.currentTarget;
        dot.classList.add('dot-merging');
        const rect = target.getBoundingClientRect();
        dot.classList.remove('dot')
        dot.classList.add('dot_2')
        dot.style.width = `${rect.width}px`;
        dot.style.height = `${rect.height}px`;
        dot.style.borderRadius = '0px'
        dot.style.padding = '5px';
        dot.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
        cursor.style.display = `none`
        cursorSmall.style.display = 'none'

        target.style.cursor = 'pointer'
        target.style.border = '6px white solid'
        target.style.transition = 'ease .1s';
    });
});

[...document.querySelectorAll('.flow')].forEach(function (item) {
    item.addEventListener('mouseleave', function (e) {
        dot.classList.remove('dot-merging');
        animationId = requestAnimationFrame(animateCursor);
        cursor.style.display = `block`
        cursorSmall.style.display = 'block'
        dot.classList.remove('dot_2')
        dot.classList.add('dot')
        dot.style.width = '10px'
        dot.style.height = '10px'
        dot.style.borderRadius = '50%'
    });
});
animateCursor()
