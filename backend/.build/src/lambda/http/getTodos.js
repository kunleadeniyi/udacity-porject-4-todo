import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos';
import { getUserId } from '../utils';
// TODO: Get all TODO items for a current user
export const handler = middy(async (event) => {
    // Write your code here
    const userId = getUserId(event);
    const todos = await getTodosForUser(userId);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            items: todos
        })
    };
    // return undefined
});
handler.use(cors({
    credentials: true
}));
//# sourceMappingURL=getTodos.js.map