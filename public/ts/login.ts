const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
loginBtn.onclick = () => {
    const emailInput = document.getElementById("emailInput") as HTMLInputElement;
    const upwInput = document.getElementById("upwInput") as HTMLInputElement;
}

const google = document.getElementById("google") as HTMLDivElement;
const kakao = document.getElementById("kakao") as HTMLDivElement;
const email = document.getElementById("email") as HTMLDivElement;

google.onclick = () => location.href = "";
kakao.onclick = () => location.href = "";
email.onclick = () => location.href = "";