import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456789", 10),
    isAdmin: true,
  },
  {
    name: "Shivam Gupta",
    email: "shivamgupta@email.com",
    password: bcrypt.hashSync("123456789", 10),
    isAdmin: false,
  },
  {
    name: "Ram",
    email: "ram@email.com",
    password: bcrypt.hashSync("123456789", 10),
    isAdmin: false,
  },
  {
    name: "Pallavi Shetty",
    email: "pallavishetty@email.com",
    password: bcrypt.hashSync("123456789", 10),
    isAdmin: false,
  },
];

export default users;
