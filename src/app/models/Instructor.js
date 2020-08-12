const { date } = require('../../lib/utils')
const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'instructors' })

module.exports = {
    ...Base,
    paginate(params){
        
        const { filter, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM instructors
            ) AS total`

        if(filter){

            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT instructors.*, ${totalQuery}, count(members) AS total_students 
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            ${filterQuery}
            GROUP BY instructors.id            
            ORDER BY total_students DESC
            LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
    },
    instructorSelectOptions(){
        return db.query(`SELECT name, id FROM instructors`)            
    },
}