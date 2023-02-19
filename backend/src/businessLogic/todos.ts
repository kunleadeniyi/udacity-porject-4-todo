import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate';
// import * as createError from 'http-errors'
// import { TodoUpdate } from '../models/TodoUpdate';

// import { parseUserId } from "../auth/utils";

// TODO: Implement businessLogic
const logger = createLogger('Todos')
const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

// get todos
export async function getTodosForUser(userId: string) {
    logger.info("called getTodosForUser function")
    return todosAccess.getAllTodos(userId)
}

// create todo function
export async function createTodo(
    newTodo: CreateTodoRequest,
    userId: string
    // jwtToken: string
): Promise<TodoItem> {
   logger.info("Called createTodo function");

//    const userId = parseUserId(jwtToken);

   const todoId = uuid.v4();
   const createdAt = new Date().toISOString();
   const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
   
   const newTask = {
    userId,
    todoId,
    createdAt,
    attachmentUrl,
    done: false,
    ...newTodo
   }

   return await todosAccess.createTodoItem(newTask) as TodoItem
}

//  update todo
export async function updateTodo(
    todoId: string,
    newTodo: UpdateTodoRequest,
    userId: string
): Promise<TodoUpdate> {
    logger.info("called updateTodo function ") 

    return await todosAccess.updateTodoItem( todoId, userId, newTodo)
}


// delete Todo
export async function deleteTodo(
    userId: string,
    todoId: string
): Promise<string>  {
    logger.info("called deleteTodo function ")

    return await todosAccess.deleteTodoItem(userId, todoId)
}

// createAttachmentPresignedUrl
export async function createAttachmentPresignedUrl(
    userId: string,
    todoId: string
): Promise<string> {
    logger.info("called createAttachmentPresignedUrl function ", userId)

    return attachmentUtils.getUploadUrl(todoId)
}