
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'kunleadeniyi',
  applicationName: 'serverless-todo-app-udacity',
  appUid: '7ZlyKCmKjXFsvLPKvs',
  orgUid: 'e103b3d7-f853-4c45-9b96-0cf46671bbc6',
  deploymentUid: '9a8f133a-d0aa-4b9a-aea6-0302548b4c2b',
  serviceName: 'serverless-todo-app-udacity',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '6.2.3',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'serverless-todo-app-udacity-dev-Auth', timeout: 6 };

try {
  const userHandler = require('./src/lambda/auth/auth0Authorizer.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}