import {Banner} from "../../types/bannerType";
import {getBanner} from "../lib/bannersQuery";
import connectDb from "../config/connetMongo";
import * as mongoose from "mongoose";
const cluster = require("cluster");
const os = require('os')
const clusterWorkerSize = os.cpus().length;
const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.url)
    if (req.method === 'GET' && req.url === '/api/banner') {
        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // console.log('Got request')
        getBanner().then((queryRes) => {
            res.end(JSON.stringify(queryRes));
        })
    }   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
    
function start(){
    connectDb().then(() => {
        server.listen(5000, '127.0.0.1', () => {
            // console.log(data)
            console.log('Server is running at http://127.0.0.1:5000, worker', cluster.worker.id);
        });
    })
}

if (clusterWorkerSize > 1) {
    if (cluster.isPrimary) {
        for (let i=0; i < clusterWorkerSize; i++) {
            cluster.fork();
        }

        cluster.on("exit", async function(worker) {
            await mongoose.connection.close()
            console.log("Worker", worker.id, " has exited.")
        })
        cluster.on("uncaughtException", async function(worker) {
            await mongoose.connection.close()
            console.log("Worker", worker.id, " has exited.")
        })
    } else {
        start();
    }
} else {
    start();
}
