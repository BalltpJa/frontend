import HttpRequest from "./request";

export class SingIn extends HttpRequest {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}`);
  }
  async loginfrom(body) {
    try {
      const { data } = await this.axiosInstance.post(`/auth/login`, body);
      if (data) {
        return { statusCode: 200, data: data };
      } else {
        return { statusCode: 401, data: [] };
      }
    } catch (error) {
      return { statusCode: 500, data: [] };
    }
  }
}
