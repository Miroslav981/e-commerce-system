const fs = require("fs");

const products = [];

for (let id = 1; id <= 100; id++) {
  products.push({
    id,
    name: `Product ${id}`,
    price: Number(Math.random() * 10 * Math.random() * id).toFixed(2),
  });
}

const users = [];

for (let id = 1; id <= 10; id++) {
  users.push({
    id,
    name: `User ${id}`,
    password: Math.random().toString(36).slice(-8),
    email: `user.${id}@example.com`,
  });
}

const content = JSON.stringify({ products, users });

fs.writeFile("src/db.json", content, () => {});
