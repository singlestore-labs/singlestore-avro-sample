const registryUrl = 'http://localhost:8081' // schema registry

const avro = require('avsc')
const axios = require('axios')

const topic = {
  topic: 'actor'
}


;(async () => {

  const schemas = {
    key: await fetchSchema(registryUrl, `${topic.topic}-key`, 1),
    value: await fetchSchema(registryUrl, `${topic.topic}-value`, 1)
  }

  for (let id = 0; id < 10; id++) {
    const k = {
      id: id.toString(),
      timestamp: `2021-05-26 14:${id}:57.62`
    }
    const v = {
      id,
      firstName: 'First' + id,
      lastName: 'Last' + id,
      lastUpdate: k.timestamp
    }


    // error here? the schema doesn't match.
    const encoder = avro.createFileEncoder(`./files/payload-${id}.avro`, schemas.value);
    encoder.write(v);
    encoder.end();

  }

})()

async function fetchSchema(registryUrl, topic, version) {
  const res = await axios.get(
    `${registryUrl}/subjects/${topic}/versions/${version}/schema`,
    {
      headers: {
        'Content-Type': 'application/vnd.schemaregistry.v1+json'
      }
    }
  )
  console.log(res.status, res.data)
  return res.data
}
