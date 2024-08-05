var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
likeBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
    const itemId = yield likeBtn.getAttribute("data-item");
    yield console.log(itemId);
    yield axios.post(`http://localhost:3000/wish/regist/${itemId}`);
});
