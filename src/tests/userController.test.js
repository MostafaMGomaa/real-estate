const assert = require('assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Ensure you're correctly importing your app
const app = require('../app');
const User = require('../models/userModel');

const request = supertest(app);
dotenv.config();

const adminCredentials = {
  phone: '+201111111111',
  password: 'adminPassword',
};
const DB = process.env.DATABASE_TEST;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});
let adminToken;

before(async () => {
  await User.create({
    name: 'testAdmin',
    phone: adminCredentials.phone,
    password: adminCredentials.password,
    role: 'ADMIN',
  });
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

const sampleUserData = [
  {
    name: 'User 1',
    phone: '+201200528753',
    role: 'CLIENT',
    password: '123456789',
  },
  {
    name: 'User 2',
    phone: '+201200528732',
    role: 'AGENT',
    password: '123456789',
  },
  {
    name: 'User 3',
    phone: '+201200528721',
    role: 'CLIENT',
    password: '123456789',
  },
];

before(async () => {
  // await User.insertMany(sampleUserData);
  await User.create(sampleUserData);
});

describe('User Statistics API', async () => {
  beforeEach(async () => {
    // Authenticate admin user to obtain JWT token
    const res = await request.post('/api/users/login').send({
      phone: adminCredentials.phone,
      password: adminCredentials.password,
    });

    adminToken = res.body.token;
  });

  it('should fetch user statistics with pagination', async () => {
    const page = 1;
    const pageSize = 2;
    const agentCount = await User.countDocuments({ role: 'AGENT' });
    const clientCount = await User.countDocuments({ role: 'CLIENT' });
    const res = await request
      .get(`/api/users/statistics?page=${page}&pageSize=${pageSize}`)
      .set('Authorization', `Bearer ${adminToken}`);

    assert.strictEqual(res.status, 200);
    assert.ok(res.body.data);
    assert.ok(Array.isArray(res.body.data));
    assert.strictEqual(res.body.total, agentCount + clientCount);
    assert.strictEqual(res.body.page, page);
    assert.strictEqual(res.body.pageSize, pageSize);
    assert.strictEqual(typeof res.body.hasNextPage, 'boolean');
    assert.strictEqual(typeof res.body.hasPreviousPage, 'boolean');
    assert.strictEqual(res.body.data.length, pageSize);
  });
});
