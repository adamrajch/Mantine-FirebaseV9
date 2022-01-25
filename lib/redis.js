import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Lift extends Entity {}

let schema = new Schema(
  Lift,
  {
    name: { type: 'string', textSearch: true },
    category: { type: 'array' },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function searchLifts(q) {
  await connect();
  const repository = new Repository(schema, client);

  let lifts = await repository.search().where('name').matches(q).return.all();
  return lifts;
}

export async function createLift(data) {
  await connect();
  console.log('from redis', data);
  const repository = new Repository(schema, client);

  const lift = repository.createEntity(data);

  const id = await repository.save(lift);
  return id;
}

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}
export async function dropIndex() {
  await connect();
  const repository = new Repository(schema, client);
  await repository.dropIndex();
}
