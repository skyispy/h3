const swapBtn = document.querySelectorAll(".controller > span");
swapBtn.forEach((el) => {
    el.onclick = () => {
        const shopBox = document.querySelector(".shop-box");
        const wishListBox = document.querySelector(".wishlist-box");
        const reviewBox = document.querySelector(".review-box");
        shopBox.style.display = "none";
        wishListBox.style.display = "none";
        reviewBox.style.display = "none";
        const swapName = el.innerHTML.split(" ")[0];
        switch (swapName) {
            case swapBtn[0].innerHTML.split(" ")[0]:
                shopBox.style.display = "grid";
                console.log(1);
                break;
            case swapBtn[1].innerHTML.split(" ")[0]:
                wishListBox.style.display = "grid";
                break;
            case swapBtn[2].innerHTML.split(" ")[0]:
                reviewBox.style.display = "block";
                break;
            default:
                break;
        }
    };
});
//# sourceMappingURL=profile.js.map