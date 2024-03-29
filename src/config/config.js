const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'OPC UA Discovery'),
  EGRESS_URLS: env('EGRESS_URLS', ''),
  OPC_UA_SERVER: env('OPC_UA_SERVER', 'opc.tcp://localhost:26543'),
  MAX_RETRY: env('MAX_RETRY', 1),
  OPC_UA_PASSWORD: env('OPC_UA_PASSWORD', ''),
  OPC_UA_USERNAME: env('OPC_UA_USERNAME', ''),
}
