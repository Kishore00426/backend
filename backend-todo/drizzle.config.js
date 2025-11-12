import "dotenv/config";

export default {
  schema: "./db/schema.js", //  path
  out: "./drizzle",         // migrations folder
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
