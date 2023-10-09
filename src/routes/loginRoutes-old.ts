import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!!req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
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
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (!!email && !!password && email === "hi@fabio.pt" && password === "123") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid credentials");
  }
});

router.get("/", (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.send(`
        <div style="width: 300px; margin: 0 auto;">
            <h1 style="font-size: 32px; text-align: center;">Welcome to my website!</h1>
            <p style="font-size: 16px; text-align: center;">I'm so glad you're here.</p>
            <a href="/logout" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Logout</a>
        </div>
    `);
  } else {
    res.send(`
        <div style="width: 300px; margin: 0 auto;">
            <h1 style="font-size: 32px; text-align: center;">You are not logged in!</h1>
            <a href="/login" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Login</a>
        </div>
    `);
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = { loggedIn: false };
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to the protected route, logged in user");
});

export { router };
