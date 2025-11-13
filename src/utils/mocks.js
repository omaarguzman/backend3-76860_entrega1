import { faker } from '@faker-js/faker';
import { createHash } from './index.js';

export const generateUser = async () => {

    const hashedPässword = await createHash('coder123')

    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPässword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    };
}

export const generatePet = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.dog(),
        specie: faker.helpers.arrayElement(['Dog', 'Cat', 'Bird', 'Rabbit']),
        birthDate: faker.date.past(),
        adopted: false,
        image: faker.image.avatar()
    }
}