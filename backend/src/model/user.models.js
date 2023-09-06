const db = require("../config/db.js");
const { ErrorServer } = require("../utils/helper/erorr.helper.js");

exports.TABLE_NAME = "users";

class UserModel {
  constructor() {
    this.tableName = exports.TABLE_NAME;
  }

  async getAll() {
    return await db.select("*").from(this.tableName);
  }

  async save({ name, email, part_of }) {
    try {
      const newUser = {
        name,
        email,
        part_of,
      };
      // console.log(newUser);
      await db(this.tableName)
        .insert(newUser)
        .into(this.tableName)
        .returning("*");

      return {
        name: newUser.name,
        email: newUser.email,
        part_of: newUser.part_of,
      };
    } catch (e) {
      console.log(e);
      throw new ErrorServer(e.detail);
    }
  }

  async create({ name, email, part_of }) {
    const newUser = {
      name,
      email,
      part_of,
    };

    const query = await db.insert(newUser).into(this.tableName).returning("*");
    return query;
  }

  async delete(id) {
    const userToDelete = await db(this.tableName).where("id", id).first();

    if (!userToDelete?.id) {
      throw new Error("Data not found");
    }

    await db(this.tableName).where("id", id).del();
    return userToDelete;
  }

  async edit({ id, name, email, part_of }) {
    const existingUser = await db(this.tableName).where("id", id).first();

    if (!existingUser?.id) {
      throw new Error("Data not found");
    }

    const editedUser = {
      id: existingUser.id,
      name: name || existingUser.name,
      email: email || existingUser.email,
      part_of: part_of || existingUser.part_of,
    };

    await db(this.tableName).update(editedUser).where("id", id);
    return editedUser;
  }

  async find({ limit = 10, p = 1 }, { email = "", name = "", part_of = "" }) {
    try {
      let query = db
        .select("id", "name", "email", "part_of")
        .table(this.tableName);

      if (name) query = query.where("name", "ilike", `%${name}%`);
      if (email) query = query.where("email", "ilike", `%${email}%`);
      if (part_of) query = query.where("part_of", "ilike", `%${part_of}%`);

      query = query.limit(limit).offset((p - 1) * limit);

      const [users, [{ count: total }]] = await Promise.all([
        query,
        db(this.tableName)
          .count("*")
          .where((builder) => {
            if (email) builder.where("email", "ilike", `%${email}%`);
            if (name) builder.where("name", "ilike", `%${name}%`);
          }),
      ]);

      return {
        users,
        total: Number(total),
        p,
        has_next: p * limit < total,
      };
    } catch (e) {
      console.error(e);
      throw new ErrorServer(e.detail);
    }
  }

  async findOne(id) {
    try {
      const result = await db
        .select("id", "name", "email", "part_of")
        .table(this.tableName)
        .where("id", id)
        .first();

      return result || {};
    } catch (e) {
      throw new ErrorServer(e.detail);
    }
  }
  async getUserById(id) {
    return knex("users").where("id", id).first();
  }
}

module.exports = UserModel;
