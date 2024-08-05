const loginBtn = document.getElementById("loginBtn");
loginBtn.onclick = () => {
    const emailInput = document.getElementById("emailInput");
    const upwInput = document.getElementById("upwInput");
    axios.post('http://localhost:3000/auth/login', { email: emailInput.value, upw: upwInput.value }).then((res) => {
        location.href = "http://localhost:3000/";
    });
};
const google = document.getElementById("google");
const kakao = document.getElementById("kakao");
const email = document.getElementById("email");
google.onclick = () => location.href = "http://localhost:3000/auth/google";
kakao.onclick = () => location.href = "http://localhost:3000/auth/kakao";
email.onclick = () => location.href = "http://localhost:3000/user/signup";
//# sourceMappingURL=login.js.map