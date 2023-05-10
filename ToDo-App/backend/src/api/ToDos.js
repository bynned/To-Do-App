const express = require("express");
const router = express.Router();
var cors = require('cors')

router.use(cors())

let todos = [
  {
    userId: 1,
    id: 1,
    title: "Eat bing chilling",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Eat pyttipannu",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "Sleep",
    completed: false,
  },
];
router.get("/", (req, res) => {
  res.status(200).json(todos);
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     const todo = movies.find((m) => m.id === Number(id));
//     res.status(200).json(todo);
// });

router.get("/:id", (req, res) => {
  const { id } = req.params; //destructuring
  const todo = todos.find((m) => m.id === Number(id));
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});


router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    const { id, title, completed } = req.body;
    todos.push({ id, title, completed });
    res.status(200).json(todos);
  });


router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = todos.findIndex((m) => m.id === Number(id));
  const uodatedTask = {
    id: Number(id),
    title,
  };
  todos[index] = uodatedTask;
  res.status(200).json({ message: "Updated" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((m) => m.id !== Number(id));
  res.status(200).json({ message: "Deleted" });
});

module.exports = router;
