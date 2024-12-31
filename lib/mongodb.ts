import { MongoClient } from 'mongodb'

// eslint-disable-next-line no-var
var _mongoClientPromise: Promise<MongoClient> | undefined

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

console.log('Attempting to connect to MongoDB...')
clientPromise
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err))

