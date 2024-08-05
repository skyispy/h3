const header = document.querySelector("header");
document.addEventListener("scroll", () => {
    header.style.position = "fixed";
    (document.querySelector(".blank-box") as HTMLDivElement).style.display = "block";
    if(window.scrollY === 0) {
        header.style.position = "inherit"; 
    (document.querySelector(".blank-box") as HTMLDivElement).style.display = "none";
    }
});

// document.addEventListener("scrollend", () => {
//     console.log(window.scrollY)
// })
