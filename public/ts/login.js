const loginBtn = document.getElementById("loginBtn");
loginBtn.onclick = () => {
    const emailInput = document.getElementById("emailInput");
    const upwInput = document.getElementById("upwInput");
    axios.post('/auth/login', { email: emailInput.value, upw: upwInput.value }).then((res) => {
        location.href = "/";
    });
};
const google = document.getElementById("google");
const kakao = document.getElementById("kakao");
const email = document.getElementById("email");
google.onclick = () => location.href = "/auth/google";
kakao.onclick = () => location.href = "/auth/kakao";
email.onclick = () => location.href = "/user/signup";
//# sourceMappingURL=login.js.map