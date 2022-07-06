const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'OPC UA Discovery'),
  EGRESS_URL: env('EGRESS_URL', ''),
  OPC_UA_SERVER: env('OPC_UA_SERVER', 'opc.tcp://localhost:26543'),
  INITIAL_DELAY: env('INITIAL_DELAY', 1000),
  MAX_RETRY: env('MAX_RETRY', 1),
  OPC_UA_PASSWORD: env('OPC_UA_PASSWORD', ''),
  OPC_UA_USERNAME: env('OPC_UA_USERNAME', ''),
  REQUIRES_AUTHENTICATION: env('REQUIRES_AUTHENTICATION', 'no'),
}
