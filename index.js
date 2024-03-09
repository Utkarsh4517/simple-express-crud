import express, { json } from "express";
import userslist from "./MOCK_DATA.json" assert { type: "json" };
import fs from "fs";
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => res.json(userslist));

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${userslist.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = userslist.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  userslist.push({ ...body, id: userslist.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(userslist), (err, data) => {
    return res.json({ status: "success", id: userslist.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUserData = req.body;
  const userIndex = userslist.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  userslist[userIndex] = { ...userslist[userIndex], ...updatedUserData };
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(userslist, null, 2),
    (err, data) => {
      return res.json({ status: "success", id: userIndex + 1 });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = userslist.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  userslist.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(userslist), (err, data) => {
    return res.json({ status: "Success", id: userIndex + 1 });
  });
});

app.listen(8000, () => "Server started");
