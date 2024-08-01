const signupBtn = document.getElementById("signupBtn") as HTMLButtonElement;
signupBtn.onclick = () => {
    if(((document.getElementById("checkAll") as HTMLInputElement).checked) && ((document.getElementById("emailInput") as HTMLInputElement).classList.contains("sucess"))) {
        const emailInput = document.getElementById("emailInput") as HTMLInputElement;
        const upwInput = document.getElementById("upwInput") as HTMLInputElement;
        const nickNameInput = document.getElementById("nickNameInput") as HTMLInputElement;
        const object = {
            email: emailInput.value,
            upw: upwInput.value,
            nickName: nickNameInput.value
        }
        axios.post("http://localhost:3000/user/signUp", object)
        .then((res) => {
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
        })
    }
}

const checkAll = document.getElementById("checkAll") as HTMLInputElement
checkAll.onclick = () => {
    const checks = document.querySelectorAll("#check");
    if(checkAll.checked === true) {
        checks.forEach((el: HTMLInputElement) => el.checked = true);
    }else if(checkAll.checked === false) {
        checks.forEach((el: HTMLInputElement) => el.checked = false);
    }
}

const checks = document.querySelectorAll("#check");
checks.forEach((el: HTMLInputElement) => {
    el.onclick = () => {
        const checks = document.querySelectorAll("#check");
        for(let i = 0; i < checks.length; i++) {
            if((checks[i] as HTMLInputElement).checked === false) return;
        }
        checkAll.checked = true;
    }
})

const duplicateCheckBtn = document.getElementById("duplicateCheckBtn") as HTMLButtonElement;
duplicateCheckBtn.onclick = () => {
    axios.post("/", {email: (document.getElementById("emailInput") as HTMLInputElement).value})
    .then((res) => {
        console.log(res);
        if(true) {
            (document.getElementById("emailInput") as HTMLInputElement).classList.add("sucess");
            // alert("사용 가능한 아이디입니다.")
        }else if(false) {
            alert("중복이야!");
        }
    });
}
