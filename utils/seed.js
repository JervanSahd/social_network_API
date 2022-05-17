const connection = require("../config/connection");
const { Thoughts, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Thoughts.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the students
  const user = [];

  // Add students to the collection and await the results
  await Users.collection.insertOne({
    username: "lernantino",
    email: "lernantino@gmail.com",
  });
  // Add courses to the collection and await the results
  await Thoughts.collection.insertOne({
    thoughtText: "Here's a cool thought...",
    username: "lernantino",
    userId: "5edff358a0fcb779aa7b118b",
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
