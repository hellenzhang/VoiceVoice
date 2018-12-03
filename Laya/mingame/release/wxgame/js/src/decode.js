var Frame = require('./frame');
var util = require('./util');
var consts = require('./consts');
var Frameheader = require('./frameheader');
var codejs = require('../../code');
//var code
const invalidLength = -1;

var Mp3 = {
    // Create new source object with specified ArrayBuffer
    newSource: function(buf) {
        var source = {
            buf: buf,
            pos: 0
        };

        /**
         * Seek the buffer position
         * 指定资源的当前位置
         *
         * @param position
         * @param whence
         */
        source.seek = function (position) {
            if (position < 0 || position > source.buf.byteLength) {
                return {
                    err: "position not correct"
                }
            }
            source.pos = position;
            return {
                pos: source.pos
            };
        };
        /**
         * 从当前位置开始，获取length个字节
         */

        source.readFull = function (length) {
            try {
                var l = Math.min(source.buf.byteLength - source.pos, length);
                var buf = new Uint8Array(source.buf, source.pos, l);
                source.pos += buf.byteLength;
                return {
                    buf: buf,
                    err: null
                };
            } catch (e) {
                return {
                    buf: null,
                    err: e.toString()
                }
            }
        };
        /**
         * 获取当前音频的位置？？如果位置是4那岂不是返回的1
         */

        source.getPos = function () {
            if (source.pos > 3) {
                return source.pos - 3; // skip tags
            }
            return source.pos;
        };
        /**
         * 跳过标签
         */

        source.skipTags = function () {
            var result = source.readFull(3);
            if (result.err) {
                return {
                    err: result.err
                }
            }
            var buf = result.buf;

            // decode UTF-8
            var t = String.fromCharCode.apply(null, buf);
            switch (t) {
                case "TAG":
                    result = source.readFull(125);
                    if (result.err) {
                        return {
                            err: result.err
                        }
                    }
                console.error("--TAG-----：");
                    buf = result.buf;
                    break;
                case 'ID3':
                    // Skip version (2 bytes) and flag (1 byte)
                    result = source.readFull(3);
                    if (result.err) {
                        return {
                            err: result.err
                        }
                    }
                console.error("--ID3-----：");
                    result = source.readFull(4);
                    if (result.err) {
                        return {
                            err: result.err
                        }
                    }
                    buf = result.buf;
                    if (buf.byteLength !== 4) {
                        return {
                            err: "data not enough."
                        };
                    }
                    var size = (((buf[0] >>> 0) << 21) >>> 0) | (((buf[1] >>> 0) << 14) >>> 0) | (((buf[2] >>> 0) << 7) >>> 0) | (buf[3] >>> 0);
                    result = source.readFull(size);
                    if (result.err) {
                        return {
                            err: result.err
                        }
                    }
                    buf = result.buf;
                    break;
                default:
                    source.unread(buf);
                    break;
            }
            return {};
        };

        source.unread = function (buf) {
            source.pos -= buf.byteLength
        };
        /**
         * 复位
         */

        source.rewind = function() {
            source.pos = 0;
        };

        return source;
    },
    /**
     * 可以进行资源数据设置了
     */

    newDecoder: function (buf) {
      //这个获取到的是跳过标头的
        var s = Mp3.newSource(buf);

        var decoder = {
          //原始资源
            source: s,
            //采样率
            sampleRate: 0,
            //帧
            frame: null,
            frameStarts: [],
            buf: null,
            pos: 0,
            length: invalidLength
        };

        // ======= Methods of decoder :: start =========
        decoder.readFrame = function () {
        //  console.log("--读取内容帧-------------------------");
          //读取内容帧
            var result = Frame.read(decoder.source, decoder.source.pos, decoder.frame);
            if (result.err) {
                return {
                    err: result.err
                }
            }
            decoder.frame = result.f;
            var pcm_buf = decoder.frame.decode();
            decoder.buf = util.concatBuffers(decoder.buf, pcm_buf);
            return {};
        };

        decoder.decode = function () {
            var result;
        //  console.error("--读取内容帧-------------------------");
          var t_num=0;
            while(true) {
                result = decoder.readFrame();
              t_num++;
                if (result.err) {
                    break;
                }
                if(t_num==1)
                {
                  // var t_temp = codejs.GamePagesManager.inst.GetPage(GameMenuPage.ID);
                  // var ints = new Int16Array(decoder.buf, 0, decoder.buf/2);
                  // t_temp.DrawAudio(ints);
                }
            }
       //   console.error("--次数-----：" + t_num);
            return decoder.buf;
        };

        decoder.ensureFrameStartsAndLength = function () {
            if (decoder.length !== invalidLength) {
                return {}
            }

            var pos = decoder.source.pos;

            decoder.source.rewind();

            var r = decoder.source.skipTags();
            if (r.err) {
                return {
                    err: r.err
                }
            }

            var l = 0;
            while(true) {
                var result = Frameheader.read(decoder.source, decoder.source.pos);
                if (result.err) {
                    if (result.err.toString().indexOf("UnexpectedEOF") > -1) {
                        break;
                    }
                    return {
                        err: result.err
                    };
                }
                decoder.frameStarts.push(result.position);
                l += consts.BytesPerFrame;

                result = decoder.source.readFull(result.h.frameSize() - 4); // move to next frame position
                if (result.err) {
                    break;
                }
            }
            decoder.length = l;

            var result = decoder.source.seek(pos); // reset to beginning position
            if (result.err) {
                return result;
            }

            return {};
        };
        // ======= Methods of decoder :: end =========

        var r = s.skipTags();
        if (r && r.err) {
            return null;
        }

        var result = decoder.readFrame();
        if (result.err) {
            return null;
        }

        decoder.sampleRate = decoder.frame.samplingFrequency();

        result = decoder.ensureFrameStartsAndLength();
        if (result.err) {
            return null;
        }

        return decoder;
    }
};

module.exports = Mp3;
