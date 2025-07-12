import { registerUser } from "../../application/usecases/registerUser.js";

export const signup = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
