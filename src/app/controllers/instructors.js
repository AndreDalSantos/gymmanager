const { age, date } = require('../../lib/utils')
const Intl = require('intl')
const Instructor = require('../models/Instructor')

module.exports = {
    async index(req, res) { 
        try {    

            let { filter, page, limit } = req.query
    
            page = page || 1
            limit = limit || 2
            let offset = limit * (page - 1)
    
            const params = {
                filter,
                page,
                limit,
                offset
            }
    
            const instructors = (await Instructor.paginate(params)).rows
    
            if(instructors[0]){
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }
        
                return res.render('instructors/index', { instructors, pagination, filter })
            } else 
                return res.send('Instructors not found')

        } catch (error) {
            console.error(error)
        }       

    },
    create(req, res) {
        return res.render('instructors/create')
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for( key of keys ) {
                if (req.body[key] == ""){
                    return res.render('instructors/create', { error: "Por favor preencha todos os campos!"})
                }
            }

            let {
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            } = req.body
            
            let instructor = {
                name,
                avatar_url,
                gender,
                services,
                birth: date(birth).iso,
                created_at: date(Date.now()).iso
                // date(data.birth).iso,
                // date(Date.now()).iso
            }

            const instructorId = (await Instructor.create(instructor)).rows[0].id

            return res.render(`instructors/post_put_success`)
        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            let instructor = (await Instructor.find(req.params.id)).rows[0]

            if (!instructor) return res.send('Instructor not found')

            instructor = {
                ...instructor,
                age: age(instructor.birth),
                services: instructor.services.split(','),
                created_at: date(instructor.created_at).format
            }

            return res.render('instructors/show', { instructor })

        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {  
        try {
            let instructor = (await Instructor.find(req.params.id)).rows[0]

            instructor = {
                ...instructor,
                birth: date(instructor.birth).iso
            }

            return res.render('instructors/edit', { instructor })

        } catch (error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for( key of keys ) {
                if (req.body[key] == ""){
                    let instructor = (await Instructor.find(req.body.id)).rows[0]

                    instructor = {
                        ...instructor,
                        birth: date(instructor.birth).iso
                    }
                    
                    return res.render('instructors/edit', { error: "Por favor preencha todos os campos!", instructor })
                }
            }

            const {
                avatar_url,
                name,
                birth,
                gender,
                services
            } = req.body

            let instructor = {
                avatar_url,
                name,
                birth: date(birth).iso,
                gender,
                services
            }

            await Instructor.update(req.body.id, instructor)
            return res.render(`instructors/post_put_success`)

        } catch (error) {
            console.error(error)
        }   
    },
    async delete(req, res) {
        try {
            await Instructor.delete(req.body.id)     
            return res.render(`instructors/delete_success`)

        } catch (error) {
            console.error(error)
        }
    }
}