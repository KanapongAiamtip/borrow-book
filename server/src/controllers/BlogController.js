const { Blog } = require('../models')
module.exports = {
    // indx with serach blog
    async index(req, res) {
        try {
            let blogs = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                blogs = await Blog.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'category'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                blogs = await Blog.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(blogs)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the blogs'
            })
        }
    },
    // create blog
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const blog = await Blog.create(req.body)
            res.send(blog.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create blog incorrect'
            })
        }
    },
    // edit blog, suspend, active
    async put(req, res) {
        try {
            await Blog.update(req.body, {
                where: {
                    id: req.params.blogId
                }
            })
            res.send(req.body)
        } catch (err) {
            200
            req.status(500).send({
                error: 'Update blog incorrect'
            })
        }
    },
    // delete blog
    async remove(req, res) {
        try {
            const blog = await Blog.findOne({
                where: {
                    id: req.params.blogId
                }
            })
            if (!blog) {
                return res.status(403).send({
                    error: 'The blog information was incorrect'
                })
            }
            await blog.destroy()
            res.send(blog)
        } catch (err) {
            req.status(500).send({
                error: 'The blog information was incorrect'
            })
        }
    },
    // get blog by id
    async show(req, res) {
        try {
            const blog = await Blog.findById(req.params.blogId)
            res.send(blog)
        } catch (err) {
            req.status(500).send({
                error: 'The blog information was incorrect'
            })
        }
    }
}