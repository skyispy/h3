const loginBtn = document.getElementById("loginBtn");
loginBtn.onclick = () => {
    const emailInput = document.getElementById("emailInput");
    const upwInput = document.getElementById("upwInput");
    axios.post('https://junhu.store/auth/login', { email: emailInput.value, upw: upwInput.value }).then((res) => {
        location.href = "https://junhu.store/";
    });
};
const google = document.getElementById("google");
const kakao = document.getElementById("kakao");
const email = document.getElementById("email");
google.onclick = () => location.href = "https://junhu.store/auth/google";
kakao.onclick = () => location.href = "https://junhu.store/auth/kakao";
email.onclick = () => location.href = "https://junhu.store/user/signup";
//# sourceMappingURL=login.js.map