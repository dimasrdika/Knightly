/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      part_of: "Acme Corporation",
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      part_of: "XYZ Company",
    },
    {
      name: "Peter Smith",
      email: "peter.smith@example.com",
      part_of: "Google",
    },
  ]);
};
