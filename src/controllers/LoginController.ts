import { NextFunction, Request, Response } from "express";
import { get, controller, use, bodyValidator, post } from "./decorators";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
        <form action="" method="POST" style="width: 300px; margin: 0 auto;">
          <div style="margin-top: 1rem">
              <label for="email" style="font-size: 16px; font-weight: bold;">Email:</label>
              <input type="email" id="email" name="email" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div style="margin-top: 1rem">
              <label for="password" style="font-size: 16px; font-weight: bold;">Password:</label>
              <input type="password" id="password" name="password" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
          </div>
          <div style="margin-top: 1rem">
              <button type="submit" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Login</button>
          </div>
          </form>
        `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "hi@fabio.pt" && password === "123") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid credentials");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = { loggedIn: false };
    res.redirect("/");
  }
}
