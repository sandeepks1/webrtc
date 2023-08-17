// const express = require('express');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// const mongoConnectionString = "mongodb+srv://sandeep:sandeep@webrtccluster.g6wvvml.mongodb.net/?retryWrites=true&w=majority";
// const dbName = 'webrtc'; // Your MongoDB database name
// const collectionName = 'room'; // Your MongoDB collection name

// const client = new MongoClient(mongoConnectionString, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.post('/connect', async(req, res) => {
//     // console.log(req)
//     const offersdp = req.body.data; // Change this to the data you want to send
//     console.log("SDasdasfa" + offersdp)
//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         await collection
//             .updateOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") }, { $set: { offersdp: offersdp } }, );
//         console.log('Data inserted successfully:', offersdp);
//         res.status(200).send('Data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         await client.close();
//     }
// });


// app.get('/connectb', async(req, res) => {

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         var document = await collection
//             .findOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") });
//         if (document) {
//             const offersdpValue = document.offersdp;
//             console.log('offersdpvaleeee:', offersdpValue);
//             res.send({ offersdp: offersdpValue });
//         } else {
//             console.log('Document not found');
//         }
//         //   console.log('Data inserted successfully:', offersdp);

//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         await client.close();
//     }
// });


// app.post('/setanswer', async(req, res) => {
//     // console.log(req)
//     const answersdp = req.body.data; // Change this to the data you want to send
//     console.log("answerrrr" + answersdp)
//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);

//         await collection
//             .updateOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") }, { $set: { answersdp: answersdp } }, );
//         console.log('Data inserted successfully:', answersdp);
//         res.status(200).send('Data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         await client.close();
//     }
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const mongoConnectionString = "mongodb+srv://sandeep:sandeep@webrtccluster.g6wvvml.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'webrtc'; // Your MongoDB database name
const collectionName = 'room'; // Your MongoDB collection name

const client = new MongoClient(mongoConnectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/connect', async(req, res) => {
    const offersdp = req.body.data;
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await collection.updateOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") }, { $set: { offersdp: offersdp } });

        console.log('Offersdp inserted successfully:', offersdp);
        res.status(200).send('Offersdp inserted successfully');
    } catch (err) {
        console.error('Error inserting offersdp:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/connectb', async(req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const document = await collection.findOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") });

        if (document) {
            const offersdpValue = document.offersdp;
            console.log('Offersdp value:', offersdpValue);
            res.send({ offersdp: offersdpValue });
        } else {
            console.log('Document not found');
        }
    } catch (err) {
        console.error('Error fetching offersdp:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.post('/setanswer', async(req, res) => {
    const answersdp = req.body.data;
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await collection.updateOne({ _id: new ObjectId("64db0c099d1e089cfcdc7244") }, { $set: { answersdp: answersdp } });

        console.log('Answersdp inserted successfully:', answersdp);

        // Notify clients about the change
        io.emit('answersdpChange', answersdp);

        res.status(200).send('Answersdp inserted successfully');
    } catch (err) {
        console.error('Error inserting answersdp:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Set up Socket.IO
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});