import Cookies from "js-cookie";
/****************************************
 ****** 用户模块
 ****************************************/
const tokenKey = "carsAccountToken";
const usernameKey = "carsAccountUsername";

// token
export function setToken(value) {
    Cookies.set(tokenKey, value, { expires: 7 });
}
export function getToken() {
    return Cookies.get(tokenKey);
}
export function getTokenCars() {
    return Cookies.get(tokenKey);
}
export function removeToken() {
    return Cookies.remove(tokenKey);
}
// username
export function setUsername(value) {
    Cookies.set(usernameKey, value, { expires: 7 });
}
export function getUsername() {
    return Cookies.get(usernameKey);
}
export function removeUsername() {
    return Cookies.remove(usernameKey);
}