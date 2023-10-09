"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
let LoginController = class LoginController {
    getLogin(req, res) {
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
    postLogin(req, res) {
        const { email, password } = req.body;
        if (email === "hi@fabio.pt" && password === "123") {
            req.session = { loggedIn: true };
            res.redirect("/");
        }
        else {
            res.send("Invalid credentials");
        }
    }
    getLogout(req, res) {
        req.session = { loggedIn: false };
        res.redirect("/");
    }
};
__decorate([
    (0, decorators_1.get)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogin", null);
__decorate([
    (0, decorators_1.post)("/login"),
    (0, decorators_1.bodyValidator)("email", "password"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogout", null);
LoginController = __decorate([
    (0, decorators_1.controller)("/auth")
], LoginController);
