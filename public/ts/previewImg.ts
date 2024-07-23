// 이미지 미리보기
const readURL = (input) => {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            (document.getElementById("preview") as any).src = e.target.result;
            console.log(e.target.result)
        }
        (document.getElementById("preview") as HTMLImageElement).style.display = "block";
        (document.querySelector(".example-box") as HTMLDivElement).style.display = "none";
        reader.readAsDataURL(input.files[0]);
    } else {
        (document.getElementById("preview") as HTMLImageElement).src = "";
    }
}


const addImgBtn = document.getElementById("addImgBtn") as HTMLButtonElement;

addImgBtn.onclick = () => {
    const previewImg = (document.getElementById("preview") as any).src;
    const img = document.createElement("img");
    const imgBox = document.createElement("div");
    imgBox.className = "img-box";
    img.src = `${previewImg}`;
    imgBox.append(img);
    document.querySelector(".img-boxes").append(imgBox);
}

// const dsds = document.querySelectorAll("ex-img");
// dsds.forEach((el: HTMLImageElement) => {
    
// })