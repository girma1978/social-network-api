"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../src/config/connection"));
const User_1 = __importDefault(require("../src/models/User"));
const Thought_1 = __importDefault(require("../src/models/Thought"));
// Function to seed the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User_1.default.deleteMany({});
        await Thought_1.default.deleteMany({});
        console.log('Database cleared');
        // Create users
        const users = await User_1.default.create([
            {
                username: 'johndoe',
                email: 'john@example.com'
            },
            {
                username: 'janedoe',
                email: 'jane@example.com'
            },
            {
                username: 'steverogers',
                email: 'steve@example.com'
            }
        ]);
        console.log('Users seeded');
        // Create thoughts and associate with users
        const thoughts = await Thought_1.default.create([
            {
                thoughtText: 'This is my first thought on the social network!',
                username: 'johndoe'
            },
            {
                thoughtText: 'Learning about NoSQL databases is fascinating.',
                username: 'janedoe'
            },
            {
                thoughtText: 'MongoDB is a great choice for social networks.',
                username: 'steverogers'
            }
        ]);
        console.log('Thoughts seeded');
        // Associate thoughts with users
        await User_1.default.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
        await User_1.default.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });
        await User_1.default.findByIdAndUpdate(users[2]._id, { $push: { thoughts: thoughts[2]._id } });
        console.log('Thoughts associated with users');
        // Add some reactions
        await Thought_1.default.findByIdAndUpdate(thoughts[0]._id, {
            $push: {
                reactions: {
                    reactionBody: 'Welcome to the network!',
                    username: 'janedoe'
                }
            }
        });
        await Thought_1.default.findByIdAndUpdate(thoughts[1]._id, {
            $push: {
                reactions: {
                    reactionBody: 'I agree!',
                    username: 'steverogers'
                }
            }
        });
        console.log('Added reactions to thoughts');
        // Add some friends
        await User_1.default.findByIdAndUpdate(users[0]._id, { $push: { friends: users[1]._id } });
        await User_1.default.findByIdAndUpdate(users[1]._id, { $push: { friends: users[2]._id } });
        console.log('Added friends relationships');
        console.log('Database seeded successfully!');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// Connect to the database and seed it
connection_1.default.once('open', () => {
    console.log('Connected to database');
    seedDatabase();
});
