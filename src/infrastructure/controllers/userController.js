import { registerUser } from "../../application/usecases/registerUser.js";
import { loginUser } from "../../application/usecases/loginUser.js";
import { logoutUser } from "../../application/usecases/logoutUser.js";

export const signup = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { id, token, exp } = req.user;
    const expiredAt = new Date(exp * 1000);

    const result = await logoutUser(id, token, expiredAt);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
