import { postmodel } from "../../db/models/post_model.js"
import { usermodel } from "../../db/models/usermodel.js"
import { commentmodel } from "../../db/models/comments.js"

export const addcomment = async (req, res) => {
    try {
        const { _id } = req.user
        const { body, postid } = req.body
        const user = await usermodel.findById({ _id })
        if (user) {
            const post = await postmodel.findById(postid)
            if (post) {
                const comment = new commentmodel({
                    body,
                    createdby: _id,
                    postid
                })
                const newcomment = comment.save()
                const push = await postmodel.updateOne({ _id: postid }, {
                    $push: {
                        comments: comment._id
                    }
                })
                if (push) {
                    res.json({ message: 'done' })
                } else {
                    res.json({ message: 'error' })
                }
            } else {
                res.json({ message: 'post isnt available' })
            }
        } else {
            res.json({ message: 'please log in' })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: 'catch error' })
    }
}
export const getcomment = async (req, res) => {
    try {
        const { postid } = req.body
        const post = await postmodel.findById(postid)
        if (post) {
            const comments = await commentmodel.find({ postid }, 'body createdby').populate([{
                path: 'createdby',
                select: 'username'
            }])
            if (comments.length) {
                res.json({ message: 'done', comments })
            } else {
                res.json({ message: 'no comments' })
            }
        } else {
            res.json({ message: 'post isnt available' })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: 'catch error' })
    }
}
export const deletecomment = async (req, res) => {
    try {
        const { _id } = req.user
        const { postid, commentid } = req.body
        const user = await usermodel.findById(_id)
        if (user) {
            const post = await postmodel.findById(postid)
            if (post) {
                const comment = await commentmodel.findById(commentid)
                if (comment) {
                    const deltecomment = await commentmodel.deleteOne({ _id: commentid })
                    const pull = await postmodel.updateOne({ _id: postid }, {
                        $pull: {
                            comments: commentid
                        }
                    })
                    pull ? res.json({ message: 'done' })
                        : res.json({ message: 'error' })
                } else {
                    res.json({ message: 'comment isnt available' })
                }
            } else {
                res.json({ message: 'post isnt available' })
            }
        } else {
            res.json({ message: 'please log in ' })
        }
    } catch (error) {
        res.json({ message: 'catch error' })
        console.log(error);
    }
}