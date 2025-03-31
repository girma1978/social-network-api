# Social Network API

A RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list.

## Technologies Used

- Express.js for routing
- MongoDB for database
- Mongoose ODM for object modeling
- TypeScript for type safety

## Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/socialnetwork
PORT=3001
```

## Usage

1. Start the MongoDB server
```
mongod
```

2. Seed the database (optional)
```
npm run seed
```

3. Start the server
```
npm start
```

4. Use Insomnia or another API client to test the routes

## API Routes

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get a single user by ID with populated thought and friend data
- `POST /api/users` - Create a new user
- `PUT /api/users/:userId` - Update a user by ID
- `DELETE /api/users/:userId` - Delete a user by ID (also removes associated thoughts)

### Friends
- `POST /api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Thoughts
- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a single thought by ID
- `POST /api/thoughts` - Create a new thought (don't forget to push the thought ID to the user's thoughts array)
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID

### Reactions
- `POST /api/thoughts/:thoughtId/reactions` - Create a reaction stored in a thought's reactions array
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Models

### User
- `username` (String, unique, required, trimmed)
- `email` (String, required, unique, must match a valid email address)
- `thoughts` (Array of _id values referencing the Thought model)
- `friends` (Array of _id values self-referencing the User model)
- Virtual: `friendCount` - retrieves the length of the user's friends array

### Thought
- `thoughtText` (String, required, must be between 1 and 280 characters)
- `createdAt` (Date, default: current timestamp, formatted on query)
- `username` (String, required)
- `reactions` (Array of nested reaction documents)
- Virtual: `reactionCount` - retrieves the length of the thought's reactions array

### Reaction (Schema only)
- `reactionId` (ObjectId, default: new ObjectId)
- `reactionBody` (String, required, 280 character maximum)
- `username` (String, required)
- `createdAt` (Date, default: current timestamp, formatted on query)

## Testing

Use Insomnia or a similar tool to test all API routes according to the acceptance criteria.
## video
- `Link to Video
https://drive.google.com/file/d/12IIhKOgYmQU-3znhbCSGhTnVe5jMfAhb/view?usp=sharing
