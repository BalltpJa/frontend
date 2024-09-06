import HttpRequest from "./request";
export class UpdateTodo extends HttpRequest {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}`);
  }
  async updatatodobyid(body, param) {
    try {
      const { data } = await this.patch(`todo/${param}`, body);
      if (data.isSuccess) {
        return { statusCode: 200, data: data.data };
      } else {
        return { statusCode: 401, data: [] };
      }
    } catch (error) {
      return { statusCode: 500, data: [] };
    }
  }

  async deletetodobyid(param) {
    try {
      const { data } = await this.delete(`todo/${param}`);
      if (data.isSuccess) {
        return { statusCode: 200, data: data.data };
      } else {
        return { statusCode: 401, data: [] };
      }
    } catch (error) {
      return { statusCode: 500, data: [] };
    }
  }
}
