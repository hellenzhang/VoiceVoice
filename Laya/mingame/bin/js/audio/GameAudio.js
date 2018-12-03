/**
 * 音频管理器，单例
 */
var GameAudio = /** @class */ (function () {
    function GameAudio() {
        this.enableSound = false;
        this.enableMusic = true;
    }
    Object.defineProperty(GameAudio, "inst", {
        get: function () {
            if (GameAudio._inst == null) {
                GameAudio._inst = new GameAudio();
            }
            return GameAudio._inst;
        },
        enumerable: true,
        configurable: true
    });
    GameAudio.prototype.Init = function () {
        //音频
        Laya.SoundManager.autoReleaseSound = false;
        this.enableSound = false;
        this.enableMusic = false;
    };
    GameAudio.prototype.PlaySound = function (url) {
        if (!this.enableSound) {
            return;
        }
        return Laya.SoundManager.playSound(url);
    };
    //-
    GameAudio.prototype.EatCoin = function () {
        this.PlaySound("res/audio/sound/coin.wav");
    };
    GameAudio.prototype.EatItem = function () {
        this.PlaySound("res/audio/sound/eat_item.wav");
    };
    GameAudio.prototype.KillMob = function () {
        var sc = this.PlaySound("res/audio/sound/mob_die.wav");
        //  sc.volume=0.18;
    };
    GameAudio.prototype.KillHero = function () {
        var sc = this.PlaySound("res/audio/sound/mob_die.wav");
        //  sc.volume=0.18;
    };
    return GameAudio;
}());
//# sourceMappingURL=GameAudio.js.map