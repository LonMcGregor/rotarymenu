class RotaryMenu extends HTMLElement {}
class MenuWedge extends HTMLElement {}

customElements.define("rotary-menu", RotaryMenu);
customElements.define("menu-wedge", MenuWedge);

function createWedge(angle, height, radius, rotation, content){
/*
       <- angle ->
       ___________
       \         /   ^
        \       /    | height
         \_____/     v
                      ^
                      | radius
                      v
            x ¬ rotation

*/
    const w = document.createElement("menu-wedge");
    w.style.height = height + 'px';
    w.style.width = angle + 'px';
    w.innerText = content;

    const x = radius * Math.cos(rotation * (Math.PI / 180));
    const y = radius * Math.sin(rotation * (Math.PI / 180));

    w.style.transform = `translate(${x}px, ${y}px)`; // rotateY would change the contents as well

    return w;
}

function createMenu(x, y) {
    try{
        document.body.removeChild(document.querySelector("rotary-menu"));
    } catch {}

    let menuItems = [];
    for (let i = 0; i < document.querySelector("#number").value; i++) {
        menuItems.push(i);
    }

    const n = menuItems.length;
    const pad = 10;
    const angle = (360 - (pad * n)) / n;

    const menu = document.createElement("rotary-menu");

    const h = document.querySelector("#height").value;
    const r = document.querySelector("#radius").value;

    let currentAngle = 0;
    for (const item of menuItems) {
        menu.appendChild(createWedge(angle,h,r,currentAngle,item));
        currentAngle += pad + angle;
    }

    menu.style.top = y+'px';
    menu.style.left = x+'px';

    document.body.appendChild(menu);
}

document.querySelector("img").addEventListener("pointerup", e => {
    createMenu(e.clientX, e.clientY);
});
