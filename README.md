# OPCUADiscovery

|                |                                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| Name           | OPC UA Discovery                                                                      |
| Version        | v1.0.0                                                                                |
| Dockerhub Link | [weevenetwork/opcua-discovery](https://hub.docker.com/r/weevenetwork/opcua-discovery) |
| Authors        | Mesud Pasic                                                                           |

- [OPCUADiscovery](#OPCUADiscovery)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

OPC UA Discovery looks for all available nodes onn OPC UA Server and forwards the payload to next module.

## Environment Variables

| Environment Variables   | type    | Description                               |
| ----------------------- | ------- | ----------------------------------------- |
| OPC_UA_SERVER           | string  | OPC UA Server endpoint                    |
| INITIAL_DELAY           | integer | Initial delay for connection              |
| MAX_RETRY               | integer | Max retry for connection                  |
| REQUIRES_AUTHENTICATION | string  | Yes/No if connection needs authentication |
| OPC_UA_USERNAME         | string  | Username if authentication is required    |
| OPC_UA_PASSWORD         | string  | Password if authentication is required    |

### Module Specific

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

## Dependencies

```js
"dependencies": {
    "express": "^4.17.3",
    "express-winston": "^4.2.0",
    "node-fetch": "^2.6.1",
    "node-opcua": "^2.71.0"
}
```
