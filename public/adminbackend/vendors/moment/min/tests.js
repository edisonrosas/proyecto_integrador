
;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    function each(array, callback) {
        var i;
        for (i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }

    function objectKeys(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        } else {
            // IE8
            var res = [], i;
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    res.push(i);
                }
            }
            return res;
        }
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function defineCommonLocaleTests(locale, options) {
        test('lenient ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing ' + i + ' date check');
            }
        });

        test('lenient ordinal parsing of number', function (assert) {
            var i, testMoment;
            for (i = 1; i <= 31; ++i) {
                testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing of number ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing of number ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing of number ' + i + ' date check');
            }
        });

        test('strict ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do', true);
                assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
            }
        });

        test('meridiem invariant', function (assert) {
            var h, m, t1, t2;
            for (h = 0; h < 24; ++h) {
                for (m = 0; m < 60; m += 15) {
                    t1 = moment.utc([2000, 0, 1, h, m]);
                    t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                    assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                            'meridiem at ' + t1.format('HH:mm'));
                }
            }
        });

        test('date format correctness', function (assert) {
            var data, tokens;
            data = moment.localeData()._longDateFormat;
            tokens = objectKeys(data);
            each(tokens, function (srchToken) {
                // Check each format string to make sure it does not contain any
                // tokens that need to be expanded.
                each(tokens, function (baseToken) {
                    // strip escaped sequences
                    var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                    assert.equal(false, !!~format.indexOf(srchToken),
                            'contains ' + srchToken + ' in ' + baseToken);
                });
            });
        });

        test('month parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr') {
                // I can't fix it :(
                expect(0);
                return;
            }
            function tester(format) {
                var r;
                r = moment(m.format(format), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
            }

            for (i = 0; i < 12; ++i) {
                m = moment([2015, i, 15, 18]);
                tester('MMM');
                tester('MMM.');
                tester('MMMM');
                tester('MMMM.');
            }
        });

        test('weekday parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr' || locale === 'az') {
                // There is a lower-case letter (??), that converted to upper then
                // lower changes to i
                expect(0);
                return;
            }
            function tester(format) {
                var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format;
                r = moment(m.format(format), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
            }

            for (i = 0; i < 7; ++i) {
                m = moment.utc([2015, i, 15, 18]);
                tester('dd');
                tester('ddd');
                tester('dddd');
            }
        });
    }

    function setupDeprecationHandler(test, moment, scope) {
        test._expectedDeprecations = null;
        test._observedDeprecations = null;
        test._oldSupress = moment.suppressDeprecationWarnings;
        moment.suppressDeprecationWarnings = true;
        test.expectedDeprecations = function () {
            test._expectedDeprecations = arguments;
            test._observedDeprecations = [];
        };
        moment.deprecationHandler = function (name, msg) {
            var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
            if (deprecationId === -1) {
                throw new Error('Unexpected deprecation thrown name=' +
                        name + ' msg=' + msg);
            }
            test._observedDeprecations[deprecationId] = 1;
        };
    }

    function teardownDeprecationHandler(test, moment, scope) {
        moment.suppressDeprecationWarnings = test._oldSupress;

        if (test._expectedDeprecations != null) {
            var missedDeprecations = [];
            each(test._expectedDeprecations, function (deprecationPattern, id) {
                if (test._observedDeprecations[id] !== 1) {
                    missedDeprecations.push(deprecationPattern);
                }
            });
            if (missedDeprecations.length !== 0) {
                throw new Error('Expected deprecation warnings did not happen: ' +
                        missedDeprecations.join(' '));
            }
        }
    }

    function matchedDeprecation(name, msg, deprecations) {
        if (deprecations == null) {
            return -1;
        }
        for (var i = 0; i < deprecations.length; ++i) {
            if (name != null && name === deprecations[i]) {
                return i;
            }
            if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
                return i;
            }
        }
        return -1;
    }

    /*global QUnit:false*/

    var test = QUnit.test;

    var expect = QUnit.expect;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                teardownDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                teardownDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
        defineCommonLocaleTests(name, -1, -1);
    }

    localeModule('af');

    test('parse', function (assert) {
        var tests = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sondag, Februarie 14de 2010, 3:25:50 nm'],
                ['ddd, hA',                            'Son, 3NM'],
                ['M Mo MM MMMM MMM',                   '2 2de 02 Februarie Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14de 14'],
                ['d do dddd ddd dd',                   '0 0de Sondag Son So'],
                ['DDD DDDo DDDD',                      '45 45ste 045'],
                ['w wo ww',                            '6 6de 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'nm NM'],
                ['[the] DDDo [day of the year]',       'the 45ste day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Februarie 2010'],
                ['LLL',                                '14 Februarie 2010 15:25'],
                ['LLLL',                               'Sondag, 14 Februarie 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 15:25'],
                ['llll',                               'Son, 14 Feb 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
    });

    test('format month', function (assert) {
        var expected = 'Januarie Jan_Februarie Feb_Maart Mar_April Apr_Mei Mei_Junie Jun_Julie Jul_Augustus Aug_September Sep_Oktober Okt_November Nov_Desember Des'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = 'Sondag Son So_Maandag Maa Ma_Dinsdag Din Di_Woensdag Woe Wo_Donderdag Don Do_Vrydag Vry Vr_Saterdag Sat Sa'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '\'n paar sekondes', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '\'n minuut',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '\'n minuut',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minute',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minute',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '\'n uur',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '\'n uur',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ure',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ure',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ure',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '\'n dag',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '\'n dag',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 dae',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '\'n dag',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 dae',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 dae',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '\'n maand',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '\'n maand',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '\'n maand',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 maande',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 maande',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 maande',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '\'n maand',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 maande',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '\'n jaar',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 jaar',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '\'n jaar',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 jaar',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), 'oor \'n paar sekondes',  'prefix');
        assert.equal(moment(0).from(30000), '\'n paar sekondes gelede', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '\'n paar sekondes gelede',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), 'oor \'n paar sekondes', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), 'oor 5 dae', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(12).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                   'Vandag om 12:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      'Vandag om 12:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       'Vandag om 13:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       'M??re om 12:00',       'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  'Vandag om 11:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  'Gister om 12:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [om] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('[Laas] dddd [om] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52ste', 'Jan  1 2012 should be week 52');
        assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1ste', 'Jan  2 2012 should be week 1');
        assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1ste', 'Jan  8 2012 should be week 1');
        assert.equal(moment([2012, 0,  9]).format('w ww wo'),    '2 02 2de', 'Jan  9 2012 should be week 2');
        assert.equal(moment([2012, 0, 15]).format('w ww wo'),    '2 02 2de', 'Jan 15 2012 should be week 2');
    });

}));

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    function each(array, callback) {
        var i;
        for (i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }

    function objectKeys(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        } else {
            // IE8
            var res = [], i;
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    res.push(i);
                }
            }
            return res;
        }
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function defineCommonLocaleTests(locale, options) {
        test('lenient ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing ' + i + ' date check');
            }
        });

        test('lenient ordinal parsing of number', function (assert) {
            var i, testMoment;
            for (i = 1; i <= 31; ++i) {
                testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing of number ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing of number ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing of number ' + i + ' date check');
            }
        });

        test('strict ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do', true);
                assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
            }
        });

        test('meridiem invariant', function (assert) {
            var h, m, t1, t2;
            for (h = 0; h < 24; ++h) {
                for (m = 0; m < 60; m += 15) {
                    t1 = moment.utc([2000, 0, 1, h, m]);
                    t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                    assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                            'meridiem at ' + t1.format('HH:mm'));
                }
            }
        });

        test('date format correctness', function (assert) {
            var data, tokens;
            data = moment.localeData()._longDateFormat;
            tokens = objectKeys(data);
            each(tokens, function (srchToken) {
                // Check each format string to make sure it does not contain any
                // tokens that need to be expanded.
                each(tokens, function (baseToken) {
                    // strip escaped sequences
                    var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                    assert.equal(false, !!~format.indexOf(srchToken),
                            'contains ' + srchToken + ' in ' + baseToken);
                });
            });
        });

        test('month parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr') {
                // I can't fix it :(
                expect(0);
                return;
            }
            function tester(format) {
                var r;
                r = moment(m.format(format), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
            }

            for (i = 0; i < 12; ++i) {
                m = moment([2015, i, 15, 18]);
                tester('MMM');
                tester('MMM.');
                tester('MMMM');
                tester('MMMM.');
            }
        });

        test('weekday parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr' || locale === 'az') {
                // There is a lower-case letter (??), that converted to upper then
                // lower changes to i
                expect(0);
                return;
            }
            function tester(format) {
                var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format;
                r = moment(m.format(format), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
            }

            for (i = 0; i < 7; ++i) {
                m = moment.utc([2015, i, 15, 18]);
                tester('dd');
                tester('ddd');
                tester('dddd');
            }
        });
    }

    function setupDeprecationHandler(test, moment, scope) {
        test._expectedDeprecations = null;
        test._observedDeprecations = null;
        test._oldSupress = moment.suppressDeprecationWarnings;
        moment.suppressDeprecationWarnings = true;
        test.expectedDeprecations = function () {
            test._expectedDeprecations = arguments;
            test._observedDeprecations = [];
        };
        moment.deprecationHandler = function (name, msg) {
            var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
            if (deprecationId === -1) {
                throw new Error('Unexpected deprecation thrown name=' +
                        name + ' msg=' + msg);
            }
            test._observedDeprecations[deprecationId] = 1;
        };
    }

    function teardownDeprecationHandler(test, moment, scope) {
        moment.suppressDeprecationWarnings = test._oldSupress;

        if (test._expectedDeprecations != null) {
            var missedDeprecations = [];
            each(test._expectedDeprecations, function (deprecationPattern, id) {
                if (test._observedDeprecations[id] !== 1) {
                    missedDeprecations.push(deprecationPattern);
                }
            });
            if (missedDeprecations.length !== 0) {
                throw new Error('Expected deprecation warnings did not happen: ' +
                        missedDeprecations.join(' '));
            }
        }
    }

    function matchedDeprecation(name, msg, deprecations) {
        if (deprecations == null) {
            return -1;
        }
        for (var i = 0; i < deprecations.length; ++i) {
            if (name != null && name === deprecations[i]) {
                return i;
            }
            if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
                return i;
            }
        }
        return -1;
    }

    /*global QUnit:false*/

    var test = QUnit.test;

    var expect = QUnit.expect;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                teardownDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                teardownDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
        defineCommonLocaleTests(name, -1, -1);
    }

    localeModule('ar-ma');

    test('parse', function (assert) {
        var tests = '??????????:??????????_????????????:????????????_????????:????????_??????????:??????????_??????:??????_??????????:??????????_????????????:????????????_??????:??????_??????????:??????????_????????????:????????????_??????????:??????????_??????????:??????????'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '??????????, ???????????? 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            '??????, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 ???????????? ????????????'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 ?????????? ?????? ??'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['LT',                                 '15:25'],
                ['LTS',                                '15:25:50'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 ???????????? 2010'],
                ['LLL',                                '14 ???????????? 2010 15:25'],
                ['LLLL',                               '?????????? 14 ???????????? 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 ???????????? 2010'],
                ['lll',                                '14 ???????????? 2010 15:25'],
                ['llll',                               '?????? 14 ???????????? 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
    });

    test('format month', function (assert) {
        var expected = '?????????? ??????????_???????????? ????????????_???????? ????????_?????????? ??????????_?????? ??????_?????????? ??????????_???????????? ????????????_?????? ??????_?????????? ??????????_???????????? ????????????_?????????? ??????????_?????????? ??????????'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
    });

    test('format week', function (assert) {
        var expected = '?????????? ?????? ??_?????????????? ?????????? ??_???????????????? ???????????? ??_???????????????? ???????????? ??_???????????? ???????? ??_???????????? ???????? ??_?????????? ?????? ??'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
    });

    test('from', function (assert) {
        var start = moment([2007, 1, 28]);
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  '????????', '44 seconds = a few seconds');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '??????????',      '45 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '??????????',      '89 seconds = a minute');
        assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 ??????????',     '90 seconds = 2 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 ??????????',    '44 minutes = 44 minutes');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '????????',       '45 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '????????',       '89 minutes = an hour');
        assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ??????????',       '90 minutes = 2 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ??????????',       '5 hours = 5 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ??????????',      '21 hours = 21 hours');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '??????',         '22 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '??????',         '35 hours = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 ????????',        '36 hours = 2 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '??????',         '1 day = a day');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 ????????',        '5 days = 5 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 ????????',       '25 days = 25 days');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '??????',       '26 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '??????',       '30 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '??????',       '43 days = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 ????????',      '46 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 ????????',      '75 days = 2 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 ????????',      '76 days = 3 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '??????',       '1 month = a month');
        assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 ????????',      '5 months = 5 months');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '??????',        '345 days = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ??????????',       '548 days = 2 years');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '??????',        '1 year = a year');
        assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ??????????',       '5 years = 5 years');
    });

    test('suffix', function (assert) {
        assert.equal(moment(30000).from(0), '???? ????????',  'prefix');
        assert.equal(moment(0).from(30000), '?????? ????????', 'suffix');
    });

    test('now from now', function (assert) {
        assert.equal(moment().fromNow(), '?????? ????????',  'now from now should display as in the past');
    });

    test('fromNow', function (assert) {
        assert.equal(moment().add({s: 30}).fromNow(), '???? ????????', 'in a few seconds');
        assert.equal(moment().add({d: 5}).fromNow(), '???? 5 ????????', 'in 5 days');
    });

    test('calendar day', function (assert) {
        var a = moment().hours(12).minutes(0).seconds(0);

        assert.equal(moment(a).calendar(),                   '?????????? ?????? ???????????? 12:00',     'today at the same time');
        assert.equal(moment(a).add({m: 25}).calendar(),      '?????????? ?????? ???????????? 12:25',     'Now plus 25 min');
        assert.equal(moment(a).add({h: 1}).calendar(),       '?????????? ?????? ???????????? 13:00',     'Now plus 1 hour');
        assert.equal(moment(a).add({d: 1}).calendar(),       '?????? ?????? ???????????? 12:00',      'tomorrow at the same time');
        assert.equal(moment(a).subtract({h: 1}).calendar(),  '?????????? ?????? ???????????? 11:00',     'Now minus 1 hour');
        assert.equal(moment(a).subtract({d: 1}).calendar(),  '?????? ?????? ???????????? 12:00',     'yesterday at the same time');
    });

    test('calendar next week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today + ' + i + ' days end of day');
        }
    });

    test('calendar last week', function (assert) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            assert.equal(m.calendar(),       m.format('dddd [?????? ????????????] LT'),  'Today - ' + i + ' days end of day');
        }
    });

    test('calendar all else', function (assert) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
    });

    test('weeks year starting sunday formatted', function (assert) {
        assert.equal(moment([2011, 11, 31]).format('w ww wo'), '1 01 1', 'Dec 31 2011 should be week 1');
        assert.equal(moment([2012,  0,  6]).format('w ww wo'), '1 01 1', 'Jan  6 2012 should be week 1');
        assert.equal(moment([2012,  0,  7]).format('w ww wo'), '2 02 2', 'Jan  7 2012 should be week 2');
        assert.equal(moment([2012,  0, 13]).format('w ww wo'), '2 02 2', 'Jan 13 2012 should be week 2');
        assert.equal(moment([2012,  0, 14]).format('w ww wo'), '3 03 3', 'Jan 14 2012 should be week 3');
    });

}));

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../../moment')) :
   typeof define === 'function' && define.amd ? define(['../../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';

    function each(array, callback) {
        var i;
        for (i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }

    function objectKeys(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        } else {
            // IE8
            var res = [], i;
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    res.push(i);
                }
            }
            return res;
        }
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function defineCommonLocaleTests(locale, options) {
        test('lenient ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing ' + i + ' date check');
            }
        });

        test('lenient ordinal parsing of number', function (assert) {
            var i, testMoment;
            for (i = 1; i <= 31; ++i) {
                testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
                assert.equal(testMoment.year(), 2014,
                        'lenient ordinal parsing of number ' + i + ' year check');
                assert.equal(testMoment.month(), 0,
                        'lenient ordinal parsing of number ' + i + ' month check');
                assert.equal(testMoment.date(), i,
                        'lenient ordinal parsing of number ' + i + ' date check');
            }
        });

        test('strict ordinal parsing', function (assert) {
            var i, ordinalStr, testMoment;
            for (i = 1; i <= 31; ++i) {
                ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
                testMoment = moment(ordinalStr, 'YYYY MM Do', true);
                assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
            }
        });

        test('meridiem invariant', function (assert) {
            var h, m, t1, t2;
            for (h = 0; h < 24; ++h) {
                for (m = 0; m < 60; m += 15) {
                    t1 = moment.utc([2000, 0, 1, h, m]);
                    t2 = moment.utc(t1.format('A h:mm'), 'A h:mm');
                    assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                            'meridiem at ' + t1.format('HH:mm'));
                }
            }
        });

        test('date format correctness', function (assert) {
            var data, tokens;
            data = moment.localeData()._longDateFormat;
            tokens = objectKeys(data);
            each(tokens, function (srchToken) {
                // Check each format string to make sure it does not contain any
                // tokens that need to be expanded.
                each(tokens, function (baseToken) {
                    // strip escaped sequences
                    var format = data[baseToken].replace(/(\[[^\]]*\])/g, '');
                    assert.equal(false, !!~format.indexOf(srchToken),
                            'contains ' + srchToken + ' in ' + baseToken);
                });
            });
        });

        test('month parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr') {
                // I can't fix it :(
                expect(0);
                return;
            }
            function tester(format) {
                var r;
                r = moment(m.format(format), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.month(), m.month(), 'month ' + i + ' fmt ' + format + ' lower strict');
            }

            for (i = 0; i < 12; ++i) {
                m = moment([2015, i, 15, 18]);
                tester('MMM');
                tester('MMM.');
                tester('MMMM');
                tester('MMMM.');
            }
        });

        test('weekday parsing correctness', function (assert) {
            var i, m;

            if (locale === 'tr' || locale === 'az') {
                // There is a lower-case letter (??), that converted to upper then
                // lower changes to i
                expect(0);
                return;
            }
            function tester(format) {
                var r, baseMsg = 'weekday ' + m.weekday() + ' fmt ' + format;
                r = moment(m.format(format), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg);
                r = moment(m.format(format).toLocaleUpperCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper');
                r = moment(m.format(format).toLocaleLowerCase(), format);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower');

                r = moment(m.format(format), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' strict');
                r = moment(m.format(format).toLocaleUpperCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' upper strict');
                r = moment(m.format(format).toLocaleLowerCase(), format, true);
                assert.equal(r.weekday(), m.weekday(), baseMsg + ' lower strict');
            }

            for (i = 0; i < 7; ++i) {
                m = moment.utc([2015, i, 15, 18]);
                tester('dd');
                tester('ddd');
                tester('dddd');
            }
        });
    }

    function setupDeprecationHandler(test, moment, scope) {
        test._expectedDeprecations = null;
        test._observedDeprecations = null;
        test._oldSupress = moment.suppressDeprecationWarnings;
        moment.suppressDeprecationWarnings = true;
        test.expectedDeprecations = function () {
            test._expectedDeprecations = arguments;
            test._observedDeprecations = [];
        };
        moment.deprecationHandler = function (name, msg) {
            var deprecationId = matchedDeprecation(name, msg, test._expectedDeprecations);
            if (deprecationId === -1) {
                throw new Error('Unexpected deprecation thrown name=' +
                        name + ' msg=' + msg);
            }
            test._observedDeprecations[deprecationId] = 1;
        };
    }

    function teardownDeprecationHandler(test, moment, scope) {
        moment.suppressDeprecationWarnings = test._oldSupress;

        if (test._expectedDeprecations != null) {
            var missedDeprecations = [];
            each(test._expectedDeprecations, function (deprecationPattern, id) {
                if (test._observedDeprecations[id] !== 1) {
                    missedDeprecations.push(deprecationPattern);
                }
            });
            if (missedDeprecations.length !== 0) {
                throw new Error('Expected deprecation warnings did not happen: ' +
                        missedDeprecations.join(' '));
            }
        }
    }

    function matchedDeprecation(name, msg, deprecations) {
        if (deprecations == null) {
            return -1;
        }
        for (var i = 0; i < deprecations.length; ++i) {
            if (name != null && name === deprecations[i]) {
                return i;
            }
            if (msg != null && msg.substring(0, deprecations[i].length) === deprecations[i]) {
                return i;
            }
        }
        return -1;
    }

    /*global QUnit:false*/

    var test = QUnit.test;

    var expect = QUnit.expect;

    function module (name, lifecycle) {
        QUnit.module(name, {
            setup : function () {
                moment.locale('en');
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                teardownDeprecationHandler(test, moment, 'core');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
    }

    function localeModule (name, lifecycle) {
        QUnit.module('locale:' + name, {
            setup : function () {
                moment.locale(name);
                moment.createFromInputFallback = function (config) {
                    throw new Error('input not handled by moment: ' + config._i);
                };
                setupDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.setup) {
                    lifecycle.setup();
                }
            },
            teardown : function () {
                moment.locale('en');
                teardownDeprecationHandler(test, moment, 'locale');
                if (lifecycle && lifecycle.teardown) {
                    lifecycle.teardown();
                }
            }
        });
        defineCommonLocaleTests(name, -1, -1);
    }

    localeModule('ar-sa');

    test('parse', function (assert) {
        var tests = '??????????:??????????_????????????:????????????_????????:????????_??????????:??????????_????????:????????_??????????:??????????_??????????:??????????_??????????:??????????_????????????:????????????_????????????:????????????_????????????:????????????_????????????:????????????'.split('_'), i;
        function equalTest(input, mmm, i) {
            assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', function (assert) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      '???????????? ???????????? ???? ?????????? ??:????:???? ??'],
                ['ddd, hA',                            '???????? ????'],
                ['M Mo MM MMMM MMM',                   '?? ?? ???? ???????????? ????????????'],
                ['YYYY YY',                            '???????? ????'],
                ['D Do DD',                            '???? ???? ????'],
                ['d do dddd ddd dd',                   '?? ?? ?????????? ?????? ??'],
                ['DDD DDDo DDDD',                      '???? ???? ??????'],
                ['w wo ww',                            '?? ?? ????'],
                ['h hh',                               '?? ????'],
                ['H HH',                               '???? ????'],
                ['m mm',                               '???? ????'],
                ['s ss',                               '???? ????'],
                ['a A',                                '?? ??'],
                ['[the] DDDo [day of the year]',       'the ???? day of the year'],
                ['LT',                                 '????:????'],
                ['LTS',                                '????:????:????'],
                ['L',                                  '????/????/????????'],
                ['LL',                                 '???? ???????????? ????????'],
                ['LLL',                                '???? ???????????? ???????? ????:????'],
                ['LLLL',                               '?????????? ???? ???????????? ???????? ????:????'],
                ['l',                                  '????/??/????????'],
                ['ll',                                 '???? ???????????? ????????'],
                ['lll',                                '???? ???????????? ???????? ????:????'],
                ['llll',                               '?????? ???? ???????????? ???????? ????:????']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
    });

    test('format ordinal', function (assert) {
        assert.equal(moment([2011, 0, 1]).format('DDDo'), '??', '1');
        assert.equal(moment([2011, 0, 2]).format('DDDo'), '??', '2');
        assert.equal(moment([2011, 0, 3]).format('DDDo'), '??', '3');
        assert.equal(moment([2011, 0, 4]).format('DDDo'), '??', '4');
        assert.equal(moment([2011, 0, 5]).format('DDDo'), '??', '5');
        assert.equal(moment([2011, 0, 6]).format('DDDo'), '??', '6');
        assert.equal(moment([2011, 0, 7]).format('DDDo'), '??', '7');
        assert.equal(moment([2011, 0, 8]).format('DDDo'), '??', '8');
        assert.equal(moment([2011, 0, 9]).format('DDDo'), '??', '9');
        assert.equal(moment([2011, 0, 10]).format('DDDo'), '????', '10');

        assert.equal(moment([2011, 0, 11]).format('DDDo'), '????', '11');
        assert.equal(moment([2011, 0, 12]).format('DDDo'), '????', '12');
        assert.equal(moment([2011, 0, 13]).format('DDDo'), '????', '13');
        assert.equal(moment([2011, 0, 14]).format('DDDo'), '????', '14');
        assert.equal(moment([2011, 0, 15]).format('DDDo'), '????', '15');
        assert.equal(moment([2011, 0, 16]).format('DDDo'), '????', '16');
        assert.equal(moment([2011, 0, 17]).format('DDDo'), '????', '17');
        assert.equal(moment([2011, 0, 18]).format('DDDo'), '????', '18');
        assert.equal(moment([2011, 0, 19]).format('DDDo'), '????', '19');
        assert.equal(moment([2011, 0, 20]).format('DDDo'), '????', '20');

        assert.equal(moment([2011, 0, 21]).format('DDDo'), '????', '21');
        assert.equal(moment([2011, 0, 22]).format('DDDo'), '????', '22');
        assert.equal(moment([2011, 0, 23]).format('DDDo'), '????', '23');
        assert.equal(moment([2011, 0, 24]).format('DDDo'), '????', '24');
        assert.equal(moment([2011, 0, 25]).format('DDDo'), '????', '25');
        assert.equal(moment([2011, 0, 26]).format('DDDo'), '????', '26');
        assert.equal(moment([2011, 0, 27]).format('DDDo'), '????', '27');
        assert.equal(moment([2011, 0, 28]).format('DDDo'), '????', '28');
        assert.equal(moment([2011, 0, 29]).format('DDDo'), '????', '29');
        assert.equal(moment([2011, 0, 30]).format('DDDo'), '????', '30');

        assert.equal(moment([2011, 0, 31]).format('DDDo'), '????', '31');
    });

    test('format month', function (assert) {
        var expected = '?????????? ??????????_???????????? ????????????_???????? ????????_?????????? ??????????_???????? ????????_?????????? ??????????_?????????? ??????????_?????????? ??????????_???????????? ????????