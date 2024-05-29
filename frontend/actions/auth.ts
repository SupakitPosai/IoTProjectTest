import { deleteCookie } from "cookies-next";
import { NextRouter, Router } from "next/router";

const logout = async (router:NextRouter) => {
    await deleteCookie('token');
    await router.push("/login")
}
export default {logout};