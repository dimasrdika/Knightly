/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "John Doe",
      age: 28,
      birth_date: "1995-03-15",
      gender: "Male",
      email: "john.doe@example.com",
      part_of: "ABC Corporation",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 35,
      birth_date: "1988-07-22",
      gender: "Female",
      email: "jane.smith@example.com",
      part_of: "XYZ Industries",
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 42,
      birth_date: "1981-11-10",
      gender: "Male",
      email: "michael.johnson@example.com",
      part_of: "LMN Group",
    },
  ]);
};
