const header = document.querySelector("header");
document.addEventListener("scroll", () => {
    header.style.position = "fixed";
    document.querySelector(".blank-box").style.display = "block";
    if (window.scrollY === 0) {
        header.style.position = "inherit";
        document.querySelector(".blank-box").style.display = "none";
    }
});
//# sourceMappingURL=header.js.map