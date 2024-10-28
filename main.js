const cursor = document.getElementById('js-cursor')
const cursorSmall = document.querySelector('.cursor__small')
const dot = document.querySelector('.dot')

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

function onMouseDrag(e) {
    let getContainerStyle = window.getComputedStyle(container);
    let leftValue = parseInt(getContainerStyle.left);
    let topValue = parseInt(getContainerStyle.top);
    container.style.left = `${leftValue + movementX}px`;
    container.style.top = `${topValue + movementY}px`;
}

[...document.querySelectorAll('.flow')].forEach(function (item) {
    function onMouseDrag({ movementX, movementY }) {
        let getStyle = window.getComputedStyle(item);
        let leftValue = parseInt(getStyle.left);
        let topValue = parseInt(getStyle.top);
        item.style.left = `${leftValue + movementX}px`;
        item.style.top = `${topValue + movementY}px`;
    }

    function leaveElement(e) {
        dot.classList.remove('dot-merging');
        animationId = requestAnimationFrame(animateCursor);
        cursor.style.display = `block`
        cursorSmall.style.display = 'block'
        dot.classList.remove('dot_2')
        dot.classList.add('dot')
        dot.style.width = '10px'
        dot.style.height = '10px'
        dot.style.borderRadius = '50%'
    }

    item.addEventListener("mousedown", () => {
        item.addEventListener("mousemove", onMouseDrag)
        item.removeEventListener("moueleave", leaveElement)
    });

    document.addEventListener("mouseup", () => {
        item.removeEventListener("mousemove", onMouseDrag)
        item.addEventListener("moueleave", leaveElement)
    });

    item.addEventListener('mouseenter', function (e) {
        console.log(e)
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

        target.style.cursor = 'grab'
        target.style.border = '6px white solid'
        target.style.transition = 'ease .1s';
    });

});

animateCursor()
