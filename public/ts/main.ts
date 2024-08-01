// slide
let count = 0;
const slideAnimation = () => {
    const hideSlideBox = document.querySelectorAll(`#slide-${(count % 6)} > .slide-box`);
    const showSlideBox = document.querySelectorAll(`#slide-${(count + 1) % 6} > .slide-box`);
    hideSlideBox.forEach((el: HTMLDivElement) => {
        el.parentElement.style.display = "none";
        el.classList.remove("slide-animation");
    });
    showSlideBox.forEach((el: HTMLDivElement) => {
        el.parentElement.style.display = "flex";
        el.classList.add("slide-animation");
    });
    count++;
};

let slide = setInterval(slideAnimation, 8000);

const controllers = document.querySelectorAll(".slide-controller > span");
console.log(controllers)
controllers.forEach((el: HTMLSpanElement) => {
    el.onclick = () => {
        clearInterval(slide);
        count = parseInt(el.id.split("-")[1]);
        console.log(count);
        slideInit();
        slideAnimation();
        slide = setInterval(slideAnimation, 8000);
        const controllers = document.querySelectorAll(".slide-controller > span");
        controllers.forEach((el: HTMLSpanElement) => {
            el.style.backgroundColor = "black";
        })
        el.style.backgroundColor = "gray";
    }
})

const slideInit = () => {
    const slideBoxes = document.querySelectorAll(".slide-boxes");
    for(let i = 0; i < slideBoxes.length; i++) {
        (slideBoxes[i] as HTMLDivElement).style.display = "none";
        (slideBoxes[i] as HTMLDivElement).classList.remove("slide-animation");
    }
}