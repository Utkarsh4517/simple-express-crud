import express, { json } from "express";
import userslist from "./MOCK_DATA.json" assert { type: "json" };
const app = express();

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
  // TODO: Create new user
  return res.json({ status: "pending" });
});

app.patch("/api/users/:id", (req, res) => {
    // TODO: Edit an user
  const id = Number(req.params.id);
  const user = userslist.find((user) => user.id === id);
  return res.json({ status: "pending"})
});

app.delete("/api/users/:id", (req, res) => {
    // TODO: Delete an user
    const id = Number(req.params.id);
    const user = userslist.find((user) => user.id === id);
    return res.json({ status: "pending"})
})

app.listen(8000, () => "Server started");