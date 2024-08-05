const signupBtn = document.getElementById("signupBtn");
signupBtn.onclick = () => {
    if ((document.getElementById("checkAll").checked) && (document.getElementById("emailInput").classList.contains("sucess")) && (document.getElementById("nickNameInput").classList.contains("sucess"))) {
        const emailInput = document.getElementById("emailInput");
        const upwInput = document.getElementById("upwInput");
        const nickNameInput = document.getElementById("nickNameInput");
        const object = {
            email: emailInput.value,
            upw: upwInput.value,
            nickname: nickNameInput.value
        };
        console.log(object);
        axios.post("http://localhost:3000/user/signUp", object)
            .then((res) => {
            console.log(res);
            location.href = "http://localhost:3000/user/login";
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
    }
    else {
        alert("다시 해주세영");
    }
};
const checkAll = document.getElementById("checkAll");
checkAll.onclick = () => {
    const checks = document.querySelectorAll("#check");
    if (checkAll.checked === true) {
        checks.forEach((el) => el.checked = true);
    }
    else if (checkAll.checked === false) {
        checks.forEach((el) => el.checked = false);
    }
};
const checks = document.querySelectorAll("#check");
checks.forEach((el) => {
    el.onclick = () => {
        const checks = document.querySelectorAll("#check");
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].checked === false)
                return;
        }
        checkAll.checked = true;
    };
});
const duplicateCheckBtn = document.getElementById("duplicateCheckBtn");
if (duplicateCheckBtn) {
    duplicateCheckBtn.onclick = (e) => {
        axios.post("http://localhost:3000/user/duplicate", { email: document.getElementById("emailInput").value })
            .then((res) => {
            console.log(res.data);
            if (res.data) {
                document.getElementById("emailInput").classList.add("sucess");
                document.getElementById("emailInput").readOnly = true;
                e.target.remove();
                alert("사용 가능!");
            }
            else if (!res.data) {
                alert("중복이야!");
            }
        });
    };
}
const duplicateCheckBtn2 = document.getElementById("duplicateCheckBtn2");
if (duplicateCheckBtn2) {
    duplicateCheckBtn2.onclick = (e) => {
        axios.post("http://localhost:3000/user/duplicate2", { nickname: document.getElementById("nickNameInput").value })
            .then((res) => {
            console.log(res.data);
            if (res.data) {
                document.getElementById("nickNameInput").classList.add("sucess");
                document.getElementById("nickNameInput").readOnly = true;
                e.target.remove();
                alert("사용 가능!");
            }
            else if (!res.data) {
                alert("중복이야!");
            }
        });
    };
}
