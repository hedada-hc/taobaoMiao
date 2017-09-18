function ceshi(e) {
        function t(e, t) {
            return e << t | e >>> 32 - t
        }
        function n(e, t) {
            var n, o, r, i, s;
            return r = 2147483648 & e,
            i = 2147483648 & t,
            n = 1073741824 & e,
            o = 1073741824 & t,
            s = (1073741823 & e) + (1073741823 & t),
            n & o ? 2147483648 ^ s ^ r ^ i : n | o ? 1073741824 & s ? 3221225472 ^ s ^ r ^ i : 1073741824 ^ s ^ r ^ i : s ^ r ^ i
        }
        function o(e, t, n) {
            return e & t | ~e & n
        }
        function r(e, t, n) {
            return e & n | t & ~n
        }
        function i(e, t, n) {
            return e ^ t ^ n
        }
        function s(e, t, n) {
            return t ^ (e | ~n)
        }
        function a(e, r, i, s, a, p, u) {
            return e = n(e, n(n(o(r, i, s), a), u)),
            n(t(e, p), r)
        }
        function p(e, o, i, s, a, p, u) {
            return e = n(e, n(n(r(o, i, s), a), u)),
            n(t(e, p), o)
        }
        function u(e, o, r, s, a, p, u) {
            return e = n(e, n(n(i(o, r, s), a), u)),
            n(t(e, p), o)
        }
        function c(e, o, r, i, a, p, u) {
            return e = n(e, n(n(s(o, r, i), a), u)),
            n(t(e, p), o)
        }
        function d(e) {
            for (var t, n = e.length, o = n + 8, r = (o - o % 64) / 64, i = 16 * (r + 1), s = new Array(i - 1), a = 0, p = 0; n > p; )
                t = (p - p % 4) / 4,
                a = p % 4 * 8,
                s[t] = s[t] | e.charCodeAt(p) << a,
                p++;
            return t = (p - p % 4) / 4,
            a = p % 4 * 8,
            s[t] = s[t] | 128 << a,
            s[i - 2] = n << 3,
            s[i - 1] = n >>> 29,
            s
        }
        function l(e) {
            var t, n, o = "", r = "";
            for (n = 0; 3 >= n; n++)
                t = e >>> 8 * n & 255,
                r = "0" + t.toString(16),
                o += r.substr(r.length - 2, 2);
            return o
        }
        function f(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var o = e.charCodeAt(n);
                128 > o ? t += String.fromCharCode(o) : o > 127 && 2048 > o ? (t += String.fromCharCode(o >> 6 | 192),
                t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224),
                t += String.fromCharCode(o >> 6 & 63 | 128),
                t += String.fromCharCode(63 & o | 128))
            }
            console.log(t)
            return t
        }
        var m, h, _, v, g, R, E, y, w, O = [], S = 7, T = 12, q = 17, C = 22, A = 5, N = 9, b = 14, x = 20, k = 4, J = 11, L = 16, P = 23, I = 6, U = 10, H = 15, j = 21;
        for (e = f(e),
        O = d(e),
        R = 1732584193,
        E = 4023233417,
        y = 2562383102,
        w = 271733878,
        m = 0; m < O.length; m += 16)
            h = R,
            _ = E,
            v = y,
            g = w,
            R = a(R, E, y, w, O[m + 0], S, 3614090360),
            w = a(w, R, E, y, O[m + 1], T, 3905402710),
            y = a(y, w, R, E, O[m + 2], q, 606105819),
            E = a(E, y, w, R, O[m + 3], C, 3250441966),
            R = a(R, E, y, w, O[m + 4], S, 4118548399),
            w = a(w, R, E, y, O[m + 5], T, 1200080426),
            y = a(y, w, R, E, O[m + 6], q, 2821735955),
            E = a(E, y, w, R, O[m + 7], C, 4249261313),
            R = a(R, E, y, w, O[m + 8], S, 1770035416),
            w = a(w, R, E, y, O[m + 9], T, 2336552879),
            y = a(y, w, R, E, O[m + 10], q, 4294925233),
            E = a(E, y, w, R, O[m + 11], C, 2304563134),
            R = a(R, E, y, w, O[m + 12], S, 1804603682),
            w = a(w, R, E, y, O[m + 13], T, 4254626195),
            y = a(y, w, R, E, O[m + 14], q, 2792965006),
            E = a(E, y, w, R, O[m + 15], C, 1236535329),
            R = p(R, E, y, w, O[m + 1], A, 4129170786),
            w = p(w, R, E, y, O[m + 6], N, 3225465664),
            y = p(y, w, R, E, O[m + 11], b, 643717713),
            E = p(E, y, w, R, O[m + 0], x, 3921069994),
            R = p(R, E, y, w, O[m + 5], A, 3593408605),
            w = p(w, R, E, y, O[m + 10], N, 38016083),
            y = p(y, w, R, E, O[m + 15], b, 3634488961),
            E = p(E, y, w, R, O[m + 4], x, 3889429448),
            R = p(R, E, y, w, O[m + 9], A, 568446438),
            w = p(w, R, E, y, O[m + 14], N, 3275163606),
            y = p(y, w, R, E, O[m + 3], b, 4107603335),
            E = p(E, y, w, R, O[m + 8], x, 1163531501),
            R = p(R, E, y, w, O[m + 13], A, 2850285829),
            w = p(w, R, E, y, O[m + 2], N, 4243563512),
            y = p(y, w, R, E, O[m + 7], b, 1735328473),
            E = p(E, y, w, R, O[m + 12], x, 2368359562),
            R = u(R, E, y, w, O[m + 5], k, 4294588738),
            w = u(w, R, E, y, O[m + 8], J, 2272392833),
            y = u(y, w, R, E, O[m + 11], L, 1839030562),
            E = u(E, y, w, R, O[m + 14], P, 4259657740),
            R = u(R, E, y, w, O[m + 1], k, 2763975236),
            w = u(w, R, E, y, O[m + 4], J, 1272893353),
            y = u(y, w, R, E, O[m + 7], L, 4139469664),
            E = u(E, y, w, R, O[m + 10], P, 3200236656),
            R = u(R, E, y, w, O[m + 13], k, 681279174),
            w = u(w, R, E, y, O[m + 0], J, 3936430074),
            y = u(y, w, R, E, O[m + 3], L, 3572445317),
            E = u(E, y, w, R, O[m + 6], P, 76029189),
            R = u(R, E, y, w, O[m + 9], k, 3654602809),
            w = u(w, R, E, y, O[m + 12], J, 3873151461),
            y = u(y, w, R, E, O[m + 15], L, 530742520),
            E = u(E, y, w, R, O[m + 2], P, 3299628645),
            R = c(R, E, y, w, O[m + 0], I, 4096336452),
            w = c(w, R, E, y, O[m + 7], U, 1126891415),
            y = c(y, w, R, E, O[m + 14], H, 2878612391),
            E = c(E, y, w, R, O[m + 5], j, 4237533241),
            R = c(R, E, y, w, O[m + 12], I, 1700485571),
            w = c(w, R, E, y, O[m + 3], U, 2399980690),
            y = c(y, w, R, E, O[m + 10], H, 4293915773),
            E = c(E, y, w, R, O[m + 1], j, 2240044497),
            R = c(R, E, y, w, O[m + 8], I, 1873313359),
            w = c(w, R, E, y, O[m + 15], U, 4264355552),
            y = c(y, w, R, E, O[m + 6], H, 2734768916),
            E = c(E, y, w, R, O[m + 13], j, 1309151649),
            R = c(R, E, y, w, O[m + 4], I, 4149444226),
            w = c(w, R, E, y, O[m + 11], U, 3174756917),
            y = c(y, w, R, E, O[m + 2], H, 718787259),
            E = c(E, y, w, R, O[m + 9], j, 3951481745),
            R = n(R, h),
            E = n(E, _),
            y = n(y, v),
            w = n(w, g);
        var D = l(R) + l(E) + l(y) + l(w);
        return D.toLowerCase()
    }