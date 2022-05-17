# 18 NoSQL: Social Network API

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. Over the last part of this course, you’ll use several of the technologies that social networking platforms use in their full-stack applications. Because the foundation of these applications is data, it’s important that you understand how to build and structure the API first.

## Description

An API for my social network that uses a NoSQL database that a website can handle large amounts of unstructured data. Users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Technologies

```md
- Express.js for routing,
- MongoDB database,
- Mongoose ODM.
- Native JavaScript `Date` object to format timestamps.
```

## API Criteria

```md
- Command to invoke the application the server is started and the Mongoose models are synced to the MongoDB database

- Open API GET routes in Insomnia for users and thoughts the data for each of these routes is displayed in a formatted JSON

- Test API POST, PUT, and DELETE routes in Insomnia user is able to successfully create, update, and delete users and thoughts in database

- WHEN I test API POST and DELETE routes in Insomnia THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Guidelines

---

### Models

**User**:

- `username`

  - String
  - Unique
  - Required
  - Trimmed

- `email`

  - String
  - Required
  - Unique
  - Must match a valid email address (look into Mongoose's matching validation)

- `thoughts`

  - Array of `_id` values referencing the `Thought` model

- `friends`
  - Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**:

Virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

---

**Thought**:

- `thoughtText`

  - String
  - Required
  - Must be between 1 and 280 characters

- `createdAt`

  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

- `username` (The user that created this thought)

  - String
  - Required

- `reactions` (These are like replies)
  - Array of nested documents created with the `reactionSchema`

**Schema Settings**:

Virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

---

**Reaction** (SCHEMA ONLY)

- `reactionId`

  - Use Mongoose's ObjectId data type
  - Default value is set to a new ObjectId

- `reactionBody`

  - String
  - Required
  - 280 character maximum

- `username`

  - String
  - Required

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

**Schema Settings**:

Used as the `reaction` field's subdocument schema in the `Thought` model.

---

### API Routes

**`/api/users`**

- `GET` all users

- `GET` a single user by its `_id` and populated thought and friend data

- `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

- `PUT` to update a user by its `_id`

- `DELETE` to remove user by its `_id`

**BONUS**: Remove a user's associated thoughts when deleted.

---

**`/api/users/:userId/friends/:friendId`**

- `POST` to add a new friend to a user's friend list

- `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

- `GET` to get all thoughts

- `GET` to get a single thought by its `_id`

- `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- `PUT` to update a thought by its `_id`

- `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

- `POST` to create a reaction stored in a single thought's `reactions` array field

- `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

### GitHub repository

- Contains application code.

### Walkthrough Video

```md
- A walkthrough video that demonstrates the functionality of the social media API.

  - Show all of the technical acceptance criteria being met.

  - Demonstrates how to start the application’s server.

  - Demonstrates GET routes for all users and all thoughts being tested in Insomnia.

  - Demonstrates GET routes for a single user and a single thought being tested in Insomnia.

  - Demonstrates POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia.

  - Demonstrates POST and DELETE routes for a user’s friend list being tested in Insomnia.

  - Demonstrates POST and DELETE routes for reactions to thoughts being tested in Insomnia.
```

### Technical

- Satisfies all of the preceding acceptance criteria plus the following:

  - Uses the [Mongoose package](https://www.npmjs.com/package/mongoose) to connect to a MongoDB database.

  - Includes User and Thought models outlined in the Challenge instructions.

  - Includes schema settings for User and Thought models as outlined in the Challenge instructions.

  - Includes Reactions as the `reaction` field's subdocument schema in the Thought model.

  - Uses functionality to format queried timestamps properly.

### Repository

- Repository has a unique name.

- Repository follows best practices for file structure and naming conventions.

- Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

- Repository contains multiple descriptive commit messages.

- Repository contains a high-quality README with description and a link to a walkthrough video.

- Application deletes a user's associated thoughts when the user is deleted.

## Review

- A walkthrough video demonstrating the functionality of the application and all of the acceptance criteria being met.

- The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

---
