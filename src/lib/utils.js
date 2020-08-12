module.exports = {
    age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        // retorna 2020 - 1984 = 36
        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()
    
        today.getUTCDate()
        birthDate.getUTCDate()
    
        if (month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate()){
            age = age - 1
        }
    
        return age
    
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return  {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,  // tipo iso
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}