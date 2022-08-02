const { OPCUAClient, MessageSecurityMode, SecurityPolicy, UserTokenType } = require('node-opcua')

const fetch = require('node-fetch')
const {
  MAX_RETRY,
  EGRESS_URLS,
  MODULE_NAME,
  OPC_UA_SERVER,
  OPC_UA_USERNAME,
  OPC_UA_PASSWORD,
} = require('../config/config')

const connectionStrategy = {
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
      OPC_UA_USERNAME && OPC_UA_PASSWORD ? await client.createSession(userIdentity) : await client.createSession()

    const browseResult = await session.browse('RootFolder')

    const list = []
    for (const reference of browseResult.references) {
      list.push(reference.nodeId.value)
    }
    await send(list)
    await session.close()
  } catch (e) {
    console.log(`Failed to create session with OPC UA server ${OPC_UA_SERVER}, error:  ${e}`)
  }
}
const send = async list => {
  if (EGRESS_URLS) {
    const eUrls = EGRESS_URLS.replace(/ /g, '')
    const urls = eUrls.split(',')
    urls.forEach(async url => {
      if (url) {
        try {
          const callRes = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: true,
              data: list,
            }),
          })
          if (!callRes.ok) {
            console.error(`Error passing response data to ${url}, status: ${callRes.status}`)
          }
        } catch (e) {
          console.error(`Error making request to: ${url}, error: ${e.message}`)
        }
      }
    })
  } else {
    console.error('EGRESS_URLS is not provided.')
  }
}

module.exports = {
  processNodes,
}
