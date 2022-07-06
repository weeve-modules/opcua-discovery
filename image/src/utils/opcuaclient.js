const { OPCUAClient, MessageSecurityMode, SecurityPolicy, UserTokenType } = require('node-opcua')

const fetch = require('node-fetch')
const {
  INITIAL_DELAY,
  MAX_RETRY,
  EGRESS_URL,
  MODULE_NAME,
  OPC_UA_SERVER,
  REQUIRES_AUTHENTICATION,
  OPC_UA_USERNAME,
  OPC_UA_PASSWORD,
} = require('../config/config')

const { isValidURL } = require('./util')

const connectionStrategy = {
  initialDelay: INITIAL_DELAY,
  maxRetry: MAX_RETRY,
}

const options = {
  applicationName: MODULE_NAME,
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpoint_must_exist: false,
}

const processNodes = async () => {
  try {
    const client = OPCUAClient.create(options)
    await client.connect(OPC_UA_SERVER)
    // we might need to specify encryptionAlgorithm and policyId as well in future, also for certificate authentication we need storage of certificates in order to use it
    /*
      for example:
      let userIdentity = {
          type: UserTokenType.Certificate,
          certificateData: fs.readFileSync('./user-certificates/file.pem'),
          privateKey: fs.readFileSync('./user-certificates/key.pem','utf8')
      }
    */
    const userIdentity = { type: UserTokenType.UserName, userName: OPC_UA_USERNAME, password: OPC_UA_PASSWORD }
    const session =
      REQUIRES_AUTHENTICATION === 'yes' ? await client.createSession(userIdentity) : await client.createSession()

    const browseResult = await session.browse('RootFolder')

    const list = []
    for (const reference of browseResult.references) {
      list.push(reference.browseName.toString())
    }
    await send(list)
    await session.close()
  } catch (e) {
    console.log(`Failed to create session with OPC UA server ${OPC_UA_SERVER}, error:  ${e}`)
  }
}
const send = async list => {
  if (isValidURL(EGRESS_URL)) {
    await fetch(EGRESS_URL, {
      method: 'POST',
      body: JSON.stringify({
        status: true,
        data: list,
      }),
    })
  } else {
    console.log(
      JSON.stringify({
        status: true,
        data: list,
      })
    )
  }
}

module.exports = {
  processNodes,
}
