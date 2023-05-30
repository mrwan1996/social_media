import Jwt from "jsonwebtoken"
import { usermodel } from "../db/models/usermodel.js"
import { tokenfunction } from "../utils/Token.js"
export const auth = () => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers
            if (!token || !token.startsWith("mrwan__")) {
                res.json({ message: "please enter valid token" })
            } else {
                const newtoken = token.split("mrwan__")[1]
                const decoded = tokenfunction({payload:newtoken,genrate:false})
                const user = await usermodel.findById(decoded.user._id)
                if (!user) {
                    res.json({ message: "token error" })
                } else {
                    req.user = user
                    next()
                }
            }
        } catch (error) {
            res.json({ message: "token catch" })
            console.log(error);
        }
    }
}
