import * as AWS from 'aws-sdk';
import { createLogger } from '../utils/logger';
var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('TodosAccess');
const todoTable = process.env.TODOS_TABLE;
const indexName = process.env.INDEX_NAME;
// TODO: Implement the dataLayer logic
export class TodosAccess {
    constructor(docClient = new XAWS.DynamoDB.DocumentClient(), 
    // private docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    todosTable = todoTable, todosIndex = indexName) {
        this.docClient = docClient;
        this.todosTable = todosTable;
        this.todosIndex = todosIndex;
    }
    async getAllTodos(userId) {
        logger.info("Calling getallTodos function");
        const queryResult = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.todosIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise();
        const items = queryResult.Items;
        return items;
    }
    // async createTodoItem(todo: TodoItem) {
    //     logger.info("Calling createTodoItem function")
    //     const createdItem = await this.docClient.put({
    //         TableName: this.todosTable,
    //         Item: todo
    //     }).promise()
    //     logger.info("Item Created", createdItem)
    //     return todo as TodoItem
    // }
    async createTodoItem(todoItem) {
        console.log("Creating new todo");
        const params = {
            TableName: this.todosTable,
            Item: todoItem,
        };
        const result = await this.docClient.put(params).promise();
        console.log(result);
        return todoItem;
    }
    async updateTodoItem(userId, todoId, todoUpdate) {
        logger.info("Calling updateTodoItem function");
        await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                todoId, userId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :name',
            ExpressionAttributeValues: {
                ':name': todoUpdate.name,
                ':duedate': todoUpdate.dueDate,
                ':done': todoUpdate.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();
        return todoUpdate;
    }
    async deleteTodoItem(userId, todoId) {
        logger.info("Calling updateTodoItem function");
        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                todoId,
                userId,
            }
        }).promise();
        return todoId;
    }
}
//# sourceMappingURL=todosAcess.js.map