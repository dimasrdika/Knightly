const db = require("../config/db.js");
const { ErrorServer } = require("../utils/helper/erorr.helper.js");

exports.TABLE_NAME = "user";

class UserModel {
  constructor() {
    this.tableName = exports.TABLE_NAME;
  }

  async getAll() {
    return await db.select().from(this.tableName);
  }

  async create({ name, age, gender, email, birth_date, part_of }) {
    const newUser = {
      name,
      age,
      birth_date,
      gender,
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

  async edit({ id, name, age, email, birth_date, gender, part_of }) {
    const existingUser = await db(this.tableName).where("id", id).first();

    if (!existingUser?.id) {
      throw new Error("Data not found");
    }

    const editedUser = {
      id: existingUser.id,
      name: name || existingUser.name,
      age: age || existingUser.age,
      email: email || existingUser.email,
      birth_date: birth_date || existingUser.birth_date,
      gender: gender || existingUser.gender,
      part_of: part_of || existingUser.part_of,
    };

    await db(this.tableName).update(editedUser).where("id", id);
    return editedUser;
  }

  async find(
    { limit = 10, page = 1 },
    { email = "", gender = "", name = "", part_of = "" }
  ) {
    try {
      let query = db
        .select("id", "name", "email", "gender", "age", "part_of")
        .table(this.tableName);

      if (name) query = query.where("name", "ilike", `%${name}%`);
      if (email) query = query.where("email", "ilike", `%${email}%`);
      if (part_of) query = query.where("part_of", "ilike", `%${part_of}%`);
      if (gender) query = query.where("gender", gender);

      query = query.limit(limit).offset((page - 1) * limit);

      const [users, [{ count: total }]] = await Promise.all([
        query,
        db(this.tableName)
          .count("*")
          .where((builder) => {
            if (email) builder.where("email", "ilike", `%${email}%`);
            if (name) builder.where("name", "ilike", `%${name}%`);
            if (gender) builder.where("gender", gender);
          }),
      ]);

      return {
        users,
        total: Number(total),
        page,
        has_next: page * limit < total,
      };
    } catch (e) {
      console.error(e);
      throw new ErrorServer(e.detail);
    }
  }

  async findOne(id) {
    try {
      const result = await db
        .select("id", "name", "email", "gender", "age", "part_of", "birth_date")
        .table(this.tableName)
        .where("id", id)
        .first();

      return result || {};
    } catch (e) {
      throw new ErrorServer(e.detail);
    }
  }
}

module.exports = UserModel;
