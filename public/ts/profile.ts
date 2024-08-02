const historyBtn = document.getElementById("historyBtn");
historyBtn.onclick = () => {
    location.href = "http://localhost:3000/user/history";
}

const editBtn = document.getElementById("editBtn");
editBtn.onclick = () => {
    
}

const swapBtn = document.querySelectorAll(".controller > span");
swapBtn.forEach((el: HTMLSpanElement) => {
    el.onclick = () => {
        const shopBox = document.querySelector(".shop-box") as HTMLDivElement;
        const wishListBox = document.querySelector(".wishlist-box") as HTMLDivElement;
        const reviewBox = document.querySelector(".review-box") as HTMLDivElement;
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
    }
})