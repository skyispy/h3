const smallImgBoxes = document.querySelectorAll(".small-img-box");
smallImgBoxes.forEach((el: HTMLDivElement) => {
    el.onclick = (e) => {
        const preview = document.getElementById("preview") as HTMLImageElement;
        const target = e.target as HTMLImageElement;
        smallImgBoxes.forEach((el: HTMLDivElement) => {
            el.style.border = '2px solid gray';
        })
        target.parentElement.style.border = '4px solid gray';
        preview.src = target.src;
    }
})

const likeBtn = document.getElementById("likeBtn") as HTMLButtonElement;
likeBtn.onclick = async () => {
    const itemId = await likeBtn.getAttribute("data-item");
    await console.log(itemId);
    await axios.post(`http://localhost:3000/wish/regist/${itemId}`);
}