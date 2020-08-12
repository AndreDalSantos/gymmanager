const faker = require('faker')

const Instructor = require('./src/app/models/Instructor')
const Member = require('./src/app/models/Member')
const { fake } = require('faker')

const { date } = require('./src/lib/utils')

let totalInstructors = 10
let totalMembers = 5

async function createInstructors(){
    const instructors = []

    while (instructors.length < totalInstructors){
        let gender = faker.random.boolean() ? 'F' : 'M'

        instructors.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.imageUrl(),
            gender,
            services: faker.lorem.words(),
            birth: date(faker.date.past()).iso,
            created_at: date(Date.now()).iso
        })
    }

    const instructorsPromise = instructors.map(instructor => Instructor.create(instructor))

    instructorsIds = await Promise.all(instructorsPromise)
}

function bloodType(){
    const value = Math.floor(Math.random() * (8 - 1) + 1)

    if(value === 1) return 'A+'
    else if(value === 2) return 'A-'
    else if(value === 3) return 'B+'
    else if(value === 4) return 'B-'
    else if(value === 5) return 'AB+'
    else if(value === 6) return 'AB-'
    else if(value === 7) return 'O+'
    else return 'O-'
}

async function createMembers(){
    const members = []

    while (members.length < totalMembers){
        let gender = faker.random.boolean() ? 'F' : 'M'

        members.push({
            avatar_url: faker.image.imageUrl(), 
            name: faker.name.firstName(),
            email: faker.internet.email(),
            birth: date(faker.date.past()).iso,
            gender,
            blood: bloodType(),
            weight: Math.floor(Math.random() * (90 - 55) + 55),
            height: Math.floor(Math.random() * (200 - 160) + 160),
            instructor_id: Math.floor(Math.random() * (10 - 1) + 1) 
        })
    }

    const membersPromise = members.map(member => Member.create(member))

    membersIds = await Promise.all(membersPromise)
}

// createInstructors()
createMembers()