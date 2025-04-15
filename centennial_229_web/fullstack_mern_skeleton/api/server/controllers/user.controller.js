import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

// const create = (req, res, next) => { }
// const list = (req, res) => { }
// const userByID = (req, res, next, id) => { }
// const read = (req, res) => { }
// const update = (req, res, next) => { }
// const remove = (req, res, next) => { }

// export default { create, userByID, read, list, remove, update }


// 1. Create User (create):
// - Creates a new user with the data from req.body and saves it to the
// database.
// - On success, returns a success message.
// - On error, returns an error message.
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// 2. List Users (list):
// - Retrieves a list of users, selecting specific fields (name, email, updated,
//            created).
// - Returns the list of users or an error message.
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// 3. Get User by ID (userByID):
// - Middleware to find a user by ID and attach it to req.profile.
// - If the user is not found, returns an error message.
// - If the user is found, proceeds to the next middleware or route handler.
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next() // 可能还有其他的middleware 要处理这个数据
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

// 4. Read User (read):
// Returns the user profile with sensitive information (password and salt)
// removed.
// 这个read,应该就是用来处理上面 userByID 的,把password 和salt 都消掉
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// 5. Update User (update):
// - Updates the user profile with data from req.body and the current
// timestamp.
// - Saves the updated user profile to the database.
// - Returns the updated profile with sensitive information removed, or an error
// message on failure.

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body) // ?
        user.updated = Date.now()
        await user.save()
        // 修改res 数据
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

// 6. Remove User (remove):
// - Deletes the user profile from the database.
// - Returns the deleted user profile with sensitive information removed, or an  error message on failure.
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userByID, read, list, remove, update }
