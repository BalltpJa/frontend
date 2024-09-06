import axios from "axios";

class HttpRequest {
  constructor(url = `${process.env.REACT_APP_API_BASE_URL}`) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("id_token")}`,
      },
    });
  }
  setHeader(header) {
    this.axiosInstance.defaults.headers.common = header;
    this.axiosInstance.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  get(methodName, data) {
    return this.axiosInstance.get(methodName, {
      params: data,
    });
  }

  create(methodName, data) {
    return this.axiosInstance.post(methodName, data);
  }

  update(methodName, data) {
    return this.axiosInstance.put(methodName, data);
  }

  patch(methodName, data) {
    return this.axiosInstance.patch(methodName, data);
  }

  delete(methodName, param, data) {
    return this.axiosInstance.delete(methodName, {
      params: param,
      data: data,
    });
  }

  request(type, url, data, config) {
    let promise = null;
    switch (type) {
      case "GET":
        promise = axios.get(url, { params: data });
        break;
      case "POST":
        promise = axios.post(url, data, config);
        break;
      case "PUT":
        promise = axios.put(url, data);
        break;
      case "PATCH":
        promise = axios.patch(url, data);
        break;
      case "DELETE":
        promise = axios.delete(url, data);
        break;
      default:
        promise = axios(config);
        break;
    }
    return promise;
  }
}

export default HttpRequest;
