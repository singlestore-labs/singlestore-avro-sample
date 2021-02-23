SingleStore AVRO Sample
=======================

SingleStore is great at loading data in Avro format.  This sample shows both how to load specific files, and how to create a pipeline that'll continuously load files in AVRO format.


Watch
-----

Load a file once:

<div align="center">
  <a href="https://www.youtube.com/watch?v=wPj_ctZkXxE"><img src="https://img.youtube.com/vi/wPj_ctZkXxE/0.jpg" alt="Load Avro file into SingleStore"></a>
</div>

Continuously load lots of files with a pipeline:

<div align="center">
  <a href="https://www.youtube.com/watch?v=WQluigiKYxY"><img src="https://img.youtube.com/vi/WQluigiKYxY/0.jpg" alt="SingleStore Pipelines load Avro files"></a>
</div>


To Use
------

1. Sign up for a free-tier SingleStore license at https://www.singlestore.com/free-software/

2. Start a SingleStore cluster, a Kafka cluster, and an Avro schema registry.  You may choose for a Managed Service cluster or you could use Docker to start the cluster: `docker-compose up`.  Note: this terminal will continue running, showing you console output from Kafka, Zookeeper, the Avro registry, and SingleStore.

3. Adjust the schema registry URL in `avro-consumer.js` and `avro-producer.js`.

4. Install npm packages from a terminal:

   ```sh
   npm install
   ```

5. Create and publish the schema in the AVRO registry from a terminal:

   ```sh
   node registry-create-schema.js
   ```

6. Create some AVRO files from a terminal:

   ```sh
   node avro-producer.js
   ```

7. Optional: you can run `node avro-consumer.js` to read these binary files and log them to the terminal.

8. Copy `init.sql` into your favorite code editor.

9. Run each part of `init.sql` to ingest the AVRO files into the table

10. When you're, shut down the docker containers from a terminal:

    ```sh
    docker-compose down
    ```
