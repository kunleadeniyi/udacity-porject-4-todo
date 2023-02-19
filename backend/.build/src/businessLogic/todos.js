import { TodosAccess } from '../dataLayer/todosAcess';
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { createLogger } from '../utils/logger';
import * as uuid from 'uuid';
// import * as createError from 'http-errors'
// import { TodoUpdate } from '../models/TodoUpdate';
import { parseUserId } from "../auth/utils";
// TODO: Implement businessLogic
const logger = createLogger('Todos');
const todosAccess = new TodosAccess();
const attachmentUtils = new AttachmentUtils();
// get todos
export async function getTodosForUser(userId) {
    logger.info("called getTodosForUser function");
    return todosAccess.getAllTodos(userId);
}
// create todo function
export async function createTodo(newTodo, 
// userId: string
jwtToken) {
    logger.info("Called createTodo function");
    const userId = parseUserId(jwtToken);
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();
    const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId);
    const newTask = Object.assign({ userId,
        todoId,
        createdAt,
        attachmentUrl, done: false }, newTodo);
    return await todosAccess.createTodoItem(newTask);
}
//  update todo
export async function updateTodo(userId, todoId, newTodo) {
    logger.info("called updateTodo function ");
    return await todosAccess.updateTodoItem(userId, todoId, newTodo);
}
// delete Todo
export async function deleteTodo(userId, todoId) {
    logger.info("called deleteTodo function ");
    return await todosAccess.deleteTodoItem(userId, todoId);
}
// createAttachmentPresignedUrl
export async function createAttachmentPresignedUrl(userId, todoId) {
    logger.info("called createAttachmentPresignedUrl function ", userId);
    return await attachmentUtils.getUploadUrl(todoId);
}
//# sourceMappingURL=todos.js.map