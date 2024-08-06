const readURL = (input) => {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("preview").style.display = "none";
            document.querySelector(".example-box").style.display = "block";
            document.getElementById("preview").src = e.target.result;
            console.log(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        document.getElementById("preview").src = "";
    }
};
const clickImgBox = () => {
    const imgBoxes = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    for (let i = 0; i < imgBoxes.length; i++) {
        imgBoxes[i].onclick = () => {
            for (let b = 0; b < imgBoxes.length; b++) {
                imgBoxes[b].style.border = "1px solid rgb(179, 179, 179)";
            }
            imgBoxes[i].style.border = "4px solid rgb(97, 96, 96)";
            console.log(imgBoxes[i].children[0]);
            document.getElementById("preview").style.display = "block";
            document.querySelector(".example-box").style.display = "none";
            document.getElementById("preview").src = imgBoxes[i].children[0].src;
        };
    }
};
const addImgBtn = document.getElementById("addImgBtn");
addImgBtn.onclick = () => {
    const exImgBoxes = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    if (exImgBoxes.length < 5) {
        const previewImg = document.getElementById("preview").src;
        const img = document.createElement("img");
        const imgBox = document.createElement("div");
        const deleteBtn = document.createElement("button");
        imgBox.className = "img-box";
        img.src = `${previewImg}`;
        imgBox.append(img, deleteBtn);
        deleteBtn.innerHTML = "x";
        document.querySelector(".img-boxes").append(imgBox);
        document.getElementById("preview").style.display = "block";
        document.querySelector(".example-box").style.display = "none";
        exImgBoxes.forEach((el) => {
            el.style.border = "1px solid rgb(179, 179, 179)";
        });
        imgBox.style.border = "4px solid rgb(97, 96, 96)";
        document.getElementById("max-count").innerHTML = `최대 ${exImgBoxes.length + 1} / 5 개`;
        deleteBtn.onclick = () => {
            imgBox.remove();
            document.getElementById("max-count").innerHTML = `최대 ${parseInt(document.getElementById("max-count").innerHTML.split(" ")[1]) - 1} / 5 개`;
        };
        clickImgBox();
    }
};
const assignBtn = document.getElementById("assignBtn");
assignBtn.onclick = () => {
    const images = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    const imageArr = [];
    for (let i = 0; i < images.length; i++) {
        imageArr.push(images[i].children[0].src);
    }
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    const selectBrand = document.getElementById("brand");
    const selectCategory = document.getElementById("category");
    const priceInput = document.getElementById("priceInput");
    console.log(imageArr);
    const object = {
        title: titleInput.value,
        content: contentInput.value,
        brand: selectBrand.value,
        category: selectCategory.value,
        price: priceInput.value,
        img: imageArr
    };
    if (object.img.length !== 0 && object.title && object.content && object.brand && object.category && object.price) {
        axios.post("http://localhost:3000/item/registItem", object).then((res) => {
            console.log(res);
        }).catch((error) => {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            }
            else if (error.request) {
                console.error('Error request:', error.request);
            }
            else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        });
        console.log('성공');
    }
    else {
        console.log(object.img.length);
        if (object.img.length === 0) {
            console.log("이미지 입력바람");
        }
        if (!object.title) {
            console.log("제목 입력바람");
        }
        if (!object.content) {
            console.log("내용 입력바람");
        }
        if (!object.brand) {
            console.log("브랜드 입력바람");
        }
        if (!object.category) {
            console.log("카테고리 입력바람");
        }
        if (!object.price) {
            console.log("가격 입력바람");
        }
    }
};
//# sourceMappingURL=assign.js.map