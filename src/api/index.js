import { SingUp } from "./singup";
import { SingIn } from "./singin";
import { GetTodo } from "./gettodo";
import { UpdateTodo } from "./patchtodo.js";
import { PostTodo } from "./posttodo.js";

export const singups = new SingUp();
export const singin = new SingIn();
export const gettodo = new GetTodo();
export const updatetodo = new UpdateTodo();
export const posttodo = new PostTodo();
