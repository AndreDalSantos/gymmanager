const { age, date } = require('../../lib/utils')
const Intl = require('intl')
const Member = require('../models/Member')
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
    
            const members = (await Member.paginate(params)).rows
    
            if(members[0]){
                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
        
                return res.render('members/index', { members, pagination, filter })
            } else 
                return res.send('Members not found')

        } catch (error) {
            console.error(error)
        }

    },
    async create(req, res) {
        const instructors = (await Instructor.instructorSelectOptions()).rows
        return res.render('members/create', { instructorOptions: instructors })
                
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for( key of keys ) {
                if (req.body[key] == ""){
                    const instructors = (await Instructor.instructorSelectOptions()).rows
                    return res.render('members/create', { 
                        error: "Por favor preencha todos os campos!",
                        instructorOptions: instructors 
                    })
                }
            }

            const { 
                avatar_url, 
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor
            } = req.body

            const memberId = (await Member.create({ 
                avatar_url, 
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor_id: instructor
            })).rows[0].id

            return res.render('members/post_put_success')

        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            let member = (await Member.find(req.params.id)).rows[0]

            if (!member) return res.send('Member not found')
            const instructor = (await Instructor.find(member.instructor_id)).rows[0]

            member = {
                ...member,
                birth: date(member.birth).birthDay,
                instructor_name: instructor.name
            }            

            return res.render('members/show', { member })

        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            let member = (await Member.find(req.params.id)).rows[0]

            if (!member) return res.send('Member not found')

            member = {
                ...member,
                birth: date(member.birth).iso
            }

            const instructors = (await Instructor.instructorSelectOptions()).rows

            
            return res.render('members/edit', { member, instructorOptions: instructors })

        } catch (error) {
            console.error(error)
        }       
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body)

            for( key of keys ) {
                if (req.body[key] == ""){
                    let member = (await Member.find(req.body.id)).rows[0]

                    member = {
                        ...member,
                        birth: date(member.birth).iso
                    }

                    const instructors = (await Instructor.instructorSelectOptions()).rows

                    return res.render('members/edit', { 
                        error: 'Por favor preencha todos os campos!',
                        member, 
                        instructorOptions: instructors 
                    })

                }
            }

            const { 
                avatar_url, 
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor
            } = req.body

            const member = {
                avatar_url, 
                name,
                email,
                birth: date(birth).iso,
                gender,
                blood,
                weight,
                height,
                instructor_id: instructor
            }

            await Member.update(req.body.id, member)
            return res.render('members/post_put_success')

        } catch (error) {
            console.error(error)
        }     
    },
    async delete(req, res) {
        await Member.delete(req.body.id)     
        return res.render('members/delete_success')
    }
}