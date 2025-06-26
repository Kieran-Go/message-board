const { Router } = require("express");
const router = Router();

// Array of sample messages
let messageID = 0;
const messages = [
  {
    id: messageID++,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: messageID++,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Render the index page and pass in a title and the messages array
router.get("/", (req, res) => {
    res.render("index", {
        title: "Mini Messageboard",
        messages: messages
  });
});

// Render the message details page for a specific message using the message's ID
router.get("/message/:id", (req, res) => {
    const message = messages.find(m => m.id === parseInt(req.params.id));
    if (!message) {
        return res.status(404).send("Message not found");
    }
    res.render("messageDetails", { message });
});

// Get the posted data from the "form" page and push it to the messages array before redirecting back to index
router.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ id: messageID++, text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});

module.exports = router;