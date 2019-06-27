'use strict'

const User = use("App/Models/User")

class UserController {

    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - Test
     *     summary: Sample API
     *     parameters:
     *       - username: name
     *         description: Name of the user
     *         in: query
     *         required: true
     *         type: string
     *       - email: email
     *         description: Email of the user
     *         in: query
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Send hello message
     *         example:
     *           message: Hello Guess
     */
    async create ({ request }) {
        const data = request.only(["username", "email", "password"])

        const user = await User.create(data)

        return user
    }
}

module.exports = UserController
