import axios from "axios";
import { ReqDevice, ReqLogin, ReqRegister } from "./types/api";

const BASE_URL = process.env.NEXT_PUBLIC_URL_API
var header = {
    authorization: "",
    accept: "application/json",
    'content-type': "application/json",
}
interface Post {
    path: string;
    data: any
}
interface Get {
    path: string;
    params: any
}
interface Put {
    path: string;
    data: any
}
interface Delete {
    path: string;
}
const apiPost = (e: Post): any => new Promise(async (resolve, reject) => {
    var response = null

    try {
        console.log('BASE_URL :>> ', BASE_URL);
        // header["authorization"] = credential_sabuy?.access_token
        response = await axios.post(`${BASE_URL}/${e.path}`, e.data, { headers: header });
        console.log(response.data);
        if (response?.status == 200 || response?.status == 201) {
            resolve(response.data);
        }
        resolve(response.data);
    } catch (err: any) {
        reject(err.response.data);
    }
});

const apiGet = (e: Get): any => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(`${BASE_URL}/${e.path}`, {
            params: e.params, headers: header
        });
        if (response?.status == 200 || response?.status == 201) {
            resolve(response.data);
        }
        resolve(response.data);
    } catch (err: any) {
        console.log('err :>> ', err);
        reject(err.response.data);
    }

});

const apiPut = (e: Put): any => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.put(`${BASE_URL}/${e.path}`, e.data, { headers: header });
        console.log(response.data);
        if (response?.status == 200 || response?.status == 201) {

            resolve(response.data);
        }
    } catch (err: any) {
        console.log('err :>> ', err.response.data);
        reject(err.response.data);
    }

});

const apiDelete = (e: Delete): any => new Promise(async (resolve, reject) => {
    try {
        // if (headers) header = headers
        const response = await axios.delete(`${BASE_URL}/${e.path}`, {
            headers: header
        });
        if (response?.status == 200 || response?.status == 201) {
            resolve(response.data);
        }
    } catch (err: any) {
        console.log('err :>> ', err);
        reject(err.response.data);
    }

});

const login = async (data: ReqLogin) => apiPost({ path: "auth/v1/login", data })
const register = async (data: ReqRegister) => apiPost({ path: "auth/v1/register", data })

const devicesList = async (params: {}) => apiGet({ path: "devices/v1/", params })
const devicesOne = async (id: string) => apiGet({ path: `devices/v1/${id}`, params: {} })
const devicesCreate = async (data: ReqDevice) => apiPost({ path: "devices/v1/", data })
const devicesUpdate = async (id: string, data: ReqDevice) => apiPut({ path: `devices/v1/${id}`, data })
const devicesDelete = async (id: string) => apiDelete({ path: `devices/v1/${id}` })

export default {
    login,
    register,
    devicesList,
    devicesOne,
    devicesCreate,
    devicesUpdate,
    devicesDelete
}
