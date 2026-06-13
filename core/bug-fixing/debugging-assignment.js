const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" },
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 },
];

// Not used any global error haldler thats why used try catch block only added for best practice
// All the thing in one place, its violates the "SOLID" principal
// controller,service, route etc. is missing, its violates the best practice.

app.get("/users", (req, res) => {
  try {
    const allUsers = users;

    return res.status(200).json({
      message: "All User fetched successfully",
      error: false,
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid Id",
        error: true,
        success: false,
      });
    }

    const user = users?.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

function getUserById(id) {
  try {
    const Id = Number(id);

    if (Number.isNaN(Id)) {
      return null;
    }

    return users?.find((u) => u.id === Id) || null;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}

app.get("/notes/count", (req, res) => {
  try {
    const total = notes?.length;
    return res.status(200).json({
      message: "Notes count successful",
      error: false,
      success: true,
      data: { total },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

const fetchExternalData = async () => {
  const newNote = { id: 5, title: "Note 5", content: "Content 5", userId: 1 };
  return newNote;
};

app.get("/external-data", async (req, res) => {
  try {
    const data = await fetchExternalData();
    return res.status(200).json({
      message: "Notes count successful",
      error: false,
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.get("/notes", (req, res) => {
  try {
    if (notes?.length === 0) {
      console.log("No notes found");
    }

    return res.status(200).json({
      message: "All notes",
      error: false,
      success: true,
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

function generateNoteId() {
  // the best way will be using uuid
  return Math.floor(Math.random() * 1000000);
}

app.post("/notes", (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "Please provide userId",
        error: true,
        success: false,
      });
    }

    const user = users.filter((u) => u.id === userId);
    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "Please provide all the required fields",
        error: true,
        success: false,
      });
    }

    const newNote = {
      id: generateNoteId(),
      title: title,
      content: content,
      userId: userId,
    };

    notes.push(newNote);

    return res.status(201).json({
      message: "New Note created successful",
      error: false,
      success: true,
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.delete("/notes/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid Id",
        error: true,
        success: false,
      });
    }

    const noteIndex = notes?.findIndex((n) => n.id === id);

    if (noteIndex === -1) {
      return res.status(400).json({
        message: "Note not found",
        error: true,
        success: false,
      });
    }

    notes.splice(noteIndex, 1);

    return res.status(200).json({
      message: "Note deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.put("/users/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid User Id",
        error: true,
        success: false,
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Please provide the name field",
        error: true,
        success: false,
      });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    user.name = name;

    return res.status(200).json({
      message: "User updated successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.get("/user-notes/:userId", (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: "Invalid User Id",
        error: true,
        success: false,
      });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const userNotes = notes.filter((n) => n.userId === userId);

    return res.status(200).json({
      message: "User Notes fetched successfully",
      error: false,
      success: true,
      data: userNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide required credentials",
        error: true,
        success: false,
      });
    }
    if (email === "admin@test.com" && password === "123456") {
      return res.status(200).json({
        message: "Login successful",
        error: false,
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.get("/profile/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid User Id",
        error: true,
        success: false,
      });
    }
    const user = users.filter((u) => u.id === id);
    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.post("/sum", (req, res) => {
  try {
    const { a, b } = req.body;

    const numA = Number(a);
    const numB = Number(b);

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      return res.status(400).json({
        message: "Please provide both the number",
        error: true,
        success: false,
      });
    }

    const total = numA + numB;

    return res.status(200).json({
      message: "Sum calculated",
      error: false,
      success: true,
      data: { total },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
