import { postmodel } from "../../db/models/post_model.js"
import { usermodel } from "../../db/models/usermodel.js"

export const addpost = async (req, res) => {
    try {
        const { _id } = req.user
        const { body } = req.body
        const user = await usermodel.findById(_id)
        if (user) {
            const newpost = new postmodel({ body, createdby: _id })
            const savedpost = await newpost.save()
            const pushing = await usermodel.updateOne({ _id: _id }, {
                $push: {
                    post: newpost._id
                }
            })
            if (pushing.modifiedCount) {
                res.json({ message: 'done' })
            } else {
                const delet = await postmodel.findByIdAndDelete(newpost._id)
                res.json({ message: 'error' })
            }
        } else {
            res.json({ message: 'please log in' })
        }

    } catch (error) {
        res.json({ message: 'catch error' })
        console.log(error);
    }
}
export const mypost = async (req, res) => {
    const { _id } = req.user
    const posts = await postmodel.find({ createdby: _id })
    if (posts.length) {
        res.json({ message: 'done', data: posts })
    } else {
        res.json({ message: 'please log in' })
    }
}
export const allposts = async (req, res) => {
    const posts = await postmodel.find({ private: false }, 'body').populate([{
        path: 'createdby',
        select: 'username'
    }])
        .populate([{
            path: "comments",
            select: "body"
        }])
    if (posts.length) {
        res.json({ message: 'done', posts })
    } else {
        res.json({ message: 'error' })
    }
}
export const deletepost = async (req, res) => {
    try {
        const { _id } = req.user
        const { id } = req.body
        const posts = await postmodel.findOneAndDelete({ createdby: _id, _id: id })
        if (posts) {
            res.json({ message: 'done' })
        } else {
            res.json({ message: 'error' })
        }
    } catch (error) {
        res.json({ message: 'catch error' })
        console.log(error);

    }
}
export const like = async (req, res) => {
    try {
        const { _id } = req.user
        const { postid } = req.body
        const likepost = await postmodel.findOneAndUpdate({ _id: postid, dislike: { $ne: _id } }, {
            $addToSet: {
                like: _id
            }
        })
        likepost ? res.json({ message: 'done',data:like.length-1 })
            : res.json({ message: 'error' })
    } catch (error) {
        res.json({ message: 'catch error' })
        console.log(error);
    }
}

export const dislike = async (req, res) => {
    try {
        const { _id } = req.user
        const { postid } = req.body
        const dislikepost = await postmodel.findOneAndUpdate({ _id: postid, like: { $ne: _id } }, {
            $addToSet: {
                dislike: _id
            }
        })
        dislikepost ? res.json({ message: 'done',data:like.length-1 })
            : res.json({ message: 'error' })
    } catch (error) {
        res.json({ message: 'catch error' })
        console.log(error);
    }
}