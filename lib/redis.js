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
    value: { type: 'string' },
    name: { type: 'string', textSearch: true },
    category: { type: 'array', textSearch: true },
  },
  {
    dataStructure: 'JSON',
  }
);

export async function createLift(data) {
  await connect();
  console.log('from redis', data);
  const repository = new Repository(schema, client);

  const lift = repository.createEntity(data);

  const id = await repository.save(lift);
}

export async function searchLifts(q) {
  await connect();
  const repository = new Repository(schema, client);

  const lifts = await repository
    .search()
    .where('value')
    .matches(q)
    .or('category')
    .containsOneOf(q)
    .return.all();
}
