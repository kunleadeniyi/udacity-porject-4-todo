import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
var AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

const todoTable = process.env.TODOS_TABLE
const indexName = process.env.INDEX_NAME

// TODO: Implement the dataLayer logic
export class TodosAccess{
    constructor(
        private docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        // private docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private todosTable = todoTable,
        private todosIndex = indexName
    ) {}

    async getAllTodos(userId: string) {
        logger.info("Calling getallTodos function")

        const queryResult = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.todosIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const items = queryResult.Items
        return items
    }

    async createTodoItem(todo: TodoItem) {
        logger.info("Calling createTodoItem function")

        const createdItem = await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()

        logger.info("Item Created", createdItem)
        return todo as TodoItem
    }

    async updateTodoItem(
        userId: string,
        todoId: string,
        todoUpdate: TodoUpdate
    ) {
        logger.info("Calling updateTodoItem function")

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
        }).promise()

        return todoUpdate as TodoUpdate
    }

    async deleteTodoItem(
        userId: string,
        todoId: string
    ): Promise<string> {
        logger.info("Calling updateTodoItem function")

        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                todoId,
                userId,
            }
        }).promise()

        return todoId as string
    }

}

