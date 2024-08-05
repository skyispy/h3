// 이미지 미리보기
const readURL = (input) => {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            (document.getElementById("preview") as HTMLImageElement).style.display = "none";
            (document.querySelector(".example-box") as HTMLDivElement).style.display = "block";
            (document.getElementById("preview") as any).src = e.target.result;
            console.log(e.target.result)
        }
        // (document.getElementById("preview") as HTMLImageElement).style.display = "block";
        // (document.querySelector(".example-box") as HTMLDivElement).style.display = "none";
        reader.readAsDataURL(input.files[0]);
    } else {
        (document.getElementById("preview") as HTMLImageElement).src = "";
    }
}

const clickImgBox = () => {
    const imgBoxes = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    for(let i = 0; i < imgBoxes.length; i++) {
       (imgBoxes[i] as HTMLDivElement).onclick = () => {
            for(let b = 0; b < imgBoxes.length; b++) {
                (imgBoxes[b] as HTMLDivElement).style.border = "1px solid rgb(179, 179, 179)";
            }
            (imgBoxes[i] as HTMLDivElement).style.border = "4px solid rgb(97, 96, 96)";
            console.log((imgBoxes[i] as HTMLDivElement).children[0]);
            (document.getElementById("preview") as HTMLImageElement).style.display = "block";
            (document.querySelector(".example-box") as HTMLDivElement).style.display = "none";
            (document.getElementById("preview") as HTMLImageElement).src = ((imgBoxes[i] as HTMLDivElement).children[0] as any).src;
        }
    }
}

const addImgBtn = document.getElementById("addImgBtn") as HTMLButtonElement;

addImgBtn.onclick = () => {
    const exImgBoxes = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    if(exImgBoxes.length < 5){
        const previewImg = (document.getElementById("preview") as HTMLImageElement).src;
        const img = document.createElement("img");
        const imgBox = document.createElement("div");
        const deleteBtn = document.createElement("button");
        imgBox.className = "img-box";
        img.src = `${previewImg}`;
        imgBox.append(img, deleteBtn);
        deleteBtn.innerHTML = "x"
        document.querySelector(".img-boxes").append(imgBox);
        // 이미지 확대
        (document.getElementById("preview") as HTMLImageElement).style.display = "block";
        (document.querySelector(".example-box") as HTMLDivElement).style.display = "none";
        exImgBoxes.forEach((el: HTMLDivElement) => {
            el.style.border = "1px solid rgb(179, 179, 179)"
        })
        imgBox.style.border = "4px solid rgb(97, 96, 96)";
        document.getElementById("max-count").innerHTML = `최대 ${exImgBoxes.length + 1} / 5 개`;
        deleteBtn.onclick = () => {
            imgBox.remove();
            document.getElementById("max-count").innerHTML = `최대 ${parseInt(document.getElementById("max-count").innerHTML.split(" ")[1]) - 1} / 5 개`;
        }
        clickImgBox();
    }
}




const assignBtn = document.getElementById("assignBtn") as HTMLButtonElement;
assignBtn.onclick = () => {
    const images = document.querySelectorAll(".ex-box > .img-boxes > .img-box");
    const imageArr = [];
    for(let i = 0; i < images.length; i++) {
        imageArr.push(((images[i] as HTMLDivElement).children[0] as any).src);
    }
    const titleInput = document.getElementById("titleInput") as HTMLTextAreaElement;
    const contentInput = document.getElementById("contentInput") as HTMLTextAreaElement;
    const selectBrand = document.getElementById("brand") as HTMLSelectElement;
    const selectCategory = document.getElementById("category") as HTMLSelectElement;
    const priceInput = document.getElementById("priceInput") as HTMLTextAreaElement;
    console.log(imageArr)
    const object = {
        title: titleInput.value,
        content: contentInput.value,
        brand: selectBrand.value,
        category: selectCategory.value,
        price: priceInput.value,
        img: imageArr
    }
    if(object.img.length !== 0 && object.title && object.content && object.brand && object.category && object.price) {
        axios.post<{title: string, content: string, brand: string, category: string, price: string, img: string[]}>("http://localhost:3000/item/registItem", object).then((res) => {
            console.log(res);
        }).catch((error) => {
            if (error.response) {
                // 서버가 응답을 했지만 상태 코드가 2xx 범위를 벗어남
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
              } else if (error.request) {
                // 요청이 만들어졌지만 응답을 받지 못함
                console.error('Error request:', error.request);
              } else {
                // 요청을 설정하는 도중에 에러가 발생함
                console.error('Error message:', error.message);
              }
              console.error('Error config:', error.config);
        });
        console.log('성공')
    }else {
        console.log(object.img.length)
        if(object.img.length === 0) {console.log("이미지 입력바람");}
        if(!object.title) {console.log("제목 입력바람");}
        if(!object.content) {console.log("내용 입력바람");}
        if(!object.brand) {console.log("브랜드 입력바람");}
        if(!object.category) {console.log("카테고리 입력바람");}
        if(!object.price) {console.log("가격 입력바람");}
    }
}