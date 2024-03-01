import { client } from "../app.js";
export default class UserController {
    async addUser(req, res, next) {
        try {
            const user = req.body;
            const usersDb = client.db("posts_api").collection("users");
            await usersDb.insertOne(user);
            res.send(`
      User successfully added
      ${JSON.stringify(user)}
      `);
        }
        catch (e) {
            return next(e.message);
        }
    }
    async get(req, res, next) {
        try {
            const usersDb = client.db("posts_api").collection("users");
            const usersArray = await usersDb.find(req.query).toArray();
            res.send(usersArray);
        }
        catch (e) {
            return next(e.message);
        }
    }
    async update(req, res, next) {
        try {
            const usersDb = client.db("posts_api").collection("users");
            const user = req.body;
            await usersDb.updateOne(req.query, { $set: user });
            res.send(`
      Successfully updated user
      ${JSON.stringify(user)}
      `);
        }
        catch (e) {
            return next(e.message);
        }
    }
    async delete(req, res, next) {
        try {
            const usersDb = client.db("posts_api").collection("users");
            const user = await usersDb.deleteOne(req.query);
            res.send(`
      Successfully deleted user
      ${JSON.stringify(user)}
      `);
        }
        catch (e) {
            return next(e.message);
        }
    }
}
//# sourceMappingURL=user_controller.js.map