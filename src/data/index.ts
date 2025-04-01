import { User } from "../types";
import {v4 as uuidv4} from 'uuid'

export const listUsers:User[]=[


    {

        id:uuidv4(),
        name:"user1",
        email:"user1@email.com"

    },
    {

        id:uuidv4(),
        name:"user2",
        email:"user2@email.com"

    },

    {

        id:uuidv4(),
        name:"user3",
        email:"user3@email.com"

    }

]