const baseUrl = 'http://localhost:3002/weapp/api';
const wxRequest = (params = {}, url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: params.header || {},
      method: params.method || 'GET',
      data: params.data || {},
      success(res) {
        resolve(res.data);
      },
    });
  });
};
const login = (params) => wxRequest(params, `${baseUrl}/login`);
const list = (params) => wxRequest(params, `${baseUrl}/list`);
const register = (params) => wxRequest(params, `${baseUrl}/register`);
const getSpaces = (params) => wxRequest(params, `${baseUrl}/spaces`);
const getSpace = (params) => wxRequest(params, `${baseUrl}/space`);
module.exports = {
  login,
  list,
  register,
  getSpaces,
  getSpace
};
