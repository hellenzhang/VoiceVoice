/**
 *GamePage的游戏流程，云，清怪，boss,hero死亡~
 */
var GamePagePhase = /** @class */ (function () {
    function GamePagePhase(id, gamePage) {
        this.id = id;
        this.gamePage = gamePage;
        this.safeTimer = new SafeTimer();
    }
    GamePagePhase.prototype.OnEnter = function (data) { };
    GamePagePhase.prototype.OnUpdate = function () { };
    GamePagePhase.prototype.OnExit = function () { };
    return GamePagePhase;
}());
//# sourceMappingURL=GamePagePhase.js.map