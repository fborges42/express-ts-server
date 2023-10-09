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
exports.RootController = void 0;
const decorators_1 = require("./decorators");
function requireAuth(req, res, next) {
    var _a;
    if (!!((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn)) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted");
}
let RootController = class RootController {
    getRoot(req, res) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
            res.send(`
              <div style="width: 300px; margin: 0 auto;">
                  <h1 style="font-size: 32px; text-align: center;">Welcome to my website!</h1>
                  <p style="font-size: 16px; text-align: center;">I'm so glad you're here.</p>
                  <a href="/auth/logout" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Logout</a>
              </div>
          `);
        }
        else {
            res.send(`
              <div style="width: 300px; margin: 0 auto;">
                  <h1 style="font-size: 32px; text-align: center;">You are not logged in!</h1>
                  <a href="/auth/login" style="width: 100%; padding: 10px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Login</a>
              </div>
          `);
        }
    }
    getProtected(req, res) {
        res.send("Welcome to the protected route, logged in user");
    }
};
exports.RootController = RootController;
__decorate([
    (0, decorators_1.get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
__decorate([
    (0, decorators_1.get)("/protected"),
    (0, decorators_1.use)(requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getProtected", null);
exports.RootController = RootController = __decorate([
    (0, decorators_1.controller)("")
], RootController);
