import { NextFunction, Request, Response } from "express";
import { controller, get, use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!!req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}

@controller("")
export class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`
              <div style="width: 300px; margin: 0 auto;">
                  <h1 style="font-size: 32px; text-align: center;">Welcome to my website!</h1>
                  <p style="font-size: 16px; text-align: center;">I'm so glad you're here.</p>
                  <a href="/auth/logout" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Logout</a>
              </div>
          `);
    } else {
      res.send(`
              <div style="width: 300px; margin: 0 auto;">
                  <h1 style="font-size: 32px; text-align: center;">You are not logged in!</h1>
                  <a href="/auth/login" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Login</a>
              </div>
          `);
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("Welcome to the protected route, logged in user");
  }
}
