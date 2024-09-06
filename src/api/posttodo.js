import HttpRequest from "./request";

export class PostTodo extends HttpRequest {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}`);
  }
  async createtodo(body) {
    try {
      const { data } = await this.create(`/todo`, body);
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
