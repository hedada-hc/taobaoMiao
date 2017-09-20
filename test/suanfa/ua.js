/*! 2017-09-19 21:50:14 v7.6.10 */
!function(e) {
    function i(n) {
        if (o[n])
            return o[n].exports;
        var r = o[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(r.exports, r, r.exports, i),
        r.loaded = !0,
        r.exports
    }
    var o = {};
    return i.m = e,
    i.c = o,
    i.p = "",
    i(0)
}([function(e, i) {
    "use strict";
    var o = window
      , n = document;
    !function() {
        var e = 2
          , r = "ali_analytics";
        if (o[r] && o[r].ua && e <= o[r].ua.version)
            return void (i.info = o[r].ua);
        var t, a, d, s, c, u, h, l, m, b, f, v, p, w, g, x, z, O = o.navigator, k = O.appVersion, T = O && O.userAgent || "", y = function(e) {
            var i = 0;
            return parseFloat(e.replace(/\./g, function() {
                return 0 === i++ ? "." : ""
            }))
        }, _ = function(e, i) {
            var o, n;
            i[o = "trident"] = .1,
            (n = e.match(/Trident\/([\d.]*)/)) && n[1] && (i[o] = y(n[1])),
            i.core = o
        }, N = function(e) {
            var i, o;
            return (i = e.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (o = i[1] || i[2]) ? y(o) : 0
        }, P = function(e) {
            return e || "other"
        }, M = function(e) {
            function i() {
                for (var i = [["Windows NT 5.1", "winXP"], ["Windows NT 6.1", "win7"], ["Windows NT 6.0", "winVista"], ["Windows NT 6.2", "win8"], ["Windows NT 10.0", "win10"], ["iPad", "ios"], ["iPhone;", "ios"], ["iPod", "ios"], ["Macintosh", "mac"], ["Android", "android"], ["Ubuntu", "ubuntu"], ["Linux", "linux"], ["Windows NT 5.2", "win2003"], ["Windows NT 5.0", "win2000"], ["Windows", "winOther"], ["rhino", "rhino"]], o = 0, n = i.length; o < n; ++o)
                    if (e.indexOf(i[o][0]) !== -1)
                        return i[o][1];
                return "other"
            }
            function r(e, i, n, r) {
                var t, a = o.navigator.mimeTypes;
                try {
                    for (t in a)
                        if (a.hasOwnProperty(t) && a[t][e] == i) {
                            if (void 0 !== n && r.test(a[t][n]))
                                return !0;
                            if (void 0 === n)
                                return !0
                        }
                    return !1
                } catch (e) {
                    return !1
                }
            }
            var t, a, d, s, c, u, h, l = "", m = l, b = l, f = [6, 9], v = "{{version}}", p = "<!--[if IE " + v + "]><s></s><![endif]-->", w = n && n.createElement("div"), g = [], x = {
                webkit: void 0,
                edge: void 0,
                trident: void 0,
                gecko: void 0,
                presto: void 0,
                chrome: void 0,
                safari: void 0,
                firefox: void 0,
                ie: void 0,
                ieMode: void 0,
                opera: void 0,
                mobile: void 0,
                core: void 0,
                shell: void 0,
                phantomjs: void 0,
                os: void 0,
                ipad: void 0,
                iphone: void 0,
                ipod: void 0,
                ios: void 0,
                android: void 0,
                nodejs: void 0,
                extraName: void 0,
                extraVersion: void 0
            };
            if (w && w.getElementsByTagName && (w.innerHTML = p.replace(v, ""),
            g = w.getElementsByTagName("s")),
            g.length > 0) {
                for (_(e, x),
                s = f[0],
                c = f[1]; s <= c; s++)
                    if (w.innerHTML = p.replace(v, s),
                    g.length > 0) {
                        x[b = "ie"] = s;
                        break
                    }
                !x.ie && (d = N(e)) && (x[b = "ie"] = d)
            } else
                ((a = e.match(/AppleWebKit\/*\s*([\d.]*)/i)) || (a = e.match(/Safari\/([\d.]*)/))) && a[1] ? (x[m = "webkit"] = y(a[1]),
                (a = e.match(/OPR\/(\d+\.\d+)/)) && a[1] ? x[b = "opera"] = y(a[1]) : (a = e.match(/Chrome\/([\d.]*)/)) && a[1] ? x[b = "chrome"] = y(a[1]) : (a = e.match(/\/([\d.]*) Safari/)) && a[1] ? x[b = "safari"] = y(a[1]) : x.safari = x.webkit,
                (a = e.match(/Edge\/([\d.]*)/)) && a[1] && (m = b = "edge",
                x[m] = y(a[1])),
                / Mobile\//.test(e) && e.match(/iPad|iPod|iPhone/) ? (x.mobile = "apple",
                a = e.match(/OS ([^\s]*)/),
                a && a[1] && (x.ios = y(a[1].replace("_", "."))),
                t = "ios",
                a = e.match(/iPad|iPod|iPhone/),
                a && a[0] && (x[a[0].toLowerCase()] = x.ios)) : / Android/i.test(e) ? (/Mobile/.test(e) && (t = x.mobile = "android"),
                a = e.match(/Android ([^\s]*);/),
                a && a[1] && (x.android = y(a[1]))) : (a = e.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (x.mobile = a[0].toLowerCase()),
                (a = e.match(/PhantomJS\/([^\s]*)/)) && a[1] && (x.phantomjs = y(a[1]))) : (a = e.match(/Presto\/([\d.]*)/)) && a[1] ? (x[m = "presto"] = y(a[1]),
                (a = e.match(/Opera\/([\d.]*)/)) && a[1] && (x[b = "opera"] = y(a[1]),
                (a = e.match(/Opera\/.* Version\/([\d.]*)/)) && a[1] && (x[b] = y(a[1])),
                (a = e.match(/Opera Mini[^;]*/)) && a ? x.mobile = a[0].toLowerCase() : (a = e.match(/Opera Mobi[^;]*/)) && a && (x.mobile = a[0]))) : (d = N(e)) ? (x[b = "ie"] = d,
                _(e, x)) : (a = e.match(/Gecko/)) && (x[m = "gecko"] = .1,
                (a = e.match(/rv:([\d.]*)/)) && a[1] && (x[m] = y(a[1]),
                /Mobile|Tablet/.test(e) && (x.mobile = "firefox")),
                (a = e.match(/Firefox\/([\d.]*)/)) && a[1] && (x[b = "firefox"] = y(a[1])));
            t || (t = i());
            var z, O, T;
            if (!r("type", "application/vnd.chromium.remoting-viewer")) {
                z = "scoped"in n.createElement("style"),
                T = "v8Locale"in o;
                try {
                    O = o.external || void 0
                } catch (e) {}
                if (a = e.match(/360SE/))
                    u = "360";
                else if ((a = e.match(/SE\s([\d.]*)/)) || O && "SEVersion"in O)
                    u = "sougou",
                    h = y(a[1]) || .1;
                else if ((a = e.match(/Maxthon(?:\/)+([\d.]*)/)) && O) {
                    u = "maxthon";
                    try {
                        h = y(O.max_version || a[1])
                    } catch (e) {
                        h = .1
                    }
                } else
                    z && T ? u = "360se" : z || T || !/Gecko\)\s+Chrome/.test(k) || x.opera || x.edge || (u = "360ee")
            }
            (a = e.match(/TencentTraveler\s([\d.]*)|QQBrowser\/([\d.]*)/)) ? (u = "tt",
            h = y(a[2]) || .1) : (a = e.match(/LBBROWSER/)) || O && "LiebaoGetVersion"in O ? u = "liebao" : (a = e.match(/TheWorld/)) ? (u = "theworld",
            h = 3) : (a = e.match(/TaoBrowser\/([\d.]*)/)) ? (u = "taobao",
            h = y(a[1]) || .1) : (a = e.match(/UCBrowser\/([\d.]*)/)) && (u = "uc",
            h = y(a[1]) || .1),
            x.os = t,
            x.core = x.core || m,
            x.shell = b,
            x.ieMode = x.ie && n.documentMode || x.ie,
            x.extraName = u,
            x.extraVersion = h;
            var P = o.screen.width
              , M = o.screen.height;
            return x.resolution = P + "x" + M,
            x
        }, S = function(e) {
            function i(e) {
                return Object.prototype.toString.call(e)
            }
            function o(e, o, n) {
                if ("[object Function]" == i(o) && (o = o(n)),
                !o)
                    return null;
                var r = {
                    name: e,
                    version: ""
                }
                  , t = i(o);
                if (o === !0)
                    return r;
                if ("[object String]" === t) {
                    if (n.indexOf(o) !== -1)
                        return r
                } else if (o.exec) {
                    var a = o.exec(n);
                    if (a)
                        return a.length >= 2 && a[1] ? r.version = a[1].replace(/_/g, ".") : r.version = "",
                        r
                }
            }
            var n = {
                name: "other",
                version: ""
            };
            e = (e || "").toLowerCase();
            for (var r = [["nokia", function(e) {
                return e.indexOf("nokia ") !== -1 ? /\bnokia ([0-9]+)?/ : /\bnokia([a-z0-9]+)?/
            }
            ], ["samsung", function(e) {
                return e.indexOf("samsung") !== -1 ? /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/ : /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
            }
            ], ["wp", function(e) {
                return e.indexOf("windows phone ") !== -1 || e.indexOf("xblwp") !== -1 || e.indexOf("zunewp") !== -1 || e.indexOf("windows ce") !== -1
            }
            ], ["pc", "windows"], ["ipad", "ipad"], ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"], ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/], ["hongmi", /\bhm[ \-]?([a-z0-9]+)/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu", function(e) {
                return e.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9x]{1,3})\b/
            }
            ], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei", function(e) {
                var i = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
                return e.indexOf("huawei-huawei") !== -1 ? /\bhuawei\-huawei\-([a-z0-9\-]+)/ : i.test(e) ? i : /\bhuawei[ _\-]?([a-z0-9]+)/
            }
            ], ["lenovo", function(e) {
                return e.indexOf("lenovo-lenovo") !== -1 ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/ : /\blenovo[ \-]?([a-z0-9]+)/
            }
            ], ["zte", function(e) {
                return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/ : /\bzte[ _\-]?([a-su-z0-9\+]+)/
            }
            ], ["vivo", /\bvivo(?: ([a-z0-9]+))?/], ["htc", function(e) {
                return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/ : /\bhtc[ _\-]?([a-z0-9 ]+)/
            }
            ], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", /\bandroid\b|\badr\b/], ["blackberry", function(e) {
                return e.indexOf("blackberry") >= 0 ? /\bblackberry\s?(\d+)/ : "bb10"
            }
            ]], t = 0; t < r.length; t++) {
                var a = r[t][0]
                  , d = r[t][1]
                  , s = o(a, d, e);
                if (s) {
                    n = s;
                    break
                }
            }
            return n
        }, E = 1;
        try {
            t = M(T),
            a = S(T),
            d = t.os,
            s = t.shell,
            c = t.core,
            u = t.resolution,
            h = t.extraName,
            l = t.extraVersion,
            m = a.name,
            b = a.version,
            v = d ? d + (t[d] ? t[d] : "") : "",
            p = s ? s + parseInt(t[s]) : "",
            w = c,
            g = u,
            x = h ? h + (l ? parseInt(l) : "") : "",
            z = m + b
        } catch (e) {}
        f = {
            p: E,
            o: P(v),
            b: P(p),
            w: P(w),
            s: g,
            mx: x,
            ism: z
        },
        o[r] || (o[r] = {}),
        o[r].ua || (o[r].ua = {}),
        o.goldlog || (o.goldlog = {}),
        i.info = o[r].ua = goldlog._aplus_client = {
            version: e,
            ua_info: f
        }
    }()
}
]);
/*! 2017-09-12 17:15:11 v0.1.3 */
!function(o) {
    function t(a) {
        if (e[a])
            return e[a].exports;
        var r = e[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return o[a].call(r.exports, r, r.exports, t),
        r.loaded = !0,
        r.exports
    }
    var e = {};
    return t.m = o,
    t.c = e,
    t.p = "",
    t(0)
}([function(o, t, e) {
    "use strict";
    !function() {
        var o = window.goldlog || (window.goldlog = {});
        o._aplus_cplugin_m || (o._aplus_cplugin_m = e(1).run())
    }()
}
, function(o, t, e) {
    "use strict";
    var a = e(2)
      , r = e(3)
      , n = e(4)
      , s = navigator.sendBeacon ? "post" : "get";
    e(5).run(),
    t.run = function() {
        return {
            status: "complete",
            do_tracker_jserror: function(o) {
                var t = new n({
                    logkey: o ? o.logkey : "",
                    ratio: params.ratio || a.jsErrorRecordRatio
                });
                try {
                    var e = ["Message: " + o.message, "Error object: " + o.error].join(" - ")
                      , c = goldlog.spm_ab || []
                      , i = location.hostname + location.pathname;
                    t.run({
                        code: 110,
                        page: i,
                        msg: "record_jserror_by" + s + "_" + o.message,
                        spm_a: c[0],
                        spm_b: c[1],
                        c1: e,
                        c2: o.filename,
                        c3: location.protocol + "//" + i
                    })
                } catch (o) {
                    r.logger({
                        msg: o
                    })
                }
            },
            do_tracker_lostpv: function(o) {
                var t = !1;
                try {
                    if (o && o.page) {
                        var e = o.spm_ab ? o.spm_ab.split(".") : []
                          , c = "record_lostpv_by" + s + "_" + o.msg
                          , i = new n({
                            ratio: o.ratio || a.lostPvRecordRatio
                        });
                        i.run({
                            code: 102,
                            page: o.page,
                            msg: c,
                            spm_a: e[0],
                            spm_b: e[1],
                            c1: o.duration,
                            c2: o.page_url
                        }),
                        t = !0
                    }
                } catch (o) {
                    r.logger({
                        msg: o
                    })
                }
                return t
            },
            do_tracker_obsolete_inter: function(o) {
                var t = !1;
                try {
                    if (o && o.page) {
                        var e = o.spm_ab ? o.spm_ab.split(".") : []
                          , c = "record_obsolete interface be called by" + s
                          , i = new n({
                            ratio: o.ratio || a.obsoleteInterRecordRatio
                        });
                        i.run({
                            code: 109,
                            page: o.page,
                            msg: c,
                            spm_a: e[0],
                            spm_b: e[1],
                            c1: o.interface_name,
                            c2: o.interface_params
                        }),
                        t = !0
                    }
                } catch (o) {
                    r.logger({
                        msg: o
                    })
                }
                return t
            },
            do_tracker_browser_support: function(o) {
                var t = !1;
                try {
                    if (o && o.page) {
                        var e = o.spm_ab ? o.spm_ab.split(".") : []
                          , c = new n({
                            ratio: o.ratio || a.browserSupportRatio
                        })
                          , i = goldlog._aplus_client || {}
                          , l = i.ua_info || {};
                        c.run({
                            code: 111,
                            page: o.page,
                            msg: o.msg + "_by" + s,
                            spm_a: e[0],
                            spm_b: e[1],
                            c1: [l.o, l.b, l.w].join("_"),
                            c2: o.etag || "",
                            c3: o.cna || ""
                        }),
                        t = !0
                    }
                } catch (o) {
                    r.logger({
                        msg: o
                    })
                }
                return t
            }
        }
    }
}
, function(o, t) {
    "use strict";
    t.lostPvRecordRatio = "0.01",
    t.obsoleteInterRecordRatio = "0.01",
    t.jsErrorRecordRatio = "0.01",
    t.browserSupportRatio = "0.01",
    t.goldlogQueueRatio = "0.01"
}
, function(o, t) {
    "use strict";
    var e = function(o) {
        var t = o.level || "warn";
        window.console && window.console[t] && window.console[t](o.msg)
    };
    t.logger = e,
    t.assign = function(o, t) {
        if ("function" != typeof Object.assign) {
            var e = function(o) {
                if (null === o)
                    throw new TypeError("Cannot convert undefined or null to object");
                for (var t = Object(o), e = 1; e < arguments.length; e++) {
                    var a = arguments[e];
                    if (null !== a)
                        for (var r in a)
                            Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
                }
                return t
            };
            return e(o, t)
        }
        return Object.assign({}, o, t)
    }
    ,
    t.makeCacheNum = function() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }
    ,
    t.obj2param = function(o) {
        var t, e, a = [];
        for (t in o)
            o.hasOwnProperty(t) && (e = "" + o[t],
            a.push(t + "=" + encodeURIComponent(e)));
        return a.join("&")
    }
}
, function(o, t, e) {
    var a = e(3)
      , r = {
        ratio: 1,
        logkey: "fsp.1.1",
        gmkey: "",
        chksum: "H46747615"
    }
      , n = function(o) {
        o && "object" == typeof o || (o = r),
        this.opts = o,
        this.opts.ratio = o.ratio || r.ratio,
        this.opts.logkey = o.logkey || r.logkey,
        this.opts.gmkey = o.gmkey || r.gmkey,
        this.opts.chksum = o.chksum || r.chksum
    }
      , s = n.prototype;
    s.getRandom = function() {
        return Math.floor(100 * Math.random()) + 1
    }
    ,
    s.run = function(o) {
        var t, e, r = {
            pid: "aplus",
            code: 101,
            msg: "异常内容"
        }, n = "";
        try {
            var s = window.goldlog || {}
              , c = s._$ || {}
              , i = c.meta_info || {}
              , l = parseFloat(i["aplus-tracker-rate"]);
            if (t = this.opts || {},
            "number" == typeof l && l + "" != "NaN" || (l = t.ratio),
            e = this.getRandom(),
            e <= 100 * l) {
                n = "//gm.mmstat.com/" + t.logkey,
                o.rel = c.script_name + "@" + s.lver,
                o.type = o.code,
                o.uid = encodeURIComponent(s.getCookie("cna")),
                o = a.assign(r, o);
                var g = a.obj2param(o);
                s.tracker = s.send(n, {
                    cache: a.makeCacheNum(),
                    gokey: g,
                    logtype: "2"
                }, "POST")
            }
        } catch (o) {
            a.logger({
                msg: "tracker.run() exec error: " + o
            })
        }
    }
    ,
    o.exports = n
}
, function(o, t, e) {
    "use strict";
    var a = e(6)
      , r = function(o) {
        var t = window.goldlog || {}
          , e = t._$ = t._$ || {}
          , a = t.spm_ab ? t.spm_ab.join(".") : "0.0"
          , r = e.send_pv_count || 0;
        if (r < 1 && navigator && navigator.sendBeacon) {
            var n = window.goldlog_queue || (window.goldlog_queue = [])
              , s = location.hostname + location.pathname;
            n.push({
                action: ["goldlog", "_aplus_cplugin_m", "do_tracker_lostpv"].join("."),
                arguments: [{
                    page: s,
                    page_url: location.protocol + "//" + s,
                    duration: o,
                    spm_ab: a,
                    msg: "dom_state=" + document.readyState
                }]
            })
        }
    };
    t.run = function() {
        var o = new Date;
        a.on(window, "beforeunload", function() {
            var t = new Date
              , e = t.getTime() - o.getTime();
            r(e)
        })
    }
}
, function(o, t) {
    "use strict";
    var e = window
      , a = document
      , r = !!a.attachEvent
      , n = "attachEvent"
      , s = "addEventListener"
      , c = r ? n : s;
    t.getIframeUrl = function() {
        var o, t = "//g.alicdn.com";
        return o = goldlog && "function" == typeof goldlog.getCdnPath ? goldlog.getCdnPath() || t : t,
        "https:" + o + "/alilog/aplus_cplugin/@@APLUS_CPLUGIN_VER/ls.html"
    }
    ,
    t.on = function(o, t, a) {
        o[c]((r ? "on" : "") + t, function(o) {
            o = o || e.event;
            var t = o.target || o.srcElement;
            "function" == typeof a && a(o, t)
        }, !1)
    }
    ,
    t.checkLs = function() {
        var o;
        try {
            window.localStorage && (localStorage.setItem("test_log_cna", "1"),
            "1" === localStorage.getItem("test_log_cna") && (localStorage.removeItem("test_log_cna"),
            o = !0))
        } catch (t) {
            o = !1
        }
        return o
    }
    ,
    t.tracker_iframe_failed = function(o) {
        var t = window.goldlog_queue || (window.goldlog_queue = [])
          , e = goldlog.spm_ab ? goldlog.spm_ab.join(".") : "";
        t.push({
            action: "goldlog._aplus_cplugin_m.do_tracker_browser_support",
            arguments: [{
                page: location.hostname + location.pathname,
                msg: "createIframe failed id=" + o,
                browser_attr: navigator.userAgent,
                spm_ab: e
            }]
        })
    }
    ,
    t.tracker_ls_failed = function() {
        var o = window.goldlog_queue || (window.goldlog_queue = [])
          , t = goldlog.spm_ab ? goldlog.spm_ab.join(".") : "";
        o.push({
            action: "goldlog._aplus_cplugin_m.do_tracker_browser_support",
            arguments: [{
                page: location.hostname + location.pathname,
                msg: "donot support localStorage",
                browser_attr: navigator.userAgent,
                spm_ab: t
            }]
        })
    }
    ,
    t.createIframe = function(o, t, e, r) {
        try {
            var n = a.getElementById(t);
            if (n)
                e();
            else {
                n = a.createElement("iframe"),
                n.style.width = "0px",
                n.style.height = "0px",
                n.style.display = "none",
                n.src = o,
                t && (n.id = t),
                n.attachEvent ? (n.attachEvent("onload", e),
                n.attachEvent("onerror", r)) : (n.onload = e,
                n.onerror = r);
                var s = a.getElementsByTagName("body")[0];
                s.appendChild(n)
            }
        } catch (o) {
            r()
        }
    }
    ,
    t.processMsgData = function(o) {
        var t = {};
        try {
            t = "string" == typeof o ? JSON.parse(o) : o,
            t || (t = {})
        } catch (o) {
            t = {}
        }
        return t
    }
    ,
    t.do_pub_fn = function(o, t) {
        var e = window.goldlog_queue || (window.goldlog_queue = []);
        e.push({
            action: "goldlog.aplus_pubsub.publish",
            arguments: [o, t]
        }),
        e.push({
            action: "goldlog.aplus_pubsub.cachePubs",
            arguments: [o, t]
        })
    }
}
]);
/*! 2017-09-19 21:49:59 v7.6.10 */
!function(t) {
    function e(o) {
        if (n[o])
            return n[o].exports;
        var a = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return t[o].call(a.exports, a, a.exports, e),
        a.loaded = !0,
        a.exports
    }
    var n = {};
    return e.m = t,
    e.c = n,
    e.p = "",
    e(0)
}([function(t, e, n) {
    t.exports = n(1)
}
, function(t, e, n) {
    "use strict";
    !function() {
        var t = function() {
            n(2);
            var e = n(5);
            if (e.doPubMsg(["goldlogReady", "running"]),
            document.getElementsByTagName("body").length) {
                var o = window
                  , a = "g_tb_aplus_loaded";
                if (o[a])
                    return;
                o[a] = 1,
                n(6).initGoldlog(),
                n(83).init()
            } else
                setTimeout(function() {
                    t()
                }, 50)
        };
        t()
    }()
}
, function(t, e, n) {
    "use strict";
    !function() {
        var t = window.goldlog || (window.goldlog = {})
          , e = n(3);
        t.aplus_pubsub || (t.aplus_pubsub = e.create())
    }()
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        if ("function" != typeof t)
            throw new TypeError(t + " is not a function");
        return t
    }
    var a = n(4)
      , r = function(t) {
        for (var e = t.length, n = new Array(e - 1), o = 1; o < e; o++)
            n[o - 1] = t[o];
        return n
    }
      , i = a.extend({
        create: function(t) {
            var e = new this;
            for (var n in t)
                e[n] = t[n];
            return e.handlers = [],
            e.pubs = {},
            e
        },
        setHandlers: function(t) {
            this.handlers = t
        },
        subscribe: function(t, e) {
            o(e);
            var n = this
              , a = n.pubs || {};
            if (a[t]) {
                var r = a[t]();
                e.apply(n, r)
            }
            var i = n.handlers;
            return t in i || (i[t] = []),
            i[t].push(e),
            n.setHandlers(i),
            n
        },
        subscribeOnce: function(t, e) {
            o(e);
            var n, a = this;
            return this.subscribe.call(this, t, n = function() {
                a.unsubscribe.call(a, t, n);
                var o = Array.prototype.slice.call(arguments);
                e.apply(a, o)
            }
            ),
            this
        },
        unsubscribe: function(t, e) {
            o(e);
            var n = this.handlers[t];
            if (!n)
                return this;
            if ("object" == typeof n && n.length > 0) {
                for (var a = 0; a < n.length; a++) {
                    var r = e.toString()
                      , i = n[a].toString();
                    r === i && n.splice(a, 1)
                }
                this.handlers[t] = n
            } else
                delete this.handlers[t];
            return this
        },
        publish: function(t) {
            var e = r(arguments)
              , n = this.handlers
              , o = n[t] ? n[t].length : 0;
            if (o > 0)
                for (var a = 0; a < o; a++)
                    n[t][a].apply(this, e);
            return this
        },
        cachePubs: function(t) {
            var e = this.pubs || {}
              , n = r(arguments);
            e[t] = function() {
                return n
            }
        }
    });
    t.exports = i
}
, function(t, e) {
    "use strict";
    function n() {}
    n.prototype.extend = function() {}
    ,
    n.prototype.create = function() {}
    ,
    n.extend = function(t) {
        return this.prototype.extend.call(this, t)
    }
    ,
    n.prototype.create = function(t) {
        var e = new this;
        for (var n in t)
            e[n] = t[n];
        return e
    }
    ,
    n.prototype.extend = function(t) {
        var e = function() {};
        try {
            "function" != typeof Object.create && (Object.create = function(t) {
                function e() {}
                return e.prototype = t,
                new e
            }
            ),
            e.prototype = Object.create(this.prototype);
            for (var n in t)
                e.prototype[n] = t[n];
            e.prototype.constructor = e,
            e.extend = e.prototype.extend,
            e.create = e.prototype.create
        } catch (t) {
            console.log(t)
        } finally {
            return e
        }
    }
    ,
    t.exports = n
}
, function(t, e) {
    "use strict";
    var n = function() {
        var t = window.goldlog || {}
          , e = t.aplus_pubsub || {}
          , n = "function" == typeof e.publish;
        return n ? e : ""
    };
    e.doPubMsg = function(t) {
        var e = n();
        e && e.publish.apply(e, t)
    }
    ,
    e.doCachePubs = function(t) {
        var e = n();
        e && "function" == typeof e.cachePubs && e.cachePubs.apply(e, t)
    }
    ,
    e.doSubMsg = function(t, e) {
        var o = n();
        o && "function" == typeof o.subscribe && o.subscribe(t, e)
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(7)
      , a = n(5)
      , r = n(8)
      , i = n(29)
      , s = i.getInfo()
      , u = "complete";
    e.initGoldlog = function() {
        var t = window.goldlog || (window.goldlog = {})
          , e = r.goldlog_path.init();
        for (var n in e)
            t[n] = e[n];
        var i = /TB\-PD/i.test(navigator.userAgent)
          , c = t._$ = t._$ || {};
        return c.meta_info = s,
        c.is_terminal = "aplus_wap" === r.script_name || i || "1" == s["aplus-terminal"],
        c.send_pv_count = 0,
        c.status = u,
        c.script_name = r.script_name,
        t.lver = r.lver,
        t.nameStorage = o.nameStorage,
        a.doPubMsg(["goldlogReady", u]),
        a.doCachePubs(["goldlogReady", u]),
        t
    }
}
, function(t, e) {
    "use strict";
    var n = function() {
        function t() {
            var t, e = [], r = !0;
            for (var l in p)
                p.hasOwnProperty(l) && (r = !1,
                t = p[l] || "",
                e.push(c(l) + s + c(t)));
            n.name = r ? o : a + c(o) + i + e.join(u)
        }
        function e(t, e, n) {
            t && (t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, function(e) {
                n.call(t, e)
            }))
        }
        var n = window;
        if (n.nameStorage)
            return n.nameStorage;
        var o, a = "nameStorage:", r = /^([^=]+)(?:=(.*))?$/, i = "?", s = "=", u = "&", c = encodeURIComponent, l = decodeURIComponent, p = {}, g = {};
        return function(t) {
            if (t && 0 === t.indexOf(a)) {
                var e = t.split(/[:?]/);
                e.shift(),
                o = l(e.shift()) || "";
                for (var n, i, s, c = e.join(""), g = c.split(u), f = 0, d = g.length; f < d; f++)
                    n = g[f].match(r),
                    n && n[1] && (i = l(n[1]),
                    s = l(n[2]) || "",
                    p[i] = s)
            } else
                o = t || ""
        }(n.name),
        g.setItem = function(e, n) {
            e && "undefined" != typeof n && (p[e] = String(n),
            t())
        }
        ,
        g.getItem = function(t) {
            return p.hasOwnProperty(t) ? p[t] : null
        }
        ,
        g.removeItem = function(e) {
            p.hasOwnProperty(e) && (p[e] = null,
            delete p[e],
            t())
        }
        ,
        g.clear = function() {
            p = {},
            t()
        }
        ,
        g.valueOf = function() {
            return p
        }
        ,
        g.toString = function() {
            var t = n.name;
            return 0 === t.indexOf(a) ? t : a + t
        }
        ,
        e(n, "beforeunload", function() {
            t()
        }),
        g
    }();
    e.nameStorage = n
}
, function(t, e, n) {
    "use strict";
    var o = n(9)
      , a = n(10)
      , r = n(11);
    e.APLUS_ENV = "production",
    e.lver = a.lver,
    e.toUtVersion = a.toUtVersion,
    e.script_name = a.script_name,
    e.recordTypes = o.recordTypes,
    e.KEY = o.KEY,
    e.context = r.context,
    e.context_prepv = r.context_prepv,
    e.aplus_init_plugins = n(18).aplus_init_plugins,
    e.plugins_pv = n(25).plugins_pv,
    e.plugins_prepv = n(58).plugins_prepv,
    e.context_hjlj = n(59),
    e.plugins_hjlj = n(61).plugins_hjlj,
    e.beforeUnload = n(68),
    e.initLoad = n(70),
    e.spmException = n(74),
    e.goldlog_path = n(75),
    e.is_auto_pv = "true",
    e.utilPvid = n(79),
    e.disablePvid = "false",
    e.mustSpmE = !0
}
, function(t, e) {
    "use strict";
    e.recordTypes = {
        hjlj: "COMMON_HJLJ",
        uhjlj: "DATACLICK_HJLJ",
        pv: "PV",
        prepv: "PREPV"
    },
    e.KEY = {
        NAME_STORAGE: {
            REFERRER: "wm_referrer",
            REFERRER_PV_ID: "refer_pv_id",
            LOST_PV_PAGE_DURATION: "lost_pv_page_duration",
            LOST_PV_PAGE_SPMAB: "lost_pv_page_spmab",
            LOST_PV_PAGE: "lost_pv_page",
            LOST_PV_PAGE_MSG: "lost_pv_page_msg"
        }
    }
}
, function(t, e) {
    "use strict";
    e.lver = "7.6.10",
    e.toUtVersion = "v20170919",
    e.script_name = "aplus_std"
}
, function(t, e, n) {
    "use strict";
    e.context = n(12),
    e.context_prepv = n(17)
}
, function(t, e, n) {
    "use strict";
    function o() {
        return {
            compose: {
                maxTimeout: 5500
            },
            etag: {
                egUrl: "//log.mmstat.com/eg.js",
                cna: i.getCookie("cna")
            }
        }
    }
    function a() {
        return r.assign(new s.initConfig, new o)
    }
    var r = n(13)
      , i = n(14)
      , s = n(16);
    t.exports = a
}
, function(t, e) {
    "use strict";
    function n(t, e) {
        return "function" != typeof Object.assign ? function(t) {
            if (null === t)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var o = arguments[n];
                if (null !== o)
                    for (var a in o)
                        Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a])
            }
            return e
        }(t, e) : Object.assign({}, t, e)
    }
    function o(t) {
        return "function" == typeof t
    }
    function a(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    function r(t) {
        return "string" == typeof t
    }
    function i(t) {
        return "undefined" == typeof t
    }
    function s(t, e) {
        return t.indexOf(e) > -1
    }
    var u = window;
    e.assign = n,
    e.makeCacheNum = function() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }
    ,
    e.each = function(t, e) {
        var n, o = t.length;
        for (n = 0; n < o; n++)
            e(t[n])
    }
    ,
    e.isStartWith = function(t, e) {
        return 0 === t.indexOf(e)
    }
    ,
    e.isEndWith = function(t, e) {
        var n = t.length
          , o = e.length;
        return n >= o && t.indexOf(e) == n - o
    }
    ,
    e.any = function(t, e) {
        var n, o = t.length;
        for (n = 0; n < o; n++)
            if (e(t[n]))
                return !0;
        return !1
    }
    ,
    e.isFunction = o,
    e.isArray = a,
    e.isString = r,
    e.isNumber = function(t) {
        return "number" == typeof t
    }
    ,
    e.isUnDefined = i,
    e.isContain = s;
    var c = function(t) {
        var e, n = t.constructor === Array ? [] : {};
        if ("object" == typeof t) {
            if (u.JSON && u.JSON.parse)
                e = JSON.stringify(t),
                n = JSON.parse(e);
            else
                for (var o in t)
                    n[o] = "object" == typeof t[o] ? c(t[o]) : t[o];
            return n
        }
    };
    e.cloneObj = c,
    e.cloneDeep = c
}
, function(t, e, n) {
    "use strict";
    function o(t, e, n) {
        n || (n = {});
        var o = new Date;
        "session" === n.expires || (n.expires && ("number" == typeof n.expires || n.expires.toUTCString) ? ("number" == typeof n.expires ? o.setTime(o.getTime() + 24 * n.expires * 60 * 60 * 1e3) : o = n.expires,
        e += "; expires=" + o.toUTCString()) : (o.setTime(o.getTime() + 63072e7),
        e += "; expires=" + o.toUTCString())),
        e += "; domain=" + (n.domain ? n.domain : u.getDomain(location.hostname)),
        e += "; path=" + (n.path ? n.path : "/"),
        i.cookie = t + "=" + e
    }
    function a(t) {
        var e = i.cookie.match(new RegExp("(?:^|;)\\s*" + t + "=([^;]+)"));
        return e ? e[1] : ""
    }
    function r() {
        var t = {};
        return s.each(l, function(e) {
            t[e] = a(e)
        }),
        t.cnaui = /\btanx\.com$/.test(c) ? a("cnaui") : "",
        t
    }
    var i = document
      , s = n(13)
      , u = n(15)
      , c = location.hostname;
    e.setCookie = o,
    e.getCookie = a;
    var l = ["tracknick", "thw", "cna"];
    e.getData = r
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        var e, n = t.split("."), o = n.length;
        return e = a.any(r, function(e) {
            return a.isEndWith(t, e)
        }) ? n.slice(o - 3) : n.slice(o - 2),
        e.join(".")
    }
    var a = n(13)
      , r = [".com.cn", ".net.cn", ".com.hk"];
    e.getDomain = o
}
, function(t, e, n) {
    "use strict";
    function o(t, e, n) {
        var o = window.goldlog || {}
          , s = o.getMetaInfo("aplus-ifr-pv") + "" == "1";
        return e ? r(t) ? "yt" : "m" : n && !s ? a.isContain(t, "wrating.com") ? "k" : i(t) || "y" : i(t) || "v"
    }
    var a = n(13)
      , r = function(t) {
        for (var e = ["youku.com", "soku.com", "tudou.com", "laifeng.com"], n = 0; n < e.length; n++) {
            var o = e[n];
            if (a.isContain(t, o))
                return !0
        }
        return !1
    }
      , i = function(t) {
        for (var e = [["scmp.com", "sc"], ["luxehomes.com.hk", "sc"], ["ays.com.hk", "sc"], ["cpjobs.com", "sc"], ["educationpost.com.hk", "sc"], ["cosmopolitan.com.hk", "sc"], ["elle.com.hk", "sc"], ["harpersbazaar.com.hk", "sc"], ["1688.com", "6"], ["youku.com", "yt"], ["soku.com", "yt"], ["tudou.com", "yt"], ["laifeng.com", "yt"]], n = 0; n < e.length; n++) {
            var o = e[n];
            if (a.isContain(t, o[0]))
                return o[1]
        }
        return ""
    };
    e.getBeaconSrc = o,
    e.initConfig = function() {
        var t = goldlog.getCdnPath()
          , e = "//assets.alicdn.com/g" === t
          , n = e ? "gj" : "log";
        return {
            compose: {},
            etag: {
                egUrl: "//" + n + ".mmstat.com/eg.js",
                cna: "",
                tag: "",
                stag: "",
                ltag: "-1",
                lscnastatus: ""
            },
            can_to_sendpv: {},
            userdata: {},
            what_to_sendpv: {
                pvdata: {},
                exparams: {}
            },
            what_to_pvhash: {
                hash: []
            },
            what_to_sendpv_ut: {
                pvdataToUt: {}
            },
            what_to_sendpv_ut2: {
                isSuccess: !1,
                pvdataToUt: {}
            },
            when_to_sendpv: {
                aplusWaiting: ""
            },
            where_to_sendpv: {
                url: "//" + n + ".mmstat.com/o.gif",
                urlRule: o
            },
            where_to_sendlog_ut: {
                aplusToUT: {},
                toUTName: "toUT"
            },
            hjlj: {
                what_to_hjlj: {
                    logdata: {}
                },
                what_to_hjlj_ut: {
                    logdataToUT: {}
                }
            },
            is_single: !1
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t = goldlog.getCdnPath()
          , e = "//assets.alicdn.com/g" === t
          , n = e ? "gj" : "log";
        return {
            etag: {
                egUrl: "//" + n + ".mmstat.com/eg.js",
                cna: a.getCookie("cna"),
                tag: "",
                stag: ""
            },
            compose: {},
            where_to_prepv: {
                url: "//" + n + ".mmstat.com/v.gif",
                urlRule: r.getBeaconSrc
            },
            userdata: {},
            what_to_prepv: {
                logdata: {}
            },
            what_to_prepv_exinfo: {
                EXPARAMS_FLAG: "EXPARAMS",
                exinfo: [],
                exparams_key_names: ["uidaplus", "pc_i", "pu_i"]
            },
            is_single: !1
        }
    }
    var a = n(14)
      , r = n(16);
    t.exports = o
}
, function(t, e, n) {
    "use strict";
    e.aplus_init_plugins = [{
        name: "etag",
        enable: !0,
        path: n(19)
    }]
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        var n = new Date;
        n.setTime(n.getTime() + 31536e7),
        e += "; expires=" + n.toUTCString(),
        e += "; domain=" + u.getDomain(location.hostname),
        e += "; path=/",
        c.cookie = t + "=" + e
    }
    var a = n(14)
      , r = n(20)
      , i = n(21)
      , s = n(24)
      , u = n(15)
      , c = document;
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t;
                var e = this.options.context.etag || {};
                this.cna = e.cna || a.getCookie("cna"),
                this.setTag(0),
                this.setStag(-1),
                this.setEtag(this.cna || ""),
                this.requesting = !1
            },
            setTag: function(t) {
                this.tag = t,
                this.options.context.etag.tag = t
            },
            setStag: function(t) {
                this.stag = t,
                this.options.context.etag.stag = t
            },
            setEtag: function(t) {
                this.etag = t,
                this.options.context.etag.cna = t,
                o("cna", t)
            },
            run: function(t, e) {
                var n = this;
                if (n.cna)
                    return void n.setTag(1);
                var o = null
                  , a = this.options.context.etag || {}
                  , u = a.egUrl || "//log.mmstat.com/eg.js";
                if (0 === u.indexOf("//")) {
                    var c = i.getProtocal();
                    u = c + u
                }
                return n.requesting = !0,
                r.loadScript(u, function(t) {
                    if (t && n.setStag(-3),
                    n.requesting) {
                        n.requesting = !1;
                        var a = s.getGoldlogVal("Etag");
                        a && n.setEtag(a);
                        var r = s.getGoldlogVal("stag");
                        "undefined" != typeof r && n.setStag(r),
                        clearTimeout(o),
                        e()
                    }
                }),
                o = setTimeout(function() {
                    n.requesting = !1,
                    n.setStag(-2),
                    e()
                }, 1e3),
                "pause"
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        return t && t.getAttribute ? t.getAttribute(e) || "" : ""
    }
    function a(t, e, n) {
        if (t && t.setAttribute)
            try {
                t.setAttribute(e, n)
            } catch (t) {}
    }
    function r(t, e) {
        if (t && t.removeAttribute)
            try {
                t.removeAttribute(e)
            } catch (n) {
                a(t, e, "")
            }
    }
    function i(t, e, n) {
        var o = "script"
          , a = g.createElement(o);
        a.type = "text/javascript",
        a.async = !0;
        var r = "https:" == location.protocol ? e || t : t;
        0 === r.indexOf("//") && (r = u.getProtocal() + r),
        a.src = r,
        n && (a.id = n);
        var i = g.getElementsByTagName(o)[0];
        s = s || g.getElementsByTagName("head")[0],
        i ? i.parentNode.insertBefore(a, i) : s && s.appendChild(a)
    }
    var s, u = n(21), c = n(22), l = n(13), p = n(23), g = document;
    e.tryToGetAttribute = o,
    e.tryToSetAttribute = a,
    e.tryToRemoveAttribute = r,
    e.addScript = i,
    e.loadScript = function(t, e) {
        function n(t) {
            o.onreadystatechange = o.onload = o.onerror = null,
            o = null,
            e(t)
        }
        var o = g.createElement("script");
        if (s = s || g.getElementsByTagName("head")[0],
        o.async = !0,
        "onload"in o)
            o.onload = n;
        else {
            var a = function() {
                /loaded|complete/.test(o.readyState) && n()
            };
            o.onreadystatechange = a,
            a()
        }
        o.onerror = function(t) {
            n(t)
        }
        ,
        o.src = t,
        s.appendChild(o)
    }
    ,
    e.isTouch = function() {
        return "ontouchend"in document.createElement("div")
    }
    ,
    e.tryToGetHref = function(t) {
        var e;
        try {
            e = c.trim(t.getAttribute("href", 2))
        } catch (t) {}
        return e || ""
    }
    ;
    var f = function() {
        var t = goldlog && goldlog._$ ? goldlog._$ : {}
          , e = t.meta_info || {};
        return e["aplus-exparams"] || ""
    };
    e.getExParamsFromMeta = f,
    e.getExParams = function(t) {
        var e = g.getElementById("beacon-aplus") || g.getElementById("tb-beacon-aplus")
          , n = o(e, "exparams")
          , a = d(n, f(), t) || "";
        return a && a.replace(/&amp;/g, "&").replace(/\buserid=/, "uidaplus=")
    }
    ;
    var d = function(t, e, n) {
        var o = "aplus&sidx=aplusSidex"
          , a = t || o;
        try {
            if (e) {
                var r = n.param2obj(e)
                  , i = ["aplus", "cna", "spm-cnt", "spm-url", "spm-pre", "logtype", "pre", "uidaplus", "asid", "sidx", "trid", "gokey"];
                l.each(i, function(t) {
                    r.hasOwnProperty(t) && (p.logger({
                        msg: "Can not inject keywords: " + t
                    }),
                    delete r[t])
                }),
                delete r[""];
                var s = "";
                if (t) {
                    var u = t.match(/aplus&/).index
                      , c = u > 0 ? n.param2obj(t.substring(0, u)) : {};
                    delete c[""],
                    s = n.obj2param(l.assign(c, r)) + "&" + t.substring(u, t.length)
                } else
                    s = n.obj2param(r) + "&" + o;
                return s
            }
            return a
        } catch (t) {
            return a
        }
    };
    e.mergeExparams = d
}
, function(t, e, n) {
    "use strict";
    var o = n(13)
      , a = function() {
        var t = location.protocol;
        return "http:" !== t && "https:" !== t && (t = "https:"),
        t
    };
    e.getProtocal = a,
    e.isStartWithProtocol = function(t) {
        for (var e = ["javascript:", "tel:", "sms:", "mailto:", "tmall://", "#"], n = 0, a = e.length; n < a; n++)
            if (o.isStartWith(t, e[n]))
                return !0;
        return !1
    }
}
, function(t, e) {
    "use strict";
    function n(t) {
        return "string" == typeof t ? t.replace(/^\s+|\s+$/g, "") : ""
    }
    e.trim = n
}
, function(t, e) {
    "use strict";
    var n = function(t) {
        var e = t.level || "warn";
        window.console && window.console[e] && window.console[e](t.msg)
    };
    e.logger = n
}
, function(t, e) {
    "use strict";
    var n = function(t) {
        var e;
        try {
            window.goldlog || (window.goldlog = {}),
            e = window.goldlog[t]
        } catch (t) {
            e = ""
        } finally {
            return e
        }
    };
    e.getGoldlogVal = n;
    var o = function(t, e) {
        var n = !1;
        try {
            window.goldlog || (window.goldlog = {}),
            t && (window.goldlog[t] = e,
            n = !0)
        } catch (t) {
            n = !1
        } finally {
            return n
        }
    };
    e.setGoldlogVal = o,
    e.getClientInfo = function() {
        return n("_aplus_client") || {}
    }
}
, function(t, e, n) {
    "use strict";
    e.plugins_pv = [{
        name: "etag",
        enable: !0,
        path: n(26)
    }, {
        name: "when_to_sendpv",
        enable: !0,
        path: n(27)
    }, {
        name: "where_to_sendlog_ut",
        enable: !0,
        path: n(34)
    }, {
        name: "is_single",
        enable: !0,
        path: n(36)
    }, {
        name: "what_to_pvhash",
        enable: !0,
        path: n(39)
    }, {
        name: "what_to_sendpv",
        enable: !0,
        path: n(40)
    }, {
        name: "what_to_sendpv_userdata",
        enable: !0,
        path: n(44),
        deps: ["what_to_sendpv"]
    }, {
        name: "what_to_sendpv_etag",
        enable: !0,
        path: n(48),
        deps: ["etag", "what_to_sendpv"]
    }, {
        name: "what_to_sendpv_ut",
        enable: !0,
        path: n(49),
        deps: ["where_to_sendlog_ut", "is_single"]
    }, {
        name: "can_to_sendpv",
        enable: !0,
        path: n(50)
    }, {
        name: "where_to_sendpv",
        enable: !0,
        path: n(51),
        deps: ["is_single"]
    }, {
        name: "do_sendpv",
        enable: !0,
        path: n(52),
        deps: ["is_single", "what_to_sendpv", "where_to_sendpv"]
    }, {
        name: "do_sendpv_ut",
        enable: !0,
        path: n(53),
        deps: ["what_to_sendpv_ut", "where_to_sendlog_ut"]
    }, {
        name: "cookiemapping",
        enable: !0,
        path: n(55),
        deps: ["do_sendpv"]
    }, {
        name: "after_pv",
        enable: !0,
        path: n(57)
    }]
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        var n = new Date;
        n.setTime(n.getTime() + 31536e7),
        e += "; expires=" + n.toUTCString(),
        e += "; domain=" + u.getDomain(location.hostname),
        e += "; path=/",
        c.cookie = t + "=" + e
    }
    var a = n(14)
      , r = n(20)
      , i = n(21)
      , s = n(24)
      , u = n(15)
      , c = document;
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t;
                var e = this.options.context.etag || {};
                this.cna = e.cna || a.getCookie("cna"),
                this.setTag(0),
                this.setStag(-1),
                this.setLTag("-1"),
                this.setEtag(this.cna || ""),
                this.requesting = !1
            },
            setLTag: function(t) {
                this.ltag = t,
                this.options.context.etag.ltag = t
            },
            setTag: function(t) {
                this.tag = t,
                this.options.context.etag.tag = t
            },
            setStag: function(t) {
                this.stag = t,
                this.options.context.etag.stag = t
            },
            setEtag: function(t) {
                this.etag = t,
                this.options.context.etag.cna = t,
                o("cna", t)
            },
            setLscnaStatus: function(t) {
                this.options.context.etag.lscnastatus = t
            },
            run: function(t, e) {
                var n = this;
                if (n.cna)
                    return void n.setTag(1);
                var o = null
                  , a = this.options.context.etag || {}
                  , u = a.egUrl || "//log.mmstat.com/eg.js";
                if (0 === u.indexOf("//")) {
                    var c = i.getProtocal();
                    u = c + u
                }
                n.requesting = !0;
                var l = function() {
                    setTimeout(function() {
                        e()
                    }, 20),
                    clearTimeout(o)
                };
                return r.loadScript(u, function(t) {
                    var e, o;
                    t && "error" === t.type ? n.setStag(-3) : (e = s.getGoldlogVal("Etag"),
                    e && n.setEtag(e),
                    o = s.getGoldlogVal("stag"),
                    "undefined" != typeof o && n.setStag(o)),
                    n.requesting && (o !== -3 && 2 !== o && 4 !== o || !goldlog._aplus_cplugin_lscna ? l() : goldlog.aplus_pubsub.subscribeOnce("_aplus_cplugin_lscna", function(t) {
                        t && "complete" === t.status && "function" == typeof t.getLsCna ? (n.setLscnaStatus("init"),
                        t.getLsCna(e, function(t, e) {
                            n.setLscnaStatus(e),
                            "success" === e && t ? (n.setLTag("1"),
                            n.setEtag(t)) : n.setLTag("0"),
                            l()
                        })) : l()
                    }))
                }),
                o = setTimeout(function() {
                    n.requesting = !1,
                    n.setStag(-2),
                    e()
                }, 1500),
                2e3
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24)
      , a = n(28)
      , r = n(29);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getMetaInfo: function() {
                var t = o.getGoldlogVal("_$") || {}
                  , e = t.meta_info || r.getInfo();
                return e
            },
            getAplusWaiting: function() {
                var t = this.getMetaInfo() || {};
                return t["aplus-waiting"]
            },
            run: function(t, e) {
                var n = this.options.config || {}
                  , o = this.getAplusWaiting();
                if (o && n.is_auto)
                    switch (o = this.getAplusWaiting() + "",
                    this.options.context.when_to_sendpv = {
                        aplusWaiting: o
                    },
                    o) {
                    case "MAN":
                        return "done";
                    case "1":
                        return this.options.context.when_to_sendpv.isWait = !0,
                        a.sleep(6e3, function() {
                            e()
                        }),
                        6e3;
                    default:
                        var r = 1 * o;
                        if (r + "" != "NaN")
                            return this.options.context.when_to_sendpv.isWait = !0,
                            a.sleep(r, function() {
                                e()
                            }),
                            r
                    }
            }
        }
    }
}
, function(t, e) {
    "use strict";
    e.sleep = function(t, e) {
        return setTimeout(function() {
            e()
        }, t)
    }
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t, e, n, o = h.getMetaTags(), a = o.length, r = {};
        for (y._microscope_data = r,
        t = 0; t < a; t++)
            e = o[t],
            "microscope-data" == m.tryToGetAttribute(e, "name") && (n = m.tryToGetAttribute(e, "content"),
            f.parseSemicolonContent(n, r),
            y.is_head_has_meta_microscope_data = !0);
        y._microscope_data_params = f.obj2param(r),
        y.ms_data_page_id = r.pageId,
        y.ms_data_shop_id = r.shopId,
        y.ms_data_instance_id = r.siteInstanceId,
        y.ms_data_siteCategoryId = r.siteCategory,
        y.ms_prototype_id = r.prototypeId,
        y.site_instance_id_or_shop_id = y.ms_data_instance_id || y.ms_data_shop_id
    }
    function a() {
        var t, e, n, o = h.getMetaTags(), a = o.length;
        for (y._atp_beacon_data = {},
        t = 0; t < a; t++)
            e = o[t],
            "atp-beacon" == m.tryToGetAttribute(e, "name") && (n = m.tryToGetAttribute(e, "content"),
            f.parseSemicolonContent(n, y._atp_beacon_data));
        y._atp_beacon_data_params = f.obj2param(y._atp_beacon_data)
    }
    function r() {
        var t, e, n, o, a = h.getMetaTags();
        for (t = 0,
        e = a.length; t < e; t++)
            n = a[t],
            o = m.tryToGetAttribute(n, "name"),
            "data-spm" == o && (p = m.tryToGetAttribute(n, "data-spm-protocol"));
        return p
    }
    function i(t) {
        var e = t.isonepage || "-1"
          , n = e.split("|")
          , o = n[0]
          , a = n[1] ? n[1] : "";
        t.isonepage_data = {
            isonepage: o,
            urlpagename: a
        }
    }
    function s() {
        a(),
        o(),
        d.each(b, function(t) {
            y[t] = h.getMetaCnt(t)
        }),
        y.spm_protocol = r();
        var t, e, n = ["aplus-rate-ahot"], s = n.length;
        for (t = 0; t < s; t++)
            e = n[t],
            y[e] = parseFloat(y[e]);
        return i(y),
        g = y,
        y
    }
    function u() {
        return g || s()
    }
    function c(t, e) {
        return _.indexof(b, t) > -1 ? (g || (g = {}),
        g[t] = e,
        !0) : (v.logger({
            msg: "the " + t + " is invalid!"
        }),
        !1)
    }
    function l(t) {
        return _.indexof(b, t) > -1 ? (g || (g = {}),
        g[t]) : void v.logger({
            msg: 'the key "' + t + '" is invalid!'
        })
    }
    var p, g, f = n(30), d = n(13), m = n(20), h = n(33), _ = n(32), v = n(23), b = ["aplus-terminal", "aplus-touch", "ahot-aplus", "aplus-rate-ahot", "isonepage", "spm-id", "data-spm", "microscope-data", "atp-beacon", "aplus-waiting", "aplus-rhost-v", "aplus-rhost-g", "aplus-xplug", "aplus-ifr-pv", "aplus-exinfo", "aplus-auto-exp", "aplus-auto-exp-visible", "aplus-auto-exp-duration", , "aplus-auto-clk", "aplus-tracker-rate", "aplus-disable-pvid", "aplus-loadjs", "aplus-cpvdata", "aplus-getspmcd", "aplus_ctap", "aplus_chnl", "aplus-aol", "aplus-aol-ext", "aplus-exparams", "aplus-pvhash"], y = {};
    e.setMetaInfo = c,
    e.getMetaInfo = l,
    e.getInfo = s,
    e.qGet = u
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        t = (t || "").split("#")[0].split("?")[0];
        var e = t.length
          , n = function(t) {
            var e, n = t.length, o = 0;
            for (e = 0; e < n; e++)
                o = 31 * o + t.charCodeAt(e);
            return o
        };
        return e ? n(e + "#" + t.charCodeAt(e - 1)) : -1
    }
    function a(t) {
        for (var e = t.split("&"), n = 0, o = e.length, a = {}; n < o; n++) {
            var r = e[n]
              , i = r.indexOf("=")
              , s = r.substring(0, i)
              , u = r.substring(i + 1);
            a[s] = p.tryToDecodeURIComponent(u)
        }
        return a
    }
    function r(t) {
        if ("function" != typeof t)
            throw new TypeError(t + " is not a function");
        return t
    }
    function i(t) {
        var e, n, o, a = [], r = t.length;
        for (o = 0; o < r; o++)
            e = t[o][0],
            n = t[o][1],
            a.push(l.isStartWith(e, _) ? n : e + "=" + encodeURIComponent(n));
        return a.join("&")
    }
    function s(t) {
        var e, n, o, a = {}, r = t.length;
        for (o = 0; o < r; o++)
            e = t[o][0],
            n = t[o][1],
            a[e] = n;
        return a
    }
    function u(t) {
        var e, n, o = [];
        for (e in t)
            t.hasOwnProperty(e) && (n = "" + t[e],
            o.push(l.isStartWith(e, _) ? n : e + "=" + encodeURIComponent(n)));
        return o.join("&")
    }
    function c(t, e) {
        var n = t.indexOf("?") == -1 ? "?" : "&"
          , o = e ? l.isArray(e) ? i(e) : u(e) : "";
        return o ? t + n + o : t
    }
    var l = n(13)
      , p = n(31)
      , g = n(21)
      , f = parent !== self;
    e.is_in_iframe = f,
    e.makeCacheNum = l.makeCacheNum,
    e.isStartWith = l.isStartWith,
    e.isEndWith = l.isEndWith,
    e.any = l.any,
    e.each = l.each,
    e.assign = l.assign,
    e.isFunction = l.isFunction,
    e.isArray = l.isArray,
    e.isString = l.isString,
    e.isNumber = l.isNumber,
    e.isUnDefined = l.isUnDefined,
    e.isContain = l.isContain,
    e.sleep = n(28).sleep,
    e.makeChkSum = o,
    e.tryToDecodeURIComponent = p.tryToDecodeURIComponent,
    e.nodeListToArray = p.nodeListToArray,
    e.parseSemicolonContent = p.parseSemicolonContent,
    e.param2obj = a;
    var d = n(23)
      , m = function(t) {
        return /^(\/\/){0,1}\w+\.\w+\.\w+$/.test(t)
    };
    e.hostValidity = m;
    var h = function(t, e) {
        var n = /^(\/\/){0,1}\w+\.\w+\.\w+\/\w+\.gif$/.test(t)
          , o = m(t)
          , a = "";
        return n ? a = "isGifPath" : o && (a = "isHostPath"),
        a || d.logger({
            msg: e + ": " + t + ' is invalid, suggestion: "xxx.mmstat.com"'
        }),
        a
    };
    e.getPvUrl = function(t) {
        t || (t = {});
        var e, n, o = t.metaValue && h(t.metaValue, t.metaName), a = "";
        "isGifPath" === o ? (e = /^\/\//.test(t.metaValue) ? "" : "//",
        a = e + t.metaValue) : "isHostPath" === o && (e = /^\/\//.test(t.metaValue) ? "" : "//",
        n = /\/$/.test(t.metaValue) ? "" : "/",
        a = e + t.metaValue + n + t.gifPath);
        var r;
        return a ? r = a : (e = 0 === t.gifPath.indexOf("/") ? t.gifPath : "/" + t.gifPath,
        r = t.url && t.url.replace(/\/\w+\.gif/, e)),
        r
    }
    ,
    e.indexof = n(32).indexof,
    e.callable = r;
    var _ = "::-plain-::";
    e.mkPlainKey = function() {
        return _ + Math.random()
    }
    ,
    e.s_plain_obj = _,
    e.mkPlainKeyForExparams = function(t) {
        var e = t || _;
        return e + "exparams"
    }
    ,
    e.rndInt32 = function() {
        return Math.round(2147483647 * Math.random())
    }
    ,
    e.arr2param = i,
    e.arr2obj = s,
    e.obj2param = u,
    e.makeUrl = c,
    e.ifAdd = function(t, e) {
        var n, o, a, r, i = e.length;
        for (n = 0; n < i; n++)
            o = e[n],
            a = o[0],
            r = o[1],
            r && t.push([a, r])
    }
    ,
    e.isStartWithProtocol = g.isStartWithProtocol,
    e.param2arr = function(t) {
        for (var e, n = t.split("&"), o = 0, a = n.length, r = []; o < a; o++)
            e = n[o].split("="),
            r.push([e.shift(), e.join("=")]);
        return r
    }
    ;
    var v = function() {
        return /aplusDebug=true/.test(location.search)
    };
    e.isDebugAplus = v
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        var n = e || "";
        if (t)
            try {
                n = decodeURIComponent(t)
            } catch (t) {}
        return n
    }
    var a = n(22);
    e.tryToDecodeURIComponent = o,
    e.parseSemicolonContent = function(t, e) {
        e = e || {};
        var n, r, i = t.split(";"), s = i.length;
        for (n = 0; n < s; n++)
            r = i[n].split("="),
            e[a.trim(r[0]) || ""] = o(a.trim(r.slice(1).join("=")));
        return e
    }
    ,
    e.nodeListToArray = function(t) {
        var e, n;
        try {
            return e = [].slice.call(t)
        } catch (a) {
            e = [],
            n = t.length;
            for (var o = 0; o < n; o++)
                e.push(t[o]);
            return e
        }
    }
    ,
    e.nodeListToArray = function(t) {
        var e, n;
        try {
            return e = [].slice.call(t)
        } catch (a) {
            e = [],
            n = t.length;
            for (var o = 0; o < n; o++)
                e.push(t[o]);
            return e
        }
    }
}
, function(t, e) {
    "use strict";
    e.indexof = function(t, e) {
        var n = -1;
        try {
            n = t.indexOf(e)
        } catch (a) {
            for (var o = 0; o < t.length; o++)
                t[o] === e && (n = o)
        } finally {
            return n
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        return i = i || document.getElementsByTagName("head")[0],
        s && !t ? s : i ? s = i.getElementsByTagName("meta") : []
    }
    function a(t) {
        var e, n, a, r = o(), i = r.length;
        for (e = 0; e < i; e++)
            n = r[e],
            u.tryToGetAttribute(n, "name") === t && (a = u.tryToGetAttribute(n, "content"));
        return a || ""
    }
    function r(t) {
        var e = {
            isonepage: "-1",
            urlpagename: ""
        }
          , n = t.qGet();
        if (n && n.hasOwnProperty("isonepage_data"))
            e.isonepage = n.isonepage_data.isonepage,
            e.urlpagename = n.isonepage_data.urlpagename;
        else {
            var o = a("isonepage") || "-1"
              , r = o.split("|");
            e.isonepage = r[0],
            e.urlpagename = r[1] ? r[1] : ""
        }
        return e
    }
    var i, s, u = n(20);
    e.getMetaTags = o,
    e.getMetaCnt = a,
    e.getOnePageInfo = r
}
, function(t, e, n) {
    "use strict";
    var o = n(35);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getAplusToUT: function() {
                return {
                    toUT2: o.getAplusToUT("toUT2"),
                    toUT: o.getAplusToUT("toUT")
                }
            },
            run: function() {
                var t = this.getAplusToUT();
                this.options.context.where_to_sendlog_ut.aplusToUT = t
            }
        }
    }
}
, function(t, e) {
    "use strict";
    var n = navigator.userAgent
      , o = /WindVane/i.test(n);
    e.is_WindVane = o;
    var a = function() {
        var t = goldlog.getMetaInfo("aplus_chnl");
        return !(!t || !t.isAvailable || "function" != typeof t.toUT2 && "function" != typeof t.toUT) && t
    };
    e.isAplusChnl = a,
    e.getAplusToUT = function(t) {
        var e = {}
          , n = a();
        if ("object" == typeof n)
            e.bridgeName = n.bridgeName || "customBridge",
            e.isAvailable = n.isAvailable,
            e.toUT2 = n.toUT2 || n.toUT;
        else {
            var r = window.WindVane || {};
            if (o && r && r.isAvailable && "function" == typeof r.call) {
                var i = t || "toUT";
                e = {
                    bridgeName: "WindVane",
                    isAvailable: !0,
                    toUT2: function(t, e, n, o) {
                        return r.call("WVTBUserTrack", i, t, e, n, o)
                    }
                }
            }
        }
        return e
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24)
      , a = n(37)
      , r = n(8);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            isSingle_pv: function() {
                var t = o.getGoldlogVal("_$") || {};
                return !(!t.is_WindVane || !a.isSingleUaVersion())
            },
            isSingle_hjlj: function(t) {
                var e = o.getGoldlogVal("_$") || {};
                return !(!e.is_WindVane || !a.isSingleSendLog(t))
            },
            isSingle_uhjlj: function(t) {
                var e = o.getGoldlogVal("_$") || {};
                return (!t || !/^\/aplus\.99\.(\d)+$/.test(t.logkey)) && !!(e.is_WindVane && t && t.logkey && a.isSingleUaVersion())
            },
            run: function() {
                var t = this.options.context || {}
                  , e = this.options.config || {}
                  , n = t.where_to_sendlog_ut.aplusToUT || {}
                  , o = n.toUT || {}
                  , a = n.toUT2 || {}
                  , i = !(!o.isAvailable && !a.isAvailable)
                  , s = t.userdata || {}
                  , u = !!t.is_single;
                switch (e.recordType) {
                case r.recordTypes.uhjlj:
                    u = this.isSingle_uhjlj(s);
                    break;
                case r.recordTypes.hjlj:
                    u = this.isSingle_hjlj(s);
                    break;
                case r.recordTypes.pv:
                    u = this.isSingle_pv(s);
                    break;
                default:
                    u = this.isSingle_pv(s)
                }
                this.options.context.is_single = i && u
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(38)
      , a = function(t) {
        var e = t.logkey.toLowerCase();
        0 === e.indexOf("/") && (e = e.substr(1));
        var n = t.gmkey.toUpperCase();
        switch (n) {
        case "EXP":
            return "2201";
        case "CLK":
            return "2101";
        case "SLD":
            return "19999";
        case "OTHER":
        default:
            return "19999"
        }
    }
      , r = function() {
        return o.webviewIsAbove({
            version_ios_tb: [5, 11, 7],
            version_ios_tm: [5, 24, 1],
            version_android_tb: [5, 11, 7],
            version_android_tm: [5, 24, 1]
        })
    };
    e.isSingleUaVersion = r,
    e.isSingleSendLog = function(t) {
        return (!t || !/^\/fsp\.1\.1$/.test(t.logkey)) && !!(t && t.logkey && t.gmkey && r() === !0)
    }
    ,
    e.getFunctypeValue = function(t) {
        return e.isSingleSendLog(t) ? a(t) : "2101"
    }
    ,
    e.getFunctypeValue2 = function(t) {
        return a(t)
    }
}
, function(t, e) {
    "use strict";
    var n = function(t) {
        var e = [0, 0, 0];
        try {
            if (t) {
                var n = t[1]
                  , o = n.split(".");
                if (o.length > 2)
                    for (var a = 0; a < o.length; )
                        e[a] = parseInt(o[a]),
                        a++
            }
        } catch (t) {
            e = [0, 0, 0]
        } finally {
            return e
        }
    };
    e.parseVersion = n;
    var o = function(t, e) {
        var n = !1;
        try {
            var o = t[0] > e[0]
              , a = t[1] > e[1]
              , r = t[2] > e[2]
              , i = t[0] === e[0]
              , s = t[1] === e[1]
              , u = t[2] === e[2];
            n = !!o || (!(!i || !a) || (!!(i && s && r) || !!(i && s && u)))
        } catch (t) {
            n = !1
        } finally {
            return n
        }
    };
    e.isAboveVersion = o,
    e.webviewIsAbove = function(t, e) {
        var a = !1;
        try {
            e || (e = navigator.userAgent);
            var r = e.match(/AliApp\(TB\/(\d+[._]\d+[._]\d+)/i)
              , i = n(r)
              , s = e.match(/AliApp\(TM\/(\d+[._]\d+[._]\d+)/i)
              , u = n(s)
              , c = /iPhone|iPad|iPod|ios/i.test(e)
              , l = /android/i.test(e);
            c ? r && i ? a = o(i, t.version_ios_tb) : s && u && (a = o(u, t.version_ios_tm)) : l && (r && i ? a = o(i, t.version_android_tb) : s && u && (a = o(u, t.version_android_tm)))
        } catch (t) {
            a = !1
        }
        return a
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = this.options.context.what_to_pvhash || {}
                  , e = o.getGoldlogVal("_$") || {}
                  , n = e.meta_info || {}
                  , a = n["aplus-pvhash"] || ""
                  , r = [];
                "1" === a && (r = ["ha", location.href]),
                t.hash = r,
                this.options.context.what_to_pvhash = t
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(13)
      , r = n(20)
      , i = n(24)
      , s = n(14)
      , u = n(41)
      , c = n(42)
      , l = n(43);
    t.exports = function() {
        return a.assign(l, {
            init: function(t) {
                this.options = t,
                this.cookie_data || (this.cookie_data = s.getData()),
                this.client_info || (this.client_info = i.getClientInfo() || {});
                var e = location.hash;
                e && 0 === e.indexOf("#") && (e = e.substr(1)),
                this.loc_hash = e
            },
            getExParams: function() {
                var t = window
                  , e = document
                  , n = []
                  , i = parent !== t.self
                  , s = e.getElementById("beacon-aplus") || e.getElementById("tb-beacon-aplus")
                  , c = r.tryToGetAttribute(s, "exparams")
                  , l = r.mergeExparams(c, r.getExParamsFromMeta(), o) || "";
                l = l.replace(/&amp;/g, "&");
                var p, g, f = ["taobao.com", "tmall.com", "etao.com", "hitao.com", "taohua.com", "juhuasuan.com", "alimama.com"];
                if (i) {
                    for (g = f.length,
                    p = 0; p < g; p++)
                        if (o.isContain(location.hostname, f[p]))
                            return n.push([o.mkPlainKeyForExparams(), l]),
                            n;
                    l = l.replace(/\buserid=\w*&?/, "")
                }
                l = l.replace(/\buserid=/, "uidaplus="),
                l && n.push([o.mkPlainKeyForExparams(), l]);
                var d = a.makeCacheNum();
                return u.updateKey(n, "cache", d),
                n
            },
            getExtra: function() {
                var t = []
                  , e = i.getGoldlogVal("_$") || {}
                  , n = e.meta_info || {}
                  , a = this.cookie_data || {}
                  , r = this.getClientInfo(!0) || [];
                return o.ifAdd(t, r),
                o.ifAdd(t, [["thw", a.thw], ["bucket_id", c.getBucketId(n)], ["urlokey", this.loc_hash], ["wm_instanceid", n.ms_data_instance_id]]),
                t
            }
        })
    }
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        if (!t && e && "N" === e.isAplusInternal)
            return !0;
        t = t || c.getMetaCnt("aplus-ajax");
        var n = goldlog.spm_ab;
        return !(!n || u.makeChkSum([n[0], (n[1] || "").split("/")[0]].join(".")) != t) || u.makeChkSum(location.href.split("#")[0].split("?")[0]) == t
    }
    function a(t, e, n) {
        s(t, "spm-cnt", function(t) {
            var o = t.split(".");
            return o[0] = goldlog.spm_ab[0],
            o[1] = goldlog.spm_ab[1],
            e ? o[1] = o[1].split("/")[0] + "/" + e : o[1] = o[1].split("/")[0],
            n && (o[4] = n),
            o.join(".")
        })
    }
    function r(t, e) {
        var n = window.g_SPM && g_SPM._current_spm;
        n && s(t, "spm-url", function() {
            return [n.a, n.b, n.c, n.d].join(".") + (e ? "." + e : "")
        }, "spm-cnt")
    }
    function i(t, e) {
        var n, o, a, r = -1;
        for (n = 0,
        o = t.length; n < o; n++)
            if (a = t[n],
            a[0] === e) {
                r = n;
                break
            }
        r >= 0 && t.splice(r, 1)
    }
    function s(t, e, n, o) {
        var a, r, i = t.length, s = -1, u = "function" == typeof n;
        for (a = 0; a < i; a++) {
            if (r = t[a],
            r[0] === e)
                return void (u ? r[1] = n(r[1]) : r[1] = n);
            o && r[0] === o && (s = a)
        }
        o && (u && (n = n()),
        s > -1 ? t.splice(s, 0, [e, n]) : t.push([e, n]))
    }
    var u = n(30)
      , c = n(33);
    t.exports = {
        checkIfSendPV: o,
        updateSPMCnt: a,
        updateSPMUrl: r,
        updateKey: s,
        removeKey: i
    }
}
, function(t, e, n) {
    "use strict";
    function o(t, e) {
        var n, o = 2146271213;
        for (n = 0; n < t.length; n++)
            o = (o << 5) + o + t.charCodeAt(n);
        return (65535 & o) % e
    }
    function a(t) {
        var e, n = r.getCookie("t");
        return "3" != t.ms_prototype_id && "5" != t.ms_prototype_id || (e = n ? o(n, 20) : ""),
        e
    }
    var r = n(14);
    e.getBucketId = a
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(13)
      , r = n(24)
      , i = n(35)
      , s = n(14)
      , u = n(8);
    t.exports = {
        init: function(t) {
            this.options = t,
            this.cookie_data || (this.cookie_data = s.getData())
        },
        getBasicParams: function() {
            var t = document
              , e = r.getGoldlogVal("_$") || {}
              , n = e.spm || {}
              , i = e.meta_info || {}
              , u = i["aplus-ifr-pv"] + "" == "1"
              , c = o.is_in_iframe && !u ? 0 : 1
              , l = [["logtype", c], [o.mkPlainKey(), "title=" + escape(t.title)], ["pre", e.page_referrer], ["cache", a.makeCacheNum()], ["scr", screen.width + "x" + screen.height]]
              , p = this.cookie_data || {}
              , g = this.options.context || {}
              , f = g.etag || {}
              , d = f.cna || p.cna || s.getCookie("cna");
            d && l.push([o.mkPlainKey(), "cna=" + d]),
            p.tracknick && l.push([o.mkPlainKey(), "nick=" + p.tracknick]);
            var m = n.spm_url || "";
            if (window.g_SPM && window.g_SPM._current_spm) {
                var h = [];
                for (var _ in g_SPM._current_spm)
                    h.push(g_SPM._current_spm[_]);
                h.length > 0 && (m = h.join("."))
            }
            return o.ifAdd(l, [["wm_pageid", i.ms_data_page_id], ["wm_prototypeid", i.ms_prototype_id], ["wm_sid", i.ms_data_shop_id], ["spm-url", m], ["spm-pre", n.spm_pre], ["spm-cnt", n.spm_cnt], ["cnaui", p.cnaui]]),
            l
        },
        getExParams: function() {
            return []
        },
        getExtra: function() {
            return []
        },
        getClientInfo: function(t) {
            var e = []
              , n = r.getGoldlogVal("_$") || {}
              , a = this.client_info || {}
              , s = a.ua_info || {};
            if (t || !i.is_WindVane && !i.isAplusChnl()) {
                for (var c, l = [], p = ["p", "o", "b", "s", "w", "wx", "ism"], g = 0; c = p[g++]; )
                    s[c] && l.push([c, s[c]]);
                o.ifAdd(e, l)
            }
            o.ifAdd(e, [["lver", goldlog.lver || u.lver], ["jsver", n.script_name || u.script_name]]);
            var f = this.options.config || {}
              , d = f.is_auto;
            return d || o.ifAdd(e, [["mansndlog", 1]]),
            e
        },
        processLodashDollar: function() {
            var t = r.getGoldlogVal("_$") || {};
            t.page_url !== location.href && (t.page_referrer = t.page_url,
            t.page_url = location.href),
            r.setGoldlogVal("_$", t)
        },
        getLsParams: function() {
            var t = r.getGoldlogVal("_$") || {}
              , e = [];
            return t.lsparams && t.lsparams.spm_id && (e.push(["lsparams", t.lsparams.spm_id]),
            e.push(["lsparams_pre", t.lsparams.current_url])),
            e
        },
        run: function() {
            var t = this.getBasicParams() || []
              , e = this.getExParams() || []
              , n = this.getExtra() || [];
            this.processLodashDollar();
            var o = this.getLsParams() || []
              , a = [].concat(t, e, n, o);
            this.options.context.what_to_sendpv.pvdata = a,
            this.options.context.what_to_sendpv.exparams = e
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(24)
      , r = n(23)
      , i = n(41)
      , s = n(14)
      , u = n(45);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getPageId: function() {
                var t = this.options.config || {}
                  , e = this.options.context || {}
                  , n = e.userdata || {};
                return t.page_id || t.pageid || t.pageId || n.page_id
            },
            getUserdata: function() {
                var t = a.getGoldlogVal("_$") || {}
                  , e = t.spm || {}
                  , n = this.options.context || {}
                  , i = n.userdata || {}
                  , c = this.options.config || {}
                  , l = [];
                if (c && !c.is_auto) {
                    c.gokey && l.push([o.mkPlainKey(), c.gokey]);
                    var p = e.data.b;
                    if (p) {
                        var g = this.getPageId();
                        p = g ? p.split("/")[0] + "/" + g : p.split("/")[0],
                        u.setB(p)
                    }
                }
                var f = function(t, e) {
                    try {
                        var n;
                        if (t)
                            for (var o in t)
                                "object" != typeof t[o] && "function" != typeof t[o] ? (n = t[o],
                                t.hasOwnProperty(o) && l.push([o, n])) : r.logger({
                                    msg: e + " about " + o + ":" + t[o] + " must be basicType, eg string number or boolean!"
                                })
                    } catch (t) {}
                }
                  , d = goldlog.getMetaInfo("aplus-cpvdata");
                "object" == typeof d && f(d, "meta:aplus-cpvdata"),
                f(i, "userdata");
                var m = s.getCookie("workno") || s.getCookie("emplId");
                return m && l.push(["workno", m]),
                window._ua_popLayer && l.push(["ispop", 1]),
                l
            },
            processLodashDollar: function() {
                var t = this.options.config || {}
                  , e = a.getGoldlogVal("_$") || {};
                t && t.referrer && (e.page_referrer = t.referrer),
                a.setGoldlogVal("_$", e)
            },
            updatePre: function(t) {
                var e = a.getGoldlogVal("_$") || {};
                return e.page_referrer && i.updateKey(t, "pre", e.page_referrer),
                t
            },
            run: function() {
                var t = this.options.context.what_to_sendpv.pvdata
                  , e = this.getUserdata();
                this.processLodashDollar();
                var n = t
                  , o = this.options.context.what_to_pvhash.hash;
                o && n.push(o),
                n = n.concat(e),
                n = this.updatePre(n);
                var a = this.getPageId();
                a && i.updateSPMCnt(n, a),
                this.options.context.what_to_sendpv.pvdata = n,
                this.options.context.userdata = e
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o() {
        if (!s.data.a || !s.data.b) {
            var t = r._SPM_a
              , e = r._SPM_b;
            if (t && e)
                return t = t.replace(/^{(\w+\/)}$/g, "$1"),
                e = e.replace(/^{(\w+\/)}$/g, "$1"),
                s.is_wh_in_page = !0,
                void c.setAB(t, e);
            var n = goldlog._$.meta_info;
            t = n["data-spm"] || n["spm-id"] || "0";
            var o = t.split(".");
            o.length > 1 && (t = o[0],
            e = o[1]),
            c.setA(t),
            e && c.setB(e);
            var a = i.getElementsByTagName("body");
            a = a && a.length ? a[0] : null,
            a && (e = l.tryToGetAttribute(a, "data-spm"),
            e ? c.setB(e) : 1 === o.length && c.setAB("0", "0"))
        }
    }
    function a() {
        var t = s.data.a
          , e = s.data.b;
        t && e && (goldlog.spm_ab = [t, e])
    }
    var r = window
      , i = document
      , s = {}
      , u = {};
    s.data = u;
    var c = {}
      , l = n(20)
      , p = n(46)
      , g = location.href
      , f = n(47).getRefer()
      , d = n(8);
    c.setA = function(t) {
        s.data.a = t,
        a()
    }
    ,
    c.setB = function(t) {
        s.data.b = t,
        a()
    }
    ,
    c.setAB = function(t, e) {
        s.data.a = t,
        s.data.b = e,
        a()
    }
    ;
    var m = p.getSPMFromUrl
      , h = function() {
        var t = d.utilPvid.makePVId();
        return d.mustSpmE ? t || goldlog.pvid || "" : t || ""
    }
      , _ = function(t, e, n) {
        s.meta_protocol = e.spm_protocol;
        var a, r = t.spm_ab || [], i = r[0] || "0", u = r[1] || "0";
        "0" === i && "0" === u && (o(),
        i = s.data.a || "0",
        u = s.data.b || "0"),
        a = [s.data.a, s.data.b].join("."),
        s.spm_cnt = (a || "0.0") + ".0.0";
        var c = h();
        c && (s.spm_cnt += "." + c),
        t._$.spm = s,
        "function" == typeof n && n()
    };
    c.spaInit = function(t, e, n, o) {
        var a = s.spm_url;
        s.spm_pre = m(f),
        s.spm_url = m(location.href);
        var r = window.g_SPM;
        _(t, e, function() {
            var t = d.utilPvid.getPvId() || ""
              , e = h();
            s.spm_cnt = s.data.a + "." + s.data.b + ".0.0" + (e ? "." + e : "");
            var i = r._current_spm || {}
              , u = n.join(".");
            i && i.a && i.b ? (s.spm_url = [i.a, i.b, i.c, i.d, i.e].join("."),
            s.spm_pre = a) : "0.0" !== u && (s.spm_url = u + ".0.0" + (t ? "." + t : ""),
            s.spm_pre = a),
            "function" == typeof o && o()
        })
    }
    ,
    c.init = function(t, e, n) {
        s.spm_url = m(g),
        s.spm_pre = m(f),
        _(t, e, function() {
            "function" == typeof n && n()
        })
    }
    ,
    c.resetSpmCntPvid = function() {
        var t = goldlog.spm_ab;
        if (t && 2 === t.length) {
            var e = t.join(".") + ".0.0"
              , n = h();
            n && (e = e + "." + n),
            s.spm_cnt = e,
            s.spm_url = e,
            goldlog._$.spm = s
        }
    }
    ,
    t.exports = c
}
, function(t, e) {
    "use strict";
    function n(t, e) {
        if (!t || !e)
            return "";
        var n, o = "";
        try {
            var a = new RegExp(t + "=([^&|#|?|/]+)");
            if ("spm" === t || "scm" === t) {
                var r = new RegExp("\\?.*" + t + "=([\\w\\.\\-\\*/]+)")
                  , i = e.match(a)
                  , s = e.match(r)
                  , u = i && 2 === i.length ? i[1] : ""
                  , c = s && 2 === s.length ? s[1] : "";
                o = u > c ? u : c,
                o = decodeURIComponent(o)
            } else
                n = e.match(a),
                o = n && 2 === n.length ? n[1] : ""
        } catch (t) {} finally {
            return o
        }
    }
    e.getParamFromUrl = n,
    e.getSPMFromUrl = function(t) {
        return n("spm", t)
    }
}
, function(t, e, n) {
    "use strict";
    var o = null
      , a = n(7).nameStorage
      , r = n(9);
    e.getRefer = function() {
        if (null !== o)
            return o;
        var t = r.KEY || {}
          , e = t.NAME_STORAGE || {};
        return o = document.referrer || a.getItem(e.REFERRER) || ""
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(41);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            updateBasicParams: function() {
                var t = this.options.context.what_to_sendpv.pvdata || []
                  , e = this.options.context.etag || {};
                return e.cna && (o.updateKey(t, "cna", e.cna),
                this.options.context.what_to_sendpv.pvdata = t),
                t
            },
            addTagParams: function() {
                var t = this.options.context.what_to_sendpv.pvdata || []
                  , e = this.options.context.etag || {}
                  , n = [];
                (e.tag || 0 === e.tag) && n.push(["tag", e.tag]),
                (e.stag || 0 === e.stag) && n.push(["stag", e.stag]),
                (e.ltag || 0 === e.ltag) && n.push(["ltag", e.ltag]),
                n.length > 0 && (this.options.context.what_to_sendpv.pvdata = t.concat(n))
            },
            run: function() {
                this.updateBasicParams(),
                this.addTagParams()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        var e, n, o, a, i = [], s = {};
        for (e = t.length - 1; e >= 0; e--)
            n = t[e],
            o = n[0],
            o && o.indexOf(r.s_plain_obj) == -1 && s.hasOwnProperty(o) || (a = n[1],
            ("aplus" == o || a) && (i.unshift([o, a]),
            s[o] = 1));
        return i
    }
    function a(t) {
        var e, n, o, a, s = [], u = {
            logtype: !0,
            cache: !0,
            scr: !0,
            "spm-cnt": !0
        };
        for (e = t.length - 1; e >= 0; e--)
            if (n = t[e],
            o = n[0],
            a = n[1],
            !(i.isStartWith(o, r.s_plain_obj) && !i.isStartWith(o, r.mkPlainKeyForExparams()) || u[o]))
                if (i.isStartWith(o, r.mkPlainKeyForExparams())) {
                    var c = r.param2arr(a);
                    if ("object" == typeof c && c.length > 0)
                        for (var l = c.length - 1; l >= 0; l--) {
                            var p = c[l];
                            p && p[1] && s.unshift([p[0], p[1]])
                        }
                } else
                    s.unshift([o, a]);
        return s
    }
    var r = n(30)
      , i = n(13)
      , s = n(24)
      , u = n(33)
      , c = n(29)
      , l = n(8)
      , p = n(14);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getToUtData: function(t, e) {
                var n, i = s.getGoldlogVal("_$") || {}, g = i.spm || {}, f = a(o(t)), d = {};
                try {
                    var m = r.arr2obj(f);
                    m._toUT = 1,
                    m._bridgeName = e.bridgeName || "",
                    n = JSON.stringify(m)
                } catch (t) {
                    n = '{"_toUT":1}'
                }
                var h = u.getOnePageInfo(c);
                return d.functype = "2001",
                d.urlpagename = h.urlpagename,
                d.url = location.href,
                d.spmcnt = g.spm_cnt || "",
                d.spmpre = g.spm_pre || "",
                d.lzsid = "",
                d.cna = p.getCookie("cna"),
                d.extendargs = n,
                d.isonepage = h.isonepage,
                d.version = l.toUtVersion,
                d.lver = goldlog.lver || l.lver,
                d.jsver = l.script_name,
                d
            },
            run: function() {
                var t = this.options.context || {}
                  , e = t.what_to_sendpv || {}
                  , n = e.pvdata || []
                  , o = t.what_to_sendpv_ut || {}
                  , a = t.where_to_sendlog_ut || {}
                  , r = a.aplusToUT || {}
                  , i = r.toUT || {};
                i && i.isAvailable && "function" == typeof i.toUT2 && (o.pvdataToUt = this.getToUtData(n, i),
                this.options.context.what_to_sendpv_ut = o)
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = o.getGoldlogVal("_$") || {}
                  , e = t.send_pv_count || 0
                  , n = this.options.config || {};
                return n.is_auto && e > 0 ? "done" : (t.send_pv_count = ++e,
                void o.setGoldlogVal("_$", t))
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(24)
      , r = n(29);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getMetaInfo: function() {
                var t = a.getGoldlogVal("_$") || {}
                  , e = t.meta_info || r.getInfo();
                return e
            },
            getAplusMetaByKey: function(t) {
                var e = this.getMetaInfo() || {};
                return e[t]
            },
            getGifPath: function(t, e) {
                var n, r = a.getGoldlogVal("_$") || {};
                if ("function" == typeof t)
                    n = t(location.hostname, r.is_terminal, o.is_in_iframe) + ".gif";
                else if (!n && e) {
                    var i = e.match(/\/\w+\.gif/);
                    i && i.length > 0 && (n = i[0])
                }
                return n || (n = r.is_terminal ? "m.gif" : "v.gif"),
                n
            },
            run: function() {
                var t = !!this.options.context.is_single;
                if (!t) {
                    var e = this.getAplusMetaByKey("aplus-rhost-v")
                      , n = this.options.context.where_to_sendpv || {}
                      , a = n.url || ""
                      , r = this.getGifPath(n.urlRule, a)
                      , i = o.getPvUrl({
                        metaName: "aplus-rhost-v",
                        metaValue: e,
                        gifPath: r,
                        url: a
                    });
                    n.url = i,
                    this.options.context.where_to_sendpv = n
                }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24)
      , a = n(30);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = this.options.context || {}
                  , e = !!t.is_single;
                if (!e) {
                    var n = t.what_to_sendpv || {}
                      , r = t.where_to_sendpv || {}
                      , i = n.pvdata || []
                      , s = goldlog.send(r.url, a.arr2obj(i));
                    o.setGoldlogVal("req", s)
                }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(54);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function(t, e) {
                var n = this
                  , a = this.options.context || {}
                  , r = a.what_to_sendpv_ut || {}
                  , i = a.where_to_sendlog_ut || {}
                  , s = r.pvdataToUt || {}
                  , u = i.aplusToUT || {}
                  , c = u.toUT;
                if (c && "function" == typeof c.toUT2 && c.isAvailable)
                    try {
                        c.toUT2(s, function() {
                            n.options.context.what_to_sendpv_ut.isSuccess = !0,
                            e()
                        }, function(t) {
                            o.do_tracker_jserror({
                                message: "do_sendpv_ut error",
                                error: JSON.stringify(t),
                                filename: "do_sendpv_ut"
                            }),
                            e()
                        }, 5e3)
                    } catch (t) {
                        e()
                    } finally {
                        return "pause"
                    }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(23)
      , a = function(t, e, n) {
        try {
            var a = window.goldlog_queue || (window.goldlog_queue = []);
            a.push({
                action: ["goldlog", "_aplus_cplugin_m", e].join("."),
                arguments: [t, n]
            })
        } catch (t) {
            o.logger({
                msg: t
            })
        }
    };
    e.do_tracker_jserror = function(t, e) {
        a(t, "do_tracker_jserror", e)
    }
    ,
    e.do_tracker_obsolete_inter = function(t, e) {
        a(t, "do_tracker_obsolete_inter", e)
    }
    ,
    e.wrap = function(t) {
        if ("function" == typeof t)
            try {
                t()
            } catch (t) {
                o.logger({
                    msg: t.message || t
                })
            } finally {}
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(24)
      , r = n(56);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = a.getGoldlogVal("_$") || {}
                  , e = t.spm || {}
                  , n = e.data || {};
                if (1 === goldlog._$.send_pv_count) {
                    var i = n.a
                      , s = i + "." + n.b;
                    o.is_in_iframe || goldlog._$.is_terminal || "a21bo.7724922" != s && "2013" != i && "a220o" != i || r.create("//cookiemapping.wrating.com/link.html")
                }
            }
        }
    }
}
, function(t, e) {
    "use strict";
    var n = document
      , o = {};
    o.create = function(t, e) {
        var o = n.createElement("iframe");
        o.style.width = "1px",
        o.style.height = "1px",
        o.style.position = "absolute",
        o.style.display = "none",
        o.src = t,
        e && (o.name = e);
        var a = n.getElementsByTagName("body")[0];
        return a.appendChild(o),
        o
    }
    ,
    t.exports = o
}
, function(t, e, n) {
    "use strict";
    var o = n(5)
      , a = n(24);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = goldlog._$ || {}
                  , e = this.options.context || {};
                a.setGoldlogVal("pv_context", e);
                var n = goldlog.spm_ab || []
                  , r = n.join(".")
                  , i = t.send_pv_count
                  , s = {
                    cna: e.etag.cna,
                    count: i,
                    spmab_pre: goldlog.spmab_pre
                };
                o.doPubMsg(["sendPV", "complete", r, s]),
                o.doCachePubs(["sendPV", "complete", r, s])
            }
        }
    }
}
, function(t, e) {
    "use strict";
    e.plugins_prepv = []
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t = i.getGoldlogVal("_$") || {}
          , e = "//gm.mmstat.com/";
        return t.is_terminal && (e = "//wgo.mmstat.com/"),
        {
            where_to_hjlj: {
                url: e,
                ac_atpanel: "//ac.mmstat.com/",
                tblogUrl: "//log.mmstat.com/"
            }
        }
    }
    function a() {
        return r.assign(new s, new o)
    }
    var r = n(13)
      , i = n(24)
      , s = n(60);
    t.exports = a
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t = goldlog.getCdnPath()
          , e = "//assets.alicdn.com/g" === t;
        return {
            compose: {},
            basic_params: {
                cna: a.getCookie("cna")
            },
            where_to_hjlj: {
                url: e ? "//gj.mmstat.com/" : "//gm.mmstat.com/",
                ac_atpanel: e ? "//gj.mmstat.com/" : "//ac.mmstat.com/",
                tblogUrl: e ? "//gj.mmstat.com/" : "//log.mmstat.com/"
            },
            userdata: {},
            what_to_hjlj: {
                logdata: {}
            },
            what_to_pvhash: {
                hash: []
            },
            what_to_hjlj_exinfo: {
                EXPARAMS_FLAG: "EXPARAMS",
                exinfo: [],
                exparams_key_names: ["uidaplus", "pc_i", "pu_i"]
            },
            what_to_hjlj_ut: {
                logdataToUT: {}
            },
            what_to_hjlj_ut2: {
                isSuccess: !1,
                logdataToUT: {}
            },
            where_to_sendlog_ut: {
                aplusToUT: {},
                toUTName: "toUT"
            },
            is_single: !1
        }
    }
    var a = n(14);
    t.exports = o
}
, function(t, e, n) {
    "use strict";
    e.plugins_hjlj = [{
        name: "where_to_sendlog_ut",
        enable: !0,
        path: n(34)
    }, {
        name: "is_single",
        enable: !0,
        path: n(36)
    }, {
        name: "what_to_hjlj_exinfo",
        enable: !0,
        path: n(62)
    }, {
        name: "what_to_pvhash",
        enable: !0,
        path: n(39)
    }, {
        name: "what_to_hjlj",
        enable: !0,
        path: n(63),
        deps: ["what_to_hjlj_exinfo", "what_to_pvhash"]
    }, {
        name: "what_to_hjlj_ut",
        enable: !0,
        path: n(64),
        deps: ["is_single", "what_to_hjlj_exinfo"]
    }, {
        name: "where_to_hjlj",
        enable: !0,
        path: n(65),
        deps: ["is_single", "what_to_hjlj"]
    }, {
        name: "do_sendhjlj",
        enable: !0,
        path: n(66),
        deps: ["is_single", "what_to_hjlj", "where_to_hjlj"]
    }, {
        name: "do_sendhjlj_ut",
        enable: !0,
        path: n(67),
        deps: ["what_to_hjlj", "what_to_hjlj_ut", "where_to_sendlog_ut"]
    }]
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(20)
      , r = n(24)
      , i = n(24)
      , s = n(32)
      , u = n(14);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getCookieUserInfo: function() {
                var t = []
                  , e = u.getCookie("workno") || u.getCookie("emplId");
                return e && t.push("workno=" + e),
                t
            },
            filterExinfo: function(t) {
                var e = "";
                try {
                    t && "string" == typeof t && (e = t.replace(/&amp;/g, "&").replace(/\buserid=/, "uidaplus=").replace(/&aplus&/, "&"))
                } catch (t) {
                    e = t.message ? t.message : ""
                }
                return e
            },
            getExparamsFlag: function() {
                var t = this.options.context || {}
                  , e = t.what_to_hjlj_exinfo || {};
                return e.EXPARAMS_FLAG || "EXPARAMS"
            },
            getCustomExParams: function(t) {
                var e = "";
                return t !== this.getExparamsFlag() && (e = this.filterExinfo(t) || ""),
                e ? e.split("&") : []
            },
            getBeaconExparams: function(t, e) {
                var n = []
                  , r = a.getExParams(o) || "";
                r = r.replace(/&aplus&/, "&");
                for (var i = o.param2arr(r) || [], u = function(e) {
                    return s.indexof(t, e) > -1
                }, c = 0; c < i.length; c++) {
                    var l = i[c]
                      , p = l[0] || ""
                      , g = l[1] || "";
                    p && g && (e === this.getExparamsFlag() || u(p)) && n.push(p + "=" + g)
                }
                return n
            },
            getExinfo: function(t) {
                var e = this.options.context || {}
                  , n = e.what_to_hjlj_exinfo || {}
                  , o = n.exparams_key_names || []
                  , a = this.getBeaconExparams(o, t);
                return a
            },
            doConcatArr: function(t, e) {
                return e && e.length > 0 && (t = t.concat(e)),
                t
            },
            run: function() {
                try {
                    var t = this.options.context.what_to_hjlj_exinfo || {}
                      , e = r.getGoldlogVal("_$") || {}
                      , n = e.meta_info || {}
                      , o = n["aplus-exinfo"] || ""
                      , a = [];
                    a = this.doConcatArr(a, t.exinfo || []),
                    a = this.doConcatArr(a, this.getExinfo(o)),
                    a = this.doConcatArr(a, this.getCookieUserInfo()),
                    a = this.doConcatArr(a, this.getCustomExParams(o)),
                    t.exinfo = a.join("&"),
                    this.options.context.what_to_hjlj_exinfo = t
                } catch (t) {
                    i.logger({
                        msg: t ? t.message : ""
                    })
                }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(20)
      , a = n(30)
      , r = n(13);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getParams: function() {
                var t = this.options.context || {}
                  , e = t.userdata || {}
                  , n = t.basic_params || {}
                  , i = t.what_to_hjlj_exinfo || {}
                  , s = i.exinfo || "";
                e.gokey && s && 0 !== s.indexOf("&") && (s = "&" + s);
                var u = n.cna
                  , c = e.gmkey
                  , l = e.gokey + s
                  , p = t.what_to_pvhash || {}
                  , g = p.hash || [];
                g.length && (l += "&" + g.join("="));
                var f = {
                    cache: r.makeCacheNum(),
                    gmkey: c,
                    gokey: l,
                    cna: u
                };
                e["spm-cnt"] && (f["spm-cnt"] = e["spm-cnt"]),
                e["spm-pre"] && (f["spm-pre"] = e["spm-pre"]);
                try {
                    var d = o.getExParams(a)
                      , m = a.param2obj(d).uidaplus;
                    m && (f._gr_uid_ = m)
                } catch (t) {}
                return f
            },
            run: function() {
                this.options.context.what_to_hjlj.logdata = this.getParams()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(37)
      , a = n(14)
      , r = n(24)
      , i = n(8);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getToUtData: function(t, e) {
                var n = r.getGoldlogVal("_$") || {}
                  , s = n.spm || {}
                  , u = this.options.context || {}
                  , c = u.userdata || {}
                  , l = u.what_to_hjlj_exinfo || {}
                  , p = l.exinfo || "";
                c.gokey && p && 0 !== p.indexOf("&") && (p = "&" + p);
                var g = c.gokey + p
                  , f = {
                    gmkey: c.gmkey,
                    gokey: g,
                    lver: i.lver,
                    jsver: i.script_name,
                    version: i.toUtVersion,
                    spm_cnt: s.spm_cnt || "",
                    spm_url: s.spm_url || "",
                    spm_pre: s.spm_pre || ""
                };
                t && (f._is_g2u_ = 1),
                f._bridgeName = e.bridgeName || "",
                f._toUT = 1;
                try {
                    f = JSON.stringify(f),
                    "{}" == f && (f = "")
                } catch (t) {
                    f = ""
                }
                var d = n.meta_info.isonepage_data.isonepage
                  , m = n.meta_info.isonepage_data.urlpagename
                  , h = {};
                return h.functype = o.getFunctypeValue({
                    logkey: c.logkey,
                    gmkey: c.gmkey,
                    spm_ab: r.getGoldlogVal("spm_ab")
                }),
                h.spmcnt = s.spm_cnt || "",
                h.spmurl = s.spm_url || "",
                h.spmpre = s.spm_pre || "",
                h.logkey = c.logkey,
                h.logkeyargs = f,
                h.urlpagename = m,
                h.url = location.href,
                h.cna = a.getCookie("cna") || "",
                h.extendargs = "",
                h.isonepage = d,
                h
            },
            run: function() {
                var t = this.options.context || {}
                  , e = !!t.is_single
                  , n = t.what_to_hjlj_ut || {}
                  , o = t.where_to_sendlog_ut || {}
                  , a = o.aplusToUT || {}
                  , r = a.toUT || {};
                n.logdataToUT = this.getToUtData(e, r),
                this.options.context.what_to_hjlj_ut = n
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(30)
      , a = n(13)
      , r = n(24)
      , i = n(23)
      , s = n(29);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            getMetaInfo: function() {
                var t = r.getGoldlogVal("_$") || {}
                  , e = t.meta_info || s.getInfo();
                return e
            },
            getAplusMetaByKey: function(t) {
                var e = this.getMetaInfo() || {};
                return e[t]
            },
            cramUrl: function(t) {
                var e = r.getGoldlogVal("_$") || {}
                  , n = e.spm || {}
                  , o = this.options.context.where_to_hjlj || {}
                  , i = o.ac_atpanel
                  , s = o.tblogUrl
                  , u = this.options.context.what_to_hjlj || {}
                  , c = this.options.context.userdata || {}
                  , l = !0
                  , p = c.logkey;
                if (!p)
                    return {
                        url: t,
                        logkey_available: !1
                    };
                if ("ac" == p)
                    t = i + "1.gif";
                else if (a.isStartWith(p, "ac-"))
                    t = i + p.substr(3);
                else if (a.isStartWith(p, "/")) {
                    t += p.substr(1);
                    var g = u.logdata || {};
                    g["spm-cnt"] = n.spm_cnt,
                    g.logtype = 2;
                    try {
                        u.logdata = g,
                        this.options.context.what_to_hjlj = u
                    } catch (t) {}
                } else
                    a.isEndWith(p, ".gif") ? t = s + p : l = !1;
                return {
                    url: t,
                    logkey_available: l
                }
            },
            can_to_sendhjlj: function(t) {
                var e = this.options.context || {}
                  , n = e.logger || function() {}
                  , o = this.options.context.userdata || {};
                return !!t.logkey_available || (n({
                    msg: "logkey: " + o.logkey + " is not legal!"
                }),
                !1)
            },
            run: function() {
                var t = !!this.options.context.is_single;
                if (!t) {
                    var e, n, a = this.options.context.where_to_hjlj.url, r = this.getAplusMetaByKey("aplus-rhost-g"), s = r && o.hostValidity(r);
                    s && (e = /^\/\//.test(r) ? "" : "//",
                    n = /\/$/.test(r) ? "" : "/",
                    a = e + r + n),
                    r && !s && i.logger({
                        msg: "aplus-rhost-g: " + r + ' is invalid, suggestion: "xxx.mmstat.com"'
                    });
                    var u = this.cramUrl(a);
                    return this.can_to_sendhjlj(u) ? void (this.options.context.where_to_hjlj.url = u.url) : "done"
                }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(24);
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function() {
                var t = this.options.context || {}
                  , e = this.options.config || {}
                  , n = !!t.is_single;
                if (!n) {
                    var a = t.logger || {}
                      , r = t.what_to_hjlj || {}
                      , i = t.where_to_hjlj || {}
                      , s = r.logdata || {}
                      , u = i.url || "";
                    u || "function" != typeof a || a({
                        msg: "warning: where_to_hjlj.url is null, goldlog.record failed!"
                    });
                    var c = goldlog.send(i.url, s, e.method || "GET");
                    o.setGoldlogVal("req", c)
                }
            }
        }
    }
}
, function(t, e) {
    "use strict";
    t.exports = function() {
        return {
            init: function(t) {
                this.options = t
            },
            run: function(t, e) {
                var n = this.options.context || {}
                  , o = n.what_to_hjlj_ut2.isSuccess
                  , a = n.logger || function() {}
                  , r = !!n.is_single
                  , i = n.where_to_sendlog_ut || {}
                  , s = n.what_to_hjlj_ut || {}
                  , u = s.logdataToUT || {}
                  , c = i.aplusToUT || {}
                  , l = c.toUT;
                if (!o && l && "function" == typeof l.toUT2 && l.isAvailable)
                    try {
                        l.toUT2(u, function() {
                            e()
                        }, function() {
                            e()
                        }, 5e3)
                    } catch (t) {
                        r && a({
                            msg: "warning: singleSend toUTName = " + i.toUTName + " errorMsg:" + t.message
                        })
                    } finally {
                        return "pause"
                    }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t, e, n = i.KEY || {}, o = n.NAME_STORAGE || {};
        if (!c && u) {
            var a = location.href
              , l = u && (a.indexOf("login.taobao.com") >= 0 || a.indexOf("login.tmall.com") >= 0)
              , p = s.getRefer();
            l && p ? (t = p,
            e = r.getItem(o.REFERRER_PV_ID)) : (t = a,
            e = goldlog.pvid),
            r.setItem(o.REFERRER, t),
            r.setItem(o.REFERRER_PV_ID, e)
        }
    }
    var a = n(69)
      , r = n(7).nameStorage
      , i = n(8)
      , s = n(47)
      , u = "https:" == location.protocol
      , c = parent !== self;
    e.run = function() {
        a.on(window, "beforeunload", function() {
            o()
        })
    }
}
, function(t, e) {
    "use strict";
    function n(t, e) {
        var n = goldlog._$ || {}
          , a = n.meta_info || {}
          , r = a.aplus_ctap || {};
        if (r && "function" == typeof r.on)
            r.on(t, e);
        else {
            var i = "ontouchend"in document.createElement("div")
              , s = i ? "touchstart" : "mousedown";
            o(t, s, e)
        }
    }
    function o(t, e, o) {
        return "tap" === e ? void n(t, o) : void t[c]((i ? "on" : "") + e, function(t) {
            t = t || a.event;
            var e = t.target || t.srcElement;
            "function" == typeof o && o(t, e)
        }, !1)
    }
    var a = window
      , r = document
      , i = !!r.attachEvent
      , s = "attachEvent"
      , u = "addEventListener"
      , c = i ? s : u;
    e.on = o;
    var l = function(t) {
        try {
            r.documentElement.doScroll("left")
        } catch (e) {
            return void setTimeout(function() {
                l(t)
            }, 1)
        }
        t()
    }
      , p = function(t) {
        var e = 0
          , n = function() {
            0 === e && t(),
            e++
        };
        "complete" === r.readyState && n();
        var o;
        if (r.addEventListener)
            o = function() {
                r.removeEventListener("DOMContentLoaded", o, !1),
                n()
            }
            ,
            r.addEventListener("DOMContentLoaded", o, !1),
            window.addEventListener("load", n, !1);
        else if (r.attachEvent) {
            o = function() {
                "complete" === r.readyState && (r.detachEvent("onreadystatechange", o),
                n())
            }
            ,
            r.attachEvent("onreadystatechange", o),
            window.attachEvent("onload", n);
            var a = !1;
            try {
                a = null === window.frameElement
            } catch (t) {}
            r.documentElement.doScroll && a && l(n)
        }
    };
    e.DOMReady = function(t) {
        p(t)
    }
    ,
    e.onload = function(t) {
        "complete" === r.readyState ? t() : o(a, "load", t)
    }
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t, e = "_ap", n = r[e] = r[e] || [];
        n.push = t = function() {
            for (var t, e, o = 0, a = arguments.length; o < a; o++)
                t = arguments[o],
                s.isString(t) ? goldlog.send(l.hjlj() + t) : s.isArray(t) && "push" != (e = t[0]) && (n[e] = n[e] || []).push(t.slice(1))
        }
        ;
        for (var o; o = n.shift(); )
            t(o)
    }
    function a() {
        var t = (new Date).getTime()
          , e = Math.floor(t / 72e5)
          , n = i.getElementById("aplus-sufei")
          , o = goldlog._$ || {}
          , a = goldlog.getCdnPath()
          , r = a + "/alilog/aplus_plugin_xwj/index.js?t=" + e
          , s = a + "/pecdn/mlog/agp_heat.min.js?t=" + e
          , l = a + "/alilog/oneplus/entry.js?t=" + e
          , p = a + "/alilog/stat/a.js?t=" + e
          , g = a + "/secdev/entry/index.js?t=" + e
          , f = a + "/alilog/mlog/wp_beacon.js?t=" + e
          , d = o.meta_info
          , m = function() {
            u.addScript(p),
            u.addScript(f),
            setTimeout(function() {
                n && "script" == n.tagName.toLowerCase() || u.addScript(g, "", "aplus-sufei")
            }, 10),
            u.addScript(r),
            u.addScript(s),
            u.addScript(l)
        }
          , h = function() {
            Math.random() < .01 && u.addScript(p),
            d.ms_data_instance_id && d.ms_prototype_id && d.ms_prototype_id.match(/^[124]$/) && d.ms_data_shop_id && u.addScript(f),
            setTimeout(function() {
                n && "script" == n.tagName.toLowerCase() || u.addScript(g)
            }, 1e3);
            var t = d["aplus-rate-ahot"];
            (Math.random() < t || d["ahot-aplus"]) && u.addScript(r),
            u.addScript(s),
            u.addScript(l)
        };
        c.onload(function() {
            try {
                var t = d["aplus-xplug"];
                switch (t) {
                case "NONE":
                    break;
                case "ALL":
                    m();
                    break;
                default:
                    h()
                }
            } catch (t) {}
        })
    }
    var r = window
      , i = document
      , s = n(13)
      , u = n(20)
      , c = n(69)
      , l = n(71)
      , p = n(72)
      , g = n(73);
    e.run = function() {
        g.init_loadAplusPlugin(),
        o(),
        a()
    }
    ,
    e.init_watchGoldlogQueue = p.init_watchGoldlogQueue
}
, function(t, e, n) {
    "use strict";
    var o = n(21);
    e.hjlj = function() {
        var t = window.goldlog || (window.goldlog = {})
          , e = t._$ || {}
          , n = e.script_name
          , a = e.meta_info || {}
          , r = a["aplus-rhost-g"]
          , i = "//gm.mmstat.com/";
        return (e.is_terminal || "aplus_wap" === n) && (i = "//wgo.mmstat.com/"),
        "aplus_int" === n && (i = "//gj.mmstat.com/"),
        r && (i = "//" + r + "/"),
        o.getProtocal() + i
    }
}
, function(t, e, n) {
    "use strict";
    var o = window
      , a = n(13)
      , r = n(71)
      , i = n(4);
    e.init_aplusQueue = function() {
        var t, e = "_ap", n = o[e] = o[e] || [];
        n.push = t = function() {
            for (var t, e, o = 0, i = arguments.length; o < i; o++)
                t = arguments[o],
                a.isString(t) ? goldlog.send(r.hjlj() + t) : a.isArray(t) && "push" != (e = t[0]) && (n[e] = n[e] || []).push(t.slice(1))
        }
        ;
        for (var i; i = n.shift(); )
            t(i)
    }
    ;
    var s = "goldlog_queue"
      , u = function(t) {
        try {
            if (t && t.action && t.arguments && a.isArray(t.arguments)) {
                var e = t.action.split(".")
                  , n = o
                  , r = o;
                if (3 === e.length)
                    n = o[e[0]][e[1]],
                    r = n[e[2]];
                else
                    for (; e.length; )
                        if (r = n = n[e.shift()],
                        !n)
                            return;
                "function" == typeof r && r.apply(n, t.arguments)
            }
        } catch (t) {}
    }
      , c = function(t) {
        function e() {
            var t = o[s];
            if (t && a.isArray(t) && t.length) {
                o[s] && a.isArray(o[s]) || (o[s] = []);
                for (var e = {}; e = t.shift(); )
                    e && e.action && e.arguments && a.isArray(e.arguments) && u(e)
            }
        }
        try {
            e()
        } catch (t) {} finally {
            "function" == typeof t && t()
        }
    };
    e.processGoldlogQueue = c;
    var l = i.extend({
        push: function(t) {
            this.length++,
            u(t)
        }
    })
      , p = function() {
        o[s] = l.create({
            length: 0
        })
    }
      , g = function(t) {
        for (var e = 0, n = 0; n < t.length; n++)
            t[n] || e++;
        return e === t.length
    };
    e.init_watchGoldlogQueue = function() {
        try {
            var t = o[s] || [];
            !t || 0 === t.length || g(t || []) ? p() : c(function() {
                p()
            })
        } catch (t) {}
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(20)
      , a = n(33)
      , r = n(10)
      , i = function(t, e) {
        var n = a.getMetaCnt(t);
        return !(!n && !e)
    }
      , s = function() {
        var t = goldlog.getCdnPath();
        return {
            aplus_ae_path: t + "/alilog/s/" + r.lver + "/plugin/aplus_ae.js",
            aplus_ac_path: t + "/alilog/s/" + r.lver + "/plugin/aplus_ac.js"
        }
    }
      , u = function(t, e) {
        var n = s()
          , a = i(t, e)
          , r = {
            "aplus-auto-exp": n.aplus_ae_path,
            "aplus-auto-clk": n.aplus_ac_path
        };
        a && r[t] && o.addScript(r[t])
    };
    e.init_loadAplusPlugin = function() {
        u("aplus-auto-exp"),
        u("aplus-auto-clk"),
        goldlog.aplus_pubsub.subscribe("setMetaInfo", function(t, e) {
            "aplus-auto-exp" !== t || goldlog._aplus_auto_exp || u(t, e)
        })
    }
}
, function(t, e) {
    "use strict";
    function n(t, e) {
        return t.indexOf(e) > -1
    }
    function o(t, e) {
        for (var o = 0, a = t.length; o < a; o++)
            if (n(e, t[o]))
                return !0;
        return !1
    }
    var a = location.host
      , r = ["xiaobai.com", "admin.taobao.org", "aliloan.com", "mybank.cn"]
      , i = ["tmc.admin.taobao.org", "tmall.admin.taobao.org"];
    e.is_exception = o(r, a) && !o(i, a)
}
, function(t, e, n) {
    "use strict";
    function o() {
        var t, e, n, o, a = u.getElementsByTagName("meta");
        for (t = 0,
        e = a.length; t < e; t++)
            if (n = a[t],
            o = n.getAttribute("name"),
            "data-spm" === o || "spm-id" === o)
                return n
    }
    function a() {
        var t = u.createElement("meta");
        t.setAttribute("name", "data-spm");
        var e = u.getElementsByTagName("head")[0];
        return e && e.insertBefore(t, e.firstChild),
        t
    }
    function r() {
        var t = o();
        t || (t = a()),
        t.setAttribute("content", goldlog.spm_ab[0] || "");
        var e = u.getElementsByTagName("body")[0];
        e && e.setAttribute("data-spm", goldlog.spm_ab[1] || "")
    }
    function i() {
        var t, e, n, o = u.getElementsByTagName("*");
        for (t = 0,
        e = o.length; t < e; t++)
            n = o[t],
            n.getAttribute("data-spm-max-idx") && n.setAttribute("data-spm-max-idx", ""),
            n.getAttribute("data-spm-anchor-id") && n.setAttribute("data-spm-anchor-id", "")
    }
    var s = window
      , u = document
      , c = n(30)
      , l = n(69)
      , p = n(23)
      , g = n(5)
      , f = n(13)
      , d = n(24)
      , m = n(21)
      , h = n(35)
      , _ = n(41)
      , v = n(45)
      , b = n(29)
      , y = b.getInfo()
      , w = n(8)
      , x = n(54)
      , j = n(76)
      , T = n(14)
      , P = n(79)
      , S = c.isDebugAplus()
      , k = []
      , A = []
      , E = []
      , C = []
      , U = function(t, e) {
        var n = new Image
          , o = "_img_" + Math.random()
          , a = c.makeUrl(t, e);
        return s[o] = n,
        n.onload = function() {
            s[o] = null
        }
        ,
        n.onerror = function() {
            s[o] = null
        }
        ,
        n.src = a,
        n = null,
        a
    }
      , V = function(t, e) {
        if (navigator && navigator.sendBeacon) {
            for (var n in e)
                e[n] = encodeURIComponent(e[n]);
            navigator.sendBeacon(t, JSON.stringify(e))
        } else
            U(t, e);
        return t
    }
      , I = function() {
        var t = document
          , e = t.getElementById("beacon-aplus") || t.getElementById("tb-beacon-aplus")
          , n = "//g.alicdn.com"
          , o = ["//assets.alicdn.com/g", "//g-assets.daily.taobao.net"];
        if (e)
            for (var a = 0; a < o.length; a++) {
                var r = new RegExp(o[a]);
                if (r.test(e.src)) {
                    n = o[a];
                    break
                }
            }
        return n
    };
    e.init = function() {
        var t = goldlog._$ = goldlog._$ || {}
          , e = {
            getCookie: function(t) {
                return T.getCookie(t)
            },
            getParam: function(t) {
                var e = window.WindVane || {}
                  , n = h.isAplusChnl()
                  , o = "";
                n && "object" == typeof n && (o = n.bridgeName || "customBridge");
                var a = e.getParam ? "WindVane" : o
                  , r = e && "function" == typeof e.getParam ? e.getParam(t) : ""
                  , i = goldlog.spm_ab ? goldlog.spm_ab.join(".") : "0.0"
                  , s = "sid=" + t + "@valueIsEmpty=" + !r;
                return a && (s += "_bridgeName=" + a),
                x.do_tracker_obsolete_inter({
                    ratio: S ? 1 : .01,
                    page: location.hostname + location.pathname,
                    spm_ab: i,
                    interface_name: "goldlog.getParam",
                    interface_params: s
                }),
                r
            },
            _d_a: {
                t: 1
            },
            beforeSendPV: function(t) {
                k.push(t)
            },
            afterSendPV: function(t) {
                A.push(t)
            },
            send: function(t, e, n) {
                var o;
                if (0 === t.indexOf("//")) {
                    var a = m.getProtocal();
                    t = a + t
                }
                return o = "POST" === n && navigator.sendBeacon ? V(t, e) : U(t, e)
            },
            launch: function(t, e) {
                var n;
                try {
                    e = f.assign(e, t),
                    n = goldlog._$._sendPV(e, t);
                    var o = goldlog.spm_ab ? goldlog.spm_ab.join(".") : "0.0";
                    x.do_tracker_obsolete_inter({
                        page: location.hostname + location.pathname,
                        spm_ab: o,
                        interface_name: "goldlog.launch",
                        interface_params: "userdata = " + JSON.stringify(t) + ", config = " + JSON.stringify(e)
                    })
                } catch (t) {} finally {
                    return p.logger({
                        msg: "warning: This interface is deprecated, please use goldlog.sendPV instead! API: http://log.alibaba-inc.com/log/info.htm?type=2277&id=31"
                    }),
                    n
                }
            },
            _$: {
                _sendPV: function(t, e) {
                    t = t || {};
                    var o = goldlog._$.send_pv_count;
                    if (o > 0 && !_.checkIfSendPV(t.checksum, e))
                        return !1;
                    if (f.any(k, function(e) {
                        return e(goldlog, t) === !1
                    }))
                        return !1;
                    var a = n(81).SendPV
                      , r = new a;
                    return "undefined" == typeof t.recordType && (t.recordType = w.recordTypes.pv),
                    r.run(t, e, {
                        fn_after_pv: A
                    }),
                    !0
                },
                _sendPseudo: function(t, e) {
                    t || (t = {});
                    var o = n(82).SendPrePV
                      , a = new o;
                    return "undefined" == typeof t.recordType && (t.recordType = w.recordTypes.prepv),
                    a.run(t, e, {}, function() {
                        g.doPubMsg(["sendPrePV", "complete"])
                    }),
                    !0
                }
            },
            sendPV: function(t, e) {
                return e = e || {},
                goldlog._$._sendPV(t, e)
            },
            beforeRecord: function(t) {
                E.push(t)
            },
            afterRecord: function(t) {
                C.push(t)
            },
            record: function(t, e, n, o, a) {
                if (!f.any(E, function(t) {
                    return t(goldlog) === !1
                }))
                    return j.run({
                        recordType: w.recordTypes.hjlj,
                        method: "POST" === o ? "POST" : "GET"
                    }, {
                        logkey: t,
                        gmkey: e,
                        gokey: n
                    }, {
                        fn_after_record: C
                    }, function() {
                        "function" == typeof a && a()
                    }),
                    !0
            },
            recordUdata: function(t, e, n, o, a) {
                var r = d.getGoldlogVal("_$") || {}
                  , i = r.spm || {};
                j.run({
                    ignore_chksum: !0,
                    method: "POST" === o ? "POST" : "GET",
                    recordType: w.recordTypes.hjlj
                }, {
                    logkey: t,
                    gmkey: e,
                    gokey: n,
                    "spm-cnt": i.spm_cnt,
                    "spm-pre": i.spm_pre
                }, {}, function() {
                    f.isFunction(a) && a()
                })
            },
            setPageSPM: function(t, e, n) {
                goldlog.spm_ab = goldlog.spm_ab || [];
                var o = f.cloneObj(goldlog.spm_ab);
                t && (goldlog.spm_ab[0] = "" + t,
                goldlog._$.spm.data.a = "" + t),
                e && (goldlog.spm_ab[1] = "" + e,
                goldlog._$.spm.data.b = "" + e),
                v.spaInit(goldlog, y, o);
                var a = o.join(".");
                goldlog.spmab_pre = a;
                var s = goldlog.spm_ab.join(".");
                g.doPubMsg(["setPageSPM", {
                    spmab_pre: a,
                    spmab: s
                }]),
                g.doCachePubs(["setPageSPM", {
                    spmab_pre: a,
                    spmab: s
                }]),
                r(),
                i(),
                "function" == typeof n && n()
            },
            setMetaInfo: function(t, e) {
                if (b.setMetaInfo(t, e)) {
                    var n = d.getGoldlogVal("_$") || {};
                    n.meta_info = b.qGet();
                    var o = d.setGoldlogVal("_$", n)
                      , a = P.isDisablePvid() + "";
                    return "aplus-disable-pvid" === t && a !== e + "" && v.resetSpmCntPvid(),
                    g.doPubMsg(["setMetaInfo", t, e]),
                    o
                }
            },
            getMetaInfo: function(t) {
                return b.getMetaInfo(t)
            },
            on: l.on,
            cloneDeep: f.cloneDeep,
            getPvId: P.getPvId
        };
        return e.getCdnPath = goldlog.getCdnPath ? goldlog.getCdnPath : I,
        t.cdn_path = e.getCdnPath(),
        e
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(13)
      , a = n(24)
      , r = n(23)
      , i = n(77)
      , s = n(78)
      , u = n(8);
    e.run = function(t, e, n, c) {
        var l = new s;
        l.init({
            middleware: [],
            config: t,
            plugins: u.plugins_hjlj
        });
        var p = l.run()
          , g = new u.context_hjlj;
        g.userdata = e,
        g.logger = r.logger;
        var f = {
            context: g,
            pubsub: a.getGoldlogVal("aplus_pubsub"),
            pubsubType: "hjlj"
        }
          , d = new i;
        d.create(f),
        d.wrap(p, function() {
            n && n.fn_after_record && o.each(n.fn_after_record, function(t) {
                t(window.goldlog)
            }),
            "function" == typeof c && c()
        })()
    }
}
, function(t, e, n) {
    "use strict";
    function o() {}
    var a = n(32)
      , r = n(28)
      , i = n(23)
      , s = n(54)
      , u = n(14);
    o.prototype.create = function(t) {
        for (var e in t)
            "undefined" == typeof this[e] && (this[e] = t[e]);
        return this
    }
    ,
    o.prototype.pubsubInfo = function(t) {
        try {
            t && t.pubsub && t.pubsub.publish("mw_change_" + t.pubsubType, t.context)
        } catch (t) {}
    }
    ,
    o.prototype.calledList = [],
    o.prototype.setCalledList = function(t) {
        a.indexof(this.calledList, t) === -1 && this.calledList.push(t)
    }
    ,
    o.prototype.resetCalledList = function() {
        this.calledList = []
    }
    ,
    o.prototype.wrap = function(t, e) {
        var n = this
          , o = this.context || {}
          , c = o.compose || {}
          , l = c.maxTimeout || 1e4;
        return function(o) {
            var c, p = t.length, g = 0, f = 0, d = function() {
                if (n.pubsubInfo(n),
                g === p)
                    return o = "done",
                    n.resetCalledList(),
                    "function" == typeof e && e.call(n, o),
                    void clearTimeout(c);
                if (a.indexof(n.calledList, g) === -1) {
                    if (n.setCalledList(g),
                    !t[g] || "function" != typeof t[g][0])
                        return;
                    try {
                        o = t[g][0].call(n, o, function() {
                            g++,
                            f = 1,
                            clearTimeout(c),
                            d(g)
                        })
                    } catch (e) {
                        s.do_tracker_jserror({
                            message: e ? e.message : "compose middleware error",
                            error: encodeURIComponent(e.stack),
                            filename: t[g][1]
                        })
                    }
                }
                var m = "number" == typeof o;
                if ("pause" === o || m) {
                    f = 0;
                    var h = m ? o : l
                      , _ = t[g] ? t[g][1] : "";
                    c = r.sleep(h, function() {
                        if (0 === f) {
                            var t = "jump the middleware about " + _ + ", because waiting timeout maxTimeout = " + h + "ms!";
                            i.logger({
                                msg: t
                            }),
                            goldlog_queue.push({
                                action: "goldlog._aplus_cplugin_m.do_tracker_browser_support",
                                arguments: [{
                                    msg: t,
                                    spmab: goldlog.spm_ab,
                                    page: location.href,
                                    etag: n.context ? JSON.stringify(n.context.etag) : "",
                                    cna: document.cookie ? u.getCookie("cna") : ""
                                }]
                            }),
                            o = null,
                            g++,
                            d(g)
                        }
                    })
                } else
                    "done" === o ? (g = p,
                    d(g)) : (g++,
                    d(g))
            };
            return n.calledList && n.calledList.length > 0 && n.resetCalledList(),
            d(g)
        }
    }
    ,
    t.exports = o
}
, function(t, e, n) {
    "use strict";
    var o = n(32);
    t.exports = function() {
        return {
            init: function(t) {
                this.opts = t,
                t && "object" == typeof t.middleware && t.middleware.length > 0 ? this.middleware = t.middleware : this.middleware = [],
                this.plugins_name = []
            },
            pubsubInfo: function(t, e) {
                try {
                    var n = t.pubsub;
                    n && n.publish("plugins_change_" + t.pubsubType, e)
                } catch (t) {}
            },
            checkPluginLoader: function(t, e) {
                var n = !0;
                if ("object" == typeof e.enable && "function" == typeof e.enable.isEnable ? n = e.enable.isEnable(e.name) : "boolean" == typeof e.enable && (n = !!e.enable),
                !n)
                    return !1;
                if (n && e.deps && e.deps.length > 0)
                    for (var a = 0; a < e.deps.length; a++)
                        if (o.indexof(this.plugins_name, e.deps[a]) === -1)
                            return !1;
                return !0
            },
            run: function(t) {
                t || (t = 0);
                var e = this
                  , n = this.middleware
                  , o = this.opts || {}
                  , a = o.plugins;
                if (a && "object" == typeof a && a.length > 0) {
                    var r = a[t];
                    if (this.checkPluginLoader(a, r) && (this.plugins_name.push(r.name),
                    n.push([function(t, n) {
                        e.pubsubInfo(this, r);
                        var a = new r.path;
                        return a.init({
                            context: this.context,
                            config: o.config
                        }),
                        a.run(t, n)
                    }
                    , r.name])),
                    t++,
                    a[t])
                        return this.run(t)
                } else
                    window.console && console.log("aplus plugins " + JSON.stringify(a) + " must be object of array!");
                return n
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function o(t) {
        function e(t) {
            var e = "0123456789abcdefhijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ"
              , n = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ";
            return 1 == t ? e.substr(Math.floor(60 * Math.random()), 1) : 2 == t ? n.substr(Math.floor(60 * Math.random()), 1) : "0"
        }
        for (var n, o = "", a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = !1; o.length < t; )
            n = a.substr(Math.floor(62 * Math.random()), 1),
            !r && o.length <= 2 && ("g" == n.toLowerCase() || "l" == n.toLowerCase()) && (0 === o.length && "g" == n.toLowerCase() ? Math.random() < .5 && (n = e(1),
            r = !0) : 1 == o.length && "l" == n.toLowerCase() && "g" == o.charAt(0).toLowerCase() && (n = e(2),
            r = !0)),
            o += n;
        return o
    }
    function a() {
        var t = location.href + document.title;
        if (t) {
            var e = i.param2obj(u.getExParams() || "") || {};
            t = s.hash(t, s.getHashKey(e.asid || ""))
        } else
            t = o(8);
        return t
    }
    function r() {
        return goldlog.pvid = a() + o(6),
        l() ? "" : goldlog.pvid
    }
    var i = n(30)
      , s = n(80)
      , u = n(20)
      , c = n(8)
      , l = function() {
        var t = "true" === c.disablePvid;
        try {
            var e = goldlog.getMetaInfo("aplus-disable-pvid") + "";
            "true" === e ? t = !0 : "false" === e && (t = !1)
        } catch (t) {}
        return t
    };
    e.isDisablePvid = l,
    e.makePVId = r,
    e.getPvId = function() {
        return l() ? "" : goldlog.pvid
    }
}
, function(t, e) {
    "use strict";
    var n = 1315423911;
    e.hash = function(t, e) {
        var o, a, r = e || n;
        for (o = t.length - 1; o >= 0; o--)
            a = t.charCodeAt(o),
            r ^= (r << 5) + a + (r >> 2);
        var i = (2147483647 & r).toString(16);
        return i
    }
    ,
    e.getHashKey = function(t) {
        try {
            var e = t || ""
              , o = []
              , a = "abcdefghijklmnopqrstuvwxyz"
              , r = e.length;
            if (r > 0)
                for (var i = r - 1; i >= 0; i--) {
                    var s = e[i].toLowerCase()
                      , u = a.indexOf(s);
                    if (("number" == typeof s || u > -1) && o.length < 10 && o.push(u > -1 ? u % 10 : s),
                    10 === o.length)
                        return parseInt(o.join(""))
                }
            return o.length > 0 ? parseInt(o.join("")) : n
        } catch (t) {
            return n
        }
    }
}
, function(t, e, n) {
    "use strict";
    var o = n(13)
      , a = n(24)
      , r = n(23)
      , i = n(77)
      , s = n(78)
      , u = n(8)
      , c = function() {};
    c.prototype.run = function(t, e, n) {
        var c = new s;
        c.init({
            middleware: [],
            config: t,
            plugins: u.plugins_pv
        });
        var l = c.run()
          , p = new u.context;
        p.userdata = e,
        p.logger = r.logger;
        var g = {
            context: p,
            pubsub: a.getGoldlogVal("aplus_pubsub"),
            pubsubType: "pv"
        }
          , f = new i;
        f.create(g),
        f.wrap(l, function() {
            n && n.fn_after_record && o.each(n.fn_after_pv, function(e) {
                e(window.goldlog, t)
            })
        })()
    }
    ,
    e.SendPV = c
}
, function(t, e, n) {
    "use strict";
    var o = n(13)
      , a = n(24)
      , r = n(23)
      , i = n(77)
      , s = n(78)
      , u = n(8)
      , c = function() {};
    c.prototype.run = function(t, e, n, c) {
        var l = new s;
        l.init({
            middleware: [],
            config: t,
            plugins: u.plugins_prepv
        });
        var p = l.run()
          , g = new u.context_prepv;
        g.userdata = e,
        g.logger = r.logger;
        var f = {
            context: g,
            pubsub: a.getGoldlogVal("aplus_pubsub"),
            pubsubType: "prepv"
        }
          , d = new i;
        d.create(f),
        d.wrap(p, function() {
            n && n.fn_after_record && o.each(n.fn_after_pv, function(e) {
                e(window.goldlog, t)
            }),
            a.setGoldlogVal("prepv_context", g),
            "function" == typeof c && c()
        })()
    }
    ,
    e.SendPrePV = c
}
, function(t, e, n) {
    "use strict";
    var o = n(35)
      , a = n(8);
    e.init = function() {
        var t = n(8)
          , e = goldlog._$
          , r = navigator.userAgent;
        r.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i) && (e.is_ali_app = !0),
        t.utilPvid.makePVId();
        var i = n(45);
        e.spm = i,
        e.is_WindVane = o.is_WindVane;
        var s = e.meta_info;
        e.page_url = location.href,
        e.page_referrer = n(47).getRefer(),
        i.init(goldlog, s, function() {
            t.initLoad.init_watchGoldlogQueue();
            var e = n(8).spmException
              , o = e.is_exception;
            o || n(84)
        }),
        goldlog.beforeSendPV(function(t, e) {
            if (e.is_auto && "1" === s["aplus-manual-pv"])
                return !1
        }),
        goldlog.afterSendPV(function() {
            window.g_SPM && (g_SPM._current_spm = "")
        }),
        a.is_auto_pv + "" == "true" && goldlog.sendPV({
            is_auto: !0
        }),
        t.initLoad.run(),
        t.beforeUnload.run()
    }
}
, function(t, e, n) {
    "use strict";
    !function() {
        var t, e = n(13), o = n(24), a = n(85), r = function() {
            t = !0;
            var n = window.g_SPM || {};
            e.isFunction(n.getParam) || e.isFunction(n.spm) || a.run()
        }, i = window.goldlog || (window.goldlog = {});
        i.aplus_pubsub && "function" == typeof i.aplus_pubsub.publish && i.aplus_pubsub.subscribe("goldlogReady", function(e) {
            "complete" !== e || t || r()
        });
        var s = 0
          , u = function() {
            if (!t) {
                var e = o.getGoldlogVal("_$") || {};
                "complete" === e.status ? r() : s < 50 && (++s,
                setTimeout(function() {
                    u()
                }, 200))
            }
        };
        u()
    }()
}
, function(t, e, n) {
    "use strict";
    var o = n(32)
      , a = n(31)
      , r = n(13)
      , i = n(20)
      , s = n(69)
      , u = n(24)
      , c = n(23)
      , l = n(21);
    e.run = function() {
        function t(t) {
            var e = wt(t, gt)
              , n = a.parseSemicolonContent(e) || {};
            return n
        }
        function e() {
            var t = X.spm.data;
            return [t.a, t.b].join(".")
        }
        function n(t, e) {
            var n, o, a, r, i, s, u, c, l, p = [];
            for (n = yt(t.getElementsByTagName("a")),
            o = yt(t.getElementsByTagName("area")),
            r = n.concat(o),
            u = 0,
            c = r.length; u < c; u++) {
                for (s = !1,
                i = a = r[u]; (i = i.parentNode) && i != t; )
                    if (wt(i, ct)) {
                        s = !0;
                        break
                    }
                s || (l = wt(a, ft),
                e || "t" == l ? e && "t" == l && p.push(a) : p.push(a))
            }
            return p
        }
        function p(o, a, s, u) {
            var c, l, p, g, f, d, m, h, _, v, b, w, j, P, S, A, E, C;
            if (a = a || o.getAttribute(ct) || "",
            a && (c = n(o, u),
            0 !== c.length)) {
                if (p = a.split("."),
                A = Tt(a, "110") && 3 == p.length,
                A && (E = p[2],
                p[2] = "w" + (E || "0"),
                a = p.join(".")),
                Pt(w = e()) && w.match(/^[\w\-\*]+(\.[\w\-\*\/]+)?$/))
                    if (r.isContain(a, ".")) {
                        if (!Tt(a, w)) {
                            for (g = w.split("."),
                            p = a.split("."),
                            P = 0,
                            j = g.length; P < j; P++)
                                p[P] = g[P];
                            a = p.join(".")
                        }
                    } else
                        r.isContain(w, ".") || (w += ".0"),
                        a = w + "." + a;
                if (a.match && a.match(/^[\w\-\*]+\.[\w\-\*\/]+\.[\w\-\*\/]+$/)) {
                    var U = u ? mt : dt;
                    for (C = parseInt(wt(o, U)) || 0,
                    S = 0,
                    f = C,
                    j = c.length; S < j; S++)
                        if (l = c[S],
                        d = i.tryToGetHref(l),
                        u || d)
                            if (A && l.setAttribute(_t, E),
                            m = l.getAttribute(vt),
                            m && k(m))
                                y(l, m, s);
                            else {
                                _ = T(l.parentNode),
                                _.a_spm_ab ? (b = _.a_spm_ab,
                                v = _.ab_idx) : (b = void 0,
                                f++,
                                v = f);
                                var V = t(l) || {}
                                  , I = V.locaid || "";
                                I ? h = I : (h = x(l) || v,
                                u && (h = "at" + ((r.isNumber(h) ? 1e3 : "") + h))),
                                m = b ? a + "-" + b + "." + h : a + "." + h,
                                y(l, m, s)
                            }
                    o.setAttribute(U, f)
                }
            }
        }
        function g(t) {
            for (var e = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"], n = 0; n < e.length; n++)
                if (t.indexOf(e[n]) != -1)
                    return !0;
            return !1
        }
        function f(t) {
            return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\b/i) : J
        }
        function d(t) {
            return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\/.*\?.*\bsign=.*/i) : J
        }
        function m(t) {
            for (var e; (t = t.parentNode) && t.tagName != at; )
                if (e = wt(t, lt))
                    return e;
            return ""
        }
        function h(t, e) {
            if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
            !e)
                return t;
            var n, o, a, i, s, u, c, l = "&";
            if (t.indexOf("#") != -1 && (a = t.split("#"),
            t = a.shift(),
            o = a.join("#")),
            i = t.split("?"),
            s = i.length - 1,
            a = i[0].split("//"),
            a = a[a.length - 1].split("/"),
            u = a.length > 1 ? a.pop() : "",
            s > 0 && (n = i.pop(),
            t = i.join("?")),
            n && s > 1 && n.indexOf("&") == -1 && n.indexOf("%") != -1 && (l = "%26"),
            t = t + "?spm=" + ht + e + (n ? l + n : "") + (o ? "#" + o : ""),
            c = r.isContain(u, ".") ? u.split(".").pop().toLowerCase() : "") {
                if ({
                    png: 1,
                    jpg: 1,
                    jpeg: 1,
                    gif: 1,
                    bmp: 1,
                    swf: 1
                }.hasOwnProperty(c))
                    return 0;
                !n && s <= 1 && (o || {
                    htm: 1,
                    html: 1,
                    php: 1,
                    aspx: 1
                }.hasOwnProperty(c) || (t += "&file=" + u))
            }
            return t
        }
        function _(t) {
            return t && Y.split("#")[0] == t.split("#")[0]
        }
        function v(t) {
            var e = i.tryToGetHref(t)
              , n = m(t)
              , o = wt(t, lt)
              , a = "i" === (o || n || ut);
            if (!e || g(e))
                return !0;
            var r = _(e) || l.isStartWithProtocol(e.toLowerCase()) || f(e) || d(e);
            return !(a || !Tt(e, "#") && !r) || a
        }
        function b(t, e) {
            if (v(t)) {
                var n = i.tryToGetHref(t);
                W == t && goldlog.record("/tbspm.1.1", "CLK", "href=" + n + "&spm=" + e)
            }
        }
        function y(t, n, o) {
            if (!/^0\.0\.?/.test(n)) {
                var a = i.tryToGetHref(t)
                  , r = e();
                t.setAttribute(vt, n),
                D = goldlog.getPvId(),
                D && (n += "." + D),
                (D || r && r != et) && (v(t) || o || (a = h(a, n)) && w(t, a))
            }
        }
        function w(t, e) {
            var n, o = t.innerHTML;
            o && o.indexOf("<") == -1 && (n = K.createElement("b"),
            n.style.display = "none",
            t.appendChild(n)),
            t.href = e,
            n && t.removeChild(n)
        }
        function x(t) {
            var e, n = X.spm.data;
            return "0" == n.a && "0" == n.b ? e = "0" : (e = wt(t, ct),
            e && e.match(/^d\w+$/) || (e = "")),
            e
        }
        function j(t) {
            for (var e, n, o = t; t && t.tagName != ot && t.tagName != at && t.getAttribute; ) {
                if (n = t.getAttribute(ct)) {
                    e = n,
                    o = t;
                    break
                }
                if (!(t = t.parentNode))
                    break
            }
            return e && !/^[\w\-\.\/]+$/.test(e) && (e = "0"),
            {
                spm_c: e,
                el: o
            }
        }
        function T(t) {
            for (var e, n = {}, o = ""; t && t.tagName != ot && t.tagName != at; ) {
                if (!o && (o = wt(t, bt))) {
                    e = parseInt(wt(t, "data-spm-ab-max-idx")) || 0,
                    n.a_spm_ab = o,
                    n.ab_idx = ++e,
                    t.setAttribute("data-spm-ab-max-idx", e);
                    break
                }
                if (wt(t, ct))
                    break;
                t = t.parentNode
            }
            return n
        }
        function P(t) {
            var e;
            return t && (e = t.match(/&?\bspm=([^&#]*)/)) ? e[1] : ""
        }
        function S(t, n) {
            var o = goldlog.getMetaInfo("aplus-getspmcd") || function() {}
              , a = e()
              , r = i.tryToGetHref(t)
              , s = P(r)
              , u = null
              , c = a && 2 == a.split(".").length;
            if (c) {
                var l = o(t, null, a);
                return u = l && "0" !== l.spm_c ? [a, l.spm_c, l.spm_d] : [a, 0, x(t) || 0],
                void y(t, u.join("."), n)
            }
            r && s && (r = r.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "").replace(/\?#/, "#"),
            w(t, r))
        }
        function k(t) {
            var n = e()
              , o = t.split(".");
            return o[0] + "." + o[1] == n
        }
        function A(t, e) {
            W = t,
            rt && I();
            var n, o, a = wt(t, vt);
            if (a && k(a))
                y(t, a, e);
            else {
                if (n = j(t.parentNode),
                o = n.spm_c,
                !o)
                    return void S(t, e);
                nt && (o = "0"),
                p(n.el, o, e),
                p(n.el, o, e, !0)
            }
        }
        function E(t) {
            if (t && 1 == t.nodeType) {
                jt(t, dt),
                jt(t, mt);
                var e, n = yt(t.getElementsByTagName("a")), o = yt(t.getElementsByTagName("area")), a = n.concat(o), r = a.length;
                for (e = 0; e < r; e++)
                    jt(a[e], vt)
            }
        }
        function C(n) {
            var o = e()
              , a = n.parentNode;
            if (!a)
                return "";
            var r = t() || {}
              , i = r.locaid || ""
              , s = n.getAttribute(ct) || i
              , u = j(a)
              , c = u.spm_c || 0;
            c && c.indexOf(".") != -1 && (c = c.split("."),
            c = c[c.length - 1]);
            var l = o + "." + c
              , p = tt[l] || 0;
            return p++,
            tt[l] = p,
            s = s || p,
            l + ".i" + s
        }
        function U(t) {
            var e, n = t.tagName;
            "A" != n && "AREA" != n ? e = C(t) : (A(t, H),
            e = wt(t, vt)),
            e = (e || "0.0.0.0").split(".");
            var o = {
                a: e[0],
                b: e[1],
                c: e[2],
                d: e[3]
            }
              , a = goldlog.getPvId();
            return a && (o.e = a),
            o
        }
        function V(t, e) {
            if (e || (e = K),
            K.evaluate)
                return e.evaluate(t, K, null, 9, null).singleNodeValue;
            for (var n, o = t.split("/"); !n && o.length > 0; )
                n = o.shift();
            var a, r = /^.+?\[@id="(.+?)"]$/i, i = /^(.+?)\[(\d+)]$/i;
            return (a = n.match(r)) ? e = e.getElementById(a[1]) : (a = n.match(i)) && (e = e.getElementsByTagName(a[1])[parseInt(a[2]) - 1]),
            e ? 0 === o.length ? e : V(o.join("/"), e) : null
        }
        function I() {
            var t, e, n, o = {};
            for (t in it)
                it.hasOwnProperty(t) && (e = V(t),
                e && (o[t] = 1,
                n = it[t],
                xt(e, ct, ("A" == e.tagName ? n.spmd : n.spmc) || "")));
            for (t in o)
                o.hasOwnProperty(t) && delete it[t]
        }
        function M() {
            if (!st && F.spmData) {
                st = H;
                var t, e, n, o, a = F.spmData.data;
                if (a && St(a)) {
                    for (t = 0,
                    e = a.length; t < e; t++)
                        n = a[t],
                        o = n.xpath,
                        o = o.replace(/^id\("(.+?)"\)(.*)/g, '//*[@id="$1"]$2'),
                        it[o] = {
                            spmc: n.spmc,
                            spmd: n.spmd
                        };
                    I()
                }
            }
        }
        function O() {
            var t, e, n, o, a = K.getElementsByTagName("iframe"), r = a.length;
            for (e = 0; e < r; e++)
                t = a[e],
                !t.src && (n = wt(t, pt)) && (o = U(t),
                o ? (o = [o.a, o.b, o.c, o.d, o.e].join("."),
                t.src = h(n, o)) : t.src = n)
        }
        function G() {
            function t() {
                e++,
                e > 10 && (n = 3e3),
                O(),
                setTimeout(t, n)
            }
            var e = 0
              , n = 500;
            t()
        }
        function N(t, e, n) {
            var i = a.parseSemicolonContent(e, {})
              , s = i.gostr || ""
              , u = i.locaid || ""
              , l = i.gmkey || ""
              , p = i.gokey || ""
              , g = U(t)
              , f = [g.a, g.b, g.c, u].join(".")
              , d = s + "." + f;
            0 !== d.indexOf("/") && (d = "/" + d);
            var m = []
              , h = ["gostr", "locaid", "gmkey", "gokey", "spm-cnt", "cna"];
            for (var _ in i)
                i.hasOwnProperty(_) && o.indexof(h, _) === -1 && m.push(_ + "=" + i[_]);
            m.push("_g_et=" + n),
            m.push("autosend=1"),
            p && m.length > 0 && (p += "&"),
            p += m.length > 0 ? m.join("&") : "",
            goldlog && r.isFunction(goldlog.recordUdata) ? goldlog.recordUdata(d, l, p, "GET", function() {}) : c.logger({
                msg: "goldlog.recordUdata is not function!"
            }),
            xt(t, vt, f)
        }
        function L(t, n) {
            var o = n;
            F.g_SPM && (g_SPM._current_spm = U(n));
            for (var a; n && n.tagName != ot; ) {
                a = wt(n, gt);
                {
                    if (a) {
                        N(n, a, "mousedown" === t.type ? t.button : "tap");
                        break
                    }
                    n = n.parentNode
                }
            }
            if (!a) {
                var r = e()
                  , i = goldlog.getMetaInfo("aplus-getspmcd") || function() {}
                ;
                i(o, t, r)
            }
        }
        function $(t, e) {
            for (var n, o = (new Date).getTime(); e && (n = e.tagName); ) {
                if ("A" == n || "AREA" == n) {
                    A(e, J);
                    var a = window.g_SPM || (window.g_SPM = {})
                      , r = a._current_spm = U(e)
                      , i = "";
                    try {
                        i = r.a + "." + r.b + "." + r.c + "." + r.d + "." + r.e,
                        b(e, i),
                        R(e, o, i)
                    } catch (t) {}
                    break
                }
                if (n == at || n == ot)
                    break;
                e = e.parentNode
            }
        }
        function R(t, e, n) {
            var o = t.getAttribute("href");
            r.isStartWith(o, "//") && (o = location.protocol + o);
            var a = {
                id: goldlog.pvid + "_" + e,
                timestamp: e,
                target_expression_type: "href",
                target_expression: o,
                spm_id: n,
                log_id: goldlog.pvid,
                current_url: location.href,
                current_referrer: goldlog._$.page_referrer,
                tracking_param: ""
            }
              , i = function(t) {
                t && "complete" === t.status && "function" == typeof t.setLsParams && t.setLsParams(a)
            };
            goldlog.aplus_pubsub.subscribeOnce("_aplus_cplugin_lsparams", i)
        }
        function B(t, e) {
            var n = U(t)
              , o = n.a + "." + n.b + "." + n.c + "." + n.d;
            return e && (o += "." + n.e),
            o
        }
        var D, W, F = window, K = document, q = location, H = !0, J = !1, X = u.getGoldlogVal("_$") || {}, Q = X.meta_info, Y = q.href, z = X.is_terminal || /WindVane/i.test(navigator.userAgent), Z = i.isTouch() || "1" === Q["aplus-touch"], tt = {}, et = "0.0", nt = !1, ot = "HTML", at = "BODY", rt = J, it = {}, st = J, ut = Q.spm_protocol, ct = "data-spm", lt = "data-spm-protocol", pt = "data-spm-src", gt = "data-spm-click", ft = "data-auto-spmd", dt = "data-spm-max-idx", mt = "data-auto-spmd-max-idx", ht = "", _t = "data-spm-wangpu-module-id", vt = "data-spm-anchor-id", bt = "data-spm-ab", yt = a.nodeListToArray, wt = i.tryToGetAttribute, xt = i.tryToSetAttribute, jt = i.tryToRemoveAttribute, Tt = r.isStartWith, Pt = r.isString, St = r.isArray;
        s.DOMReady(function() {
            M()
        }),
        z || G(),
        Z ? s.on(K, "tap", L) : s.on(K, "mousedown", L),
        Z ? s.on(K, "tap", $) : (s.on(K, "mousedown", $),
        s.on(K, "keydown", $)),
        F.g_SPM = {
            resetModule: E,
            anchorBeacon: A,
            getParam: U,
            spm: B
        }
    }
}
]);
/*! 2017-08-17 20:40:10 v0.1.2 */
!function(o) {
    function n(i) {
        if (t[i])
            return t[i].exports;
        var e = t[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return o[i].call(e.exports, e, e.exports, n),
        e.loaded = !0,
        e.exports
    }
    var t = {};
    return n.m = o,
    n.c = t,
    n.p = "",
    n(0)
}([function(o, n, t) {
    "use strict";
    !function() {
        var o = window.goldlog || (window.goldlog = {});
        if (!o._aplus_plugin_aol) {
            o._aplus_plugin_aol = {
                status: "complete"
            };
            var n = t(1)
              , i = window.goldlog_queue || (window.goldlog_queue = []);
            i.push({
                action: "goldlog.aplus_pubsub.subscribeOnce",
                arguments: ["goldlogReady", function(o) {
                    "complete" === o && n.run()
                }
                ]
            })
        }
    }()
}
, function(o, n, t) {
    "use strict";
    var i = t(2);
    n.run = function() {
        var o, n = function() {
            o || (o = "1",
            i.init())
        }, t = (location.hostname + location.pathname).match(/^www.taobao.com\/$/);
        "1" === goldlog.getMetaInfo("aplus-aol") || t ? n() : goldlog.aplus_pubsub.subscribe("setMetaInfo", function(o, i) {
            ("aplus-aol" === o && "1" === i || t) && n()
        })
    }
}
, function(o, n) {
    "use strict";
    var t, i = document, e = window, u = !1, l = function() {
        var o = goldlog.getMetaInfo("aplus-aol-ext") || "";
        return "function" == typeof o && (o = o()),
        o
    }, a = function(o) {
        var n = l() || ""
          , t = goldlog.spm_ab ? goldlog.spm_ab.join(".") : "";
        goldlog.send(o, {
            sk: t + (n ? "_" + n : ""),
            cna: goldlog.getCookie("cna"),
            t: (new Date).getTime()
        }, "POST")
    }, c = function() {
        a("//ol.mmstat.com/aol.r.i")
    }, g = function() {
        a("//ol.mmstat.com/aol.r.o")
    }, s = function() {
        t = setTimeout(function() {
            u && c(),
            s()
        }, 5e3)
    }, d = function() {
        clearTimeout(t),
        g(),
        c(),
        s()
    }, r = function() {
        var o = function() {
            u = !1,
            g()
        };
        goldlog.on(e, "beforeunload", function() {
            o()
        }),
        i.addEventListener && i.addEventListener("WV.Event.APP.Background", function(n) {
            o()
        }, !1),
        "hidden"in i && goldlog.on(e, "visibilitychange", function() {
            "hidden" === i.visibilityState && o()
        }),
        goldlog.on(e, "blur", function() {
            o()
        })
    }, f = function() {
        var o = e.goldlog_queue || (e.goldlog_queue = []);
        o.push({
            action: "goldlog.aplus_pubsub.subscribe",
            arguments: ["setPageSPM", function(o) {
                d()
            }
            ]
        })
    }, p = function() {
        var o = function() {
            u = !0,
            c()
        };
        i.addEventListener && i.addEventListener("WV.Event.APP.Active", function(n) {
            o()
        }, !1),
        "hidden"in i && goldlog.on(e, "visibilitychange", function() {
            "visible" === i.visibilityState && o()
        }),
        goldlog.on(e, "focus", function() {
            o()
        })
    };
    n.init = function() {
        c(),
        u = !0,
        s(),
        r(),
        f(),
        p()
    }
}
]);
/*! 2017-09-19 21:50:13 v7.6.10 */
!function(t) {
    function e(n) {
        if (r[n])
            return r[n].exports;
        var a = r[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return t[n].call(a.exports, a, a.exports, e),
        a.loaded = !0,
        a.exports
    }
    var r = {};
    return e.m = t,
    e.c = r,
    e.p = "",
    e(0)
}([function(t, e) {
    "use strict";
    !function() {
        function t(t, e, r) {
            t[w]((b ? "on" : "") + e, function(t) {
                t = t || f.event;
                var e = t.target || t.srcElement;
                r(t, e)
            }, !1)
        }
        function e() {
            return /&?\bspm=[^&#]*/.test(location.href) ? location.href.match(/&?\bspm=[^&#]*/gi)[0].split("=")[1] : ""
        }
        function r(t, e) {
            if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
            !e)
                return t;
            var r, n, a, i, o, c, p, f = "&";
            if (t.indexOf("#") != -1 && (a = t.split("#"),
            t = a.shift(),
            n = a.join("#")),
            i = t.split("?"),
            o = i.length - 1,
            a = i[0].split("//"),
            a = a[a.length - 1].split("/"),
            c = a.length > 1 ? a.pop() : "",
            o > 0 && (r = i.pop(),
            t = i.join("?")),
            r && o > 1 && r.indexOf("&") == -1 && r.indexOf("%") != -1 && (f = "%26"),
            t = t + "?spm=" + e + (r ? f + r : "") + (n ? "#" + n : ""),
            p = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
                if ({
                    png: 1,
                    jpg: 1,
                    jpeg: 1,
                    gif: 1,
                    bmp: 1,
                    swf: 1
                }.hasOwnProperty(p))
                    return 0;
                !r && o <= 1 && (n || {
                    htm: 1,
                    html: 1,
                    php: 1
                }.hasOwnProperty(p) || (t += "&file=" + c))
            }
            return t
        }
        function n(t) {
            function e(t) {
                return t = t.replace(/refpos[=(%3D)]\w*/gi, c).replace(i, "%3D" + n + "%26" + a.replace("=", "%3D")).replace(o, n),
                a.length > 0 && (t += "&" + a),
                t
            }
            var r = window.location.href
              , n = r.match(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i)
              , a = r.match(/[&\?](pvid=[^&]*)/i)
              , i = new RegExp("%3Dmm_\\d+_\\d+_\\d+","ig")
              , o = new RegExp("mm_\\d+_\\d+_\\d+","ig");
            a = a && a[1] ? a[1] : "";
            var c = r.match(/(refpos=(\d{0,24}_\d{0,24}_\d{0,24})?(,[a-z]+)?)(,[a-z]+)?/i);
            return c = c && c[0] ? c[0] : "",
            n ? (n = n[0],
            e(t)) : t
        }
        function a(e) {
            var r = f.KISSY;
            r ? r.ready(e) : f.jQuery ? jQuery(m).ready(e) : "complete" === m.readyState ? e() : t(f, "load", e)
        }
        function i(t, e) {
            return t && t.getAttribute ? t.getAttribute(e) || "" : ""
        }
        function o(t) {
            if (t) {
                var e, r = h.length;
                for (e = 0; e < r; e++)
                    if (t.indexOf(h[e]) > -1)
                        return !0;
                return !1
            }
        }
        function c(t, e) {
            if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")),
            !e)
                return t;
            var r, n, a, i, o, c, p, f = "&";
            if (t.indexOf("#") != -1 && (a = t.split("#"),
            t = a.shift(),
            n = a.join("#")),
            i = t.split("?"),
            o = i.length - 1,
            a = i[0].split("//"),
            a = a[a.length - 1].split("/"),
            c = a.length > 1 ? a.pop() : "",
            o > 0 && (r = i.pop(),
            t = i.join("?")),
            r && o > 1 && r.indexOf("&") == -1 && r.indexOf("%") != -1 && (f = "%26"),
            t = t + "?spm=" + e + (r ? f + r : "") + (n ? "#" + n : ""),
            p = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
                if ({
                    png: 1,
                    jpg: 1,
                    jpeg: 1,
                    gif: 1,
                    bmp: 1,
                    swf: 1
                }.hasOwnProperty(p))
                    return 0;
                !r && o <= 1 && (n || {
                    htm: 1,
                    html: 1,
                    php: 1
                }.hasOwnProperty(p) || (t += "&__file=" + c))
            }
            return t
        }
        function p(t) {
            if (o(t.href)) {
                var r = i(t, g);
                if (!r) {
                    if (!d)
                        return;
                    var n = d(t)
                      , a = [n.a, n.b, n.c, n.d, n.e].join(".");
                    u && (a = [n.a || "0", n.b || "0", n.c || "0", n.d || "0"].join("."),
                    a = (e() || "0.0.0.0.0") + "_" + a),
                    t.href = c(t.href, a),
                    t.setAttribute(g, a)
                }
            }
        }
        var f = window
          , m = document
          , s = f._alimm_spmact_on_;
        if ("undefined" == typeof s && (s = 1),
        1 == s && (s = 1),
        0 == s && (s = 0),
        s) {
            var l = function() {
                return {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0
                }
            }
              , d = f.g_SPM && f.g_SPM.getParam ? f.g_SPM.getParam : l
              , u = !0;
            try {
                u = self.location != top.location
            } catch (t) {}
            var g = "data-spm-act-id"
              , h = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"]
              , b = !!m.attachEvent
              , v = "attachEvent"
              , _ = "addEventListener"
              , w = b ? v : _;
            t(m, "mousedown", function(t, e) {
                for (var r, n = 0; e && (r = e.tagName) && n < 5; ) {
                    if ("A" == r || "AREA" == r) {
                        p(e);
                        break
                    }
                    if ("BODY" == r || "HTML" == r)
                        break;
                    e = e.parentNode,
                    n++
                }
            }),
            a(function() {
                for (var t, a, o = document.getElementsByTagName("iframe"), c = 0; c < o.length; c++) {
                    t = i(o[c], "mmsrc"),
                    a = i(o[c], "mmworked");
                    var p = d(o[c])
                      , f = [p.a || "0", p.b || "0", p.c || "0", p.d || "0", p.e || "0"].join(".");
                    t && !a ? (u && (f = [p.a || "0", p.b || "0", p.c || "0", p.d || "0"].join("."),
                    f = e() + "_" + f),
                    o[c].src = r(n(t), f),
                    o[c].setAttribute("mmworked", "mmworked")) : o[c].setAttribute(g, f)
                }
            })
        }
    }()
}
]);
