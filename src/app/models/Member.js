const { age, date } = require('../../lib/utils')
const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'members' })

module.exports = {
    ...Base,
    paginate(params){
        
        const { filter, limit, offset } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM members
            ) AS total`

        if(filter){

            filterQuery = `
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT members.*, ${totalQuery} 
            FROM members
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        return db.query(query, [limit, offset])
    }
}