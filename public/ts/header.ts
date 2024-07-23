const header = document.getElementById("header") as HTMLDivElement;
document.addEventListener("scroll", () => {
    header.style.position = "fixed";
    if(window.scrollY === 0) return header.style.position = "inherit"; 
});

// document.addEventListener("scrollend", () => {
//     console.log(window.scrollY)
// })