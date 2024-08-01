const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
loginBtn.onclick = () => {
    const emailInput = document.getElementById("emailInput") as HTMLInputElement;
    const upwInput = document.getElementById("upwInput") as HTMLInputElement;
    axios.post('http://localhost:3000')
}

const google = document.getElementById("google") as HTMLDivElement;
const kakao = document.getElementById("kakao") as HTMLDivElement;
const email = document.getElementById("email") as HTMLDivElement;

google.onclick = () => location.href = "http://localhost:3000/auth/google";
kakao.onclick = () => location.href = "http://localhost:3000/auth/kakao";
email.onclick = () => location.href = "http://localhost:3000/user/signup";