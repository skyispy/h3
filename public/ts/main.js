let count = 0;
const slideAnimation = () => {
    const hideSlideBox = document.querySelectorAll(`#slide-${(count % 6)} > .slide-box`);
    const showSlideBox = document.querySelectorAll(`#slide-${(count + 1) % 6} > .slide-box`);
    hideSlideBox.forEach((el) => {
        el.parentElement.style.display = "none";
        el.classList.remove("slide-animation");
    });
    showSlideBox.forEach((el) => {
        el.parentElement.style.display = "flex";
        el.classList.add("slide-animation");
    });
    const controllers = document.querySelectorAll(".slide-controller > span");
    const grayController = document.getElementById(`stick-${(count + 1) % 6}`);
    controllers.forEach((el) => {
        el.style.backgroundColor = "black";
    });
    grayController.style.backgroundColor = "gray";
    count++;
};
let slide = setInterval(slideAnimation, 6000);
const controllers = document.querySelectorAll(".slide-controller > span");
controllers.forEach((el) => {
    el.onclick = () => {
        clearInterval(slide);
        count = parseInt(el.id.split("-")[1]);
        console.log(count);
        slideInit();
        slideAnimation();
        slide = setInterval(slideAnimation, 6000);
        const controllers = document.querySelectorAll(".slide-controller > span");
        controllers.forEach((el) => {
            el.style.backgroundColor = "black";
        });
        el.style.backgroundColor = "gray";
    };
});
const slideInit = () => {
    const slideBoxes = document.querySelectorAll(".slide-boxes");
    for (let i = 0; i < slideBoxes.length; i++) {
        slideBoxes[i].style.display = "none";
        slideBoxes[i].classList.remove("slide-animation");
    }
};
//# sourceMappingURL=main.js.map