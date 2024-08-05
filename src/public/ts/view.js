const smallImgBoxes = document.querySelectorAll(".small-img-box");
smallImgBoxes.forEach((el) => {
    el.onclick = (e) => {
        const preview = document.getElementById("preview");
        const target = e.target;
        smallImgBoxes.forEach((el) => {
            el.style.border = '2px solid gray';
        });
        target.parentElement.style.border = '4px solid gray';
        preview.src = target.src;
    };
});
const likeBtn = document.getElementById("likeBtn");
likeBtn.onclick = async () => {
    const itemId = await likeBtn.getAttribute("data-item");
    await console.log(itemId);
    await axios.post(`http://localhost:3000/wish/regist/${itemId}`);
};
//# sourceMappingURL=view.js.map