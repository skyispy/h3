///////////////////// 회원가입 DTO //////////////////////
export class SignInUserDTO {
    email: string
    nickname: string
    upw: string
}

///////////////////// 회원정보 수정 DTO //////////////////////
export class UpdateUserDTO {
    nickname: string
    upw: string
    profileImg: string
    introduce: string
}