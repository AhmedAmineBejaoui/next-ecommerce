const {readFileSync} = require('node:fs');
const assert = require('node:assert/strict');
const {test} = require('node:test');

const orders = readFileSync('pages/api/orders.js', 'utf8');

test('orders API checks admin session before accessing orders', () => {
  assert.match(orders, /import\s*\{\s*isAdminRequest\s*\}\s*from\s*["']@\/pages\/api\/auth\/\[\.\.\.nextauth\]["']/);
  const auth = orders.indexOf('await isAdminRequest(req,res)');
  const db = orders.indexOf('await mongooseConnect()');
  const query = orders.indexOf('Order.find()');
  assert.ok(auth !== -1, 'admin guard must be called');
  assert.ok(db > auth, 'admin guard must precede database connection');
  assert.ok(query > auth, 'admin guard must precede order lookup');
});
