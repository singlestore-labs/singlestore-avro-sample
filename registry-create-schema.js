const registryUrl = 'http://localhost:8081' // schema registry

const avro = require('avsc')
const axios = require('axios')

const topic = {
  topic: 'actor'
}

;(async () => {

  const id = 1;
  const key = {
    id: id.toString(),
    timestamp: `2021-05-26 14:${id}:57.62`
  }
  const value = {
    id,
    firstName: 'First' + id,
    lastName: 'Last' + id,
    lastUpdate: key.timestamp
  }

  // Infer the type based on this instance
  const keyInferredType = avro.Type.forValue(key)
  const keySchema = keyInferredType.schema()
  keySchema.name = 'actorKey'
  keySchema.namespace = 'singlestore'

  console.log('key schema', keySchema)

  const valueInferredType = avro.Type.forValue(value)
  const valueSchema = valueInferredType.schema()
  valueSchema.name = 'actorValue'
  valueSchema.namespace = 'singlestore'

  console.log('value schema', valueSchema)

  await createSchema(registryUrl, topic.topic+'-value', valueSchema)
  await createSchema(registryUrl, topic.topic+'-key', keySchema)

})()

async function createSchema(registryUrl, keyName, schema) {
  const body = {
    schema: JSON.stringify(schema)
  }
  const res = await axios.post(
    `${registryUrl}/subjects/${keyName}/versions`,
    JSON.stringify(body),
    {
      headers: {
        'Content-Type': 'application/vnd.schemaregistry.v1+json'
      }
    }
  )
  console.log(res.status, res.data)
  return res.data
}
