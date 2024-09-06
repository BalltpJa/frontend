import HttpRequest from "./request";

export class GetTodo extends HttpRequest {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}`);
  }
  async gettodoall() {
    try {
      const { data } = await this.get(`/todo/all`);
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
