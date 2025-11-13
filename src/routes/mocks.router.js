import { Router } from 'express';
import { generateUser, generatePet } from '../utils/mocks.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const pets = [];
    for (let i = 0; i < 100; i++) {
        pets.push(generatePet());
    }
    res.status(200).send({ status: 'success', payload: pets});
});

router.get('/mockingusers', async (req, res) => {
    try {
        const users = [];
        for (let i = 0; i < 50; i++) {
            users.push(await generateUser());
        }
        res.status(200).send({ status: 'success', payload: users});
    } catch (error) {
        console.log("Error generating mock users:", error);        
        res.status(500).send({ status: 'error', error: "Failed to generate mock users" });
    }
});

router.post('/generateData', async (req, res) => {
    const { users: userCount = 1, pets: petCount = 1 } = req.query;
    try {
        const users = [];
        for (let i = 0; i < userCount; i++) {
            users.push(await generateUser());
        }

        const pets = [];
        for (let i = 0; i < petCount; i++) {
            pets.push(generatePet());
        }

        const userResult = await usersService.create(users);
        const petResult = await petsService.create(pets);

        res.status(200).send({
            status: 'success',
            message: `${users.length} users and ${pets.length} pets generated and inserted successfully.`,
            payload: {
                users: userResult,
                pets: petResult
            }
        });
    } catch (error) {
        console.eroor("Error generating and inserting data:", error);
        res.status(500).send({ status: 'error', error: "Failed to insert data" });
    }
});

export default router;