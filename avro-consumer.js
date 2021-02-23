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
    const filename = `./files/payload-${id}.avro`
    console.log(filename)
    const data = await readFile(filename)
    console.log(data)
  }

})()

function readFile(filename) {
  return new Promise((resolve, reject) => {
    const items = []
    avro.createFileDecoder(filename)
      .on('metadata', function (type) { /* here's the schema */ })
      .on('data', function (val) {
        items.push(val)
      })
      .on('end', function () {
        resolve(items)
      })
      .on('error', reject)
  })
}

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
