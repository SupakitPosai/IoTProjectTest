type ReqLogin = {
    username: string
    password: string
}
type ReqRegister = {
    username: string
    password: string
    email: string
}
type ReqDevice = {
    name: string
}
export type { ReqLogin, ReqRegister,ReqDevice };
