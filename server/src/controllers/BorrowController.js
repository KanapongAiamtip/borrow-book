const { Borrow } = require('../models')
module.exports = {
    // indx with serach Borrow
    async index(req, res) {
        try {
            let borrows = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                borrows = await Borrow.findAll({
                    where: {
                        $or: [
                            'nameLend', 'equipment', 'status'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                borrows = await Borrow.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(borrows)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the borrows'
            })
        }
    },
    // create borrows
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const borrow = await Borrow.create(req.body)
            res.send(borrow.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create borrow incorrect'
            })
        }
    },
    // edit borrow, suspend, active
    async put(req, res) {
        try {
            await Borrow.update(req.body, {
                where: {
                    id: req.params.borrowId
                }
            })
            res.send(req.body)
        } catch (err) {
            200
            req.status(500).send({
                error: 'Update borrow incorrect'
            })
        }
    },
    // delete borrow
    async remove(req, res) {
        try {
            const borrow = await Borrow.findOne({
                where: {
                    id: req.params.borrowId
                }
            })
            if (!borrow) {
                return res.status(403).send({
                    error: 'The borrow information was incorrect'
                })
            }
            await borrow.destroy()
            res.send(borrow)
        } catch (err) {
            req.status(500).send({
                error: 'The borrow information was incorrect'
            })
        }
    },
    // get borrow by id
    async show(req, res) {
        try {
            const borrow = await Borrow.findById(req.params.borrowId)
            res.send(borrow)
        } catch (err) {
            req.status(500).send({
                error: 'The borrow information was incorrect'
            })
        }
    }
}