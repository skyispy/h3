const header = document.querySelector("header");
document.addEventListener("scroll", () => {
    header.style.position = "fixed";
    document.querySelector(".blank-box").style.display = "block";
    if (window.scrollY === 0) {
        header.style.position = "inherit";
        document.querySelector(".blank-box").style.display = "none";
    }
});

const logoutBtn = document.getElementById("logOut");
logoutBtn.onclick = () => {
    axios.post("http://localhost:3000/user/logout").then((res) => {
        location.href = 'http://localhost:3000';
    });
}
//# sourceMappingURL=header.js.map