function IntegTestData() {}
let data = new IntegTestData();

let _token

export const getToken = () => {
    return _token
}

export const setToken = (token) => {
    _token = token;
}
exports.IntegTestData = data;


