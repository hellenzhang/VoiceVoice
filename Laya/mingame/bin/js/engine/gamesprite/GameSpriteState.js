/**
 * 精灵状态机的状态
 */
var GameSpriteState = /** @class */ (function () {
    //protected gameSpr: GameSprite 用法很好，不要动
    function GameSpriteState(id, gameSpr) {
        this.id = id;
        this.gameSpr = gameSpr;
        this.spr = gameSpr.spr;
        this.safeTimer = new SafeTimer();
    }
    GameSpriteState.prototype.OnEnter = function (data) { };
    GameSpriteState.prototype.OnUpdate = function () { };
    GameSpriteState.prototype.OnExit = function () { };
    return GameSpriteState;
}());
//# sourceMappingURL=GameSpriteState.js.map