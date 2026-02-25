const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg);

const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

// functions for transforming data without changing the original
// 用于在不改变原始数据的情况下转换数据的函数
// 序列化时钟时间
const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
});

// 24h 改 12h
const civilianHours = clockTime => ({
    ...clockTime,
    hours: clockTime.hours > 12 ? clockTime.hours - 12 :clockTime.hours
});

const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: clockTime.hours >= 12 ? "PM" : "AM"
});

// Takes a target function and returns a function that will send a time
// to the target:

const display = target => time => target(time);

// Takes a template string and uses it to return clock time formatted

// based upon the criteria from the string

const formatClock = format => time =>
    format
        .replace("hh", time.hours)
        .replace("mm", time.minutes)
        .replace("ss", time.seconds)
        .replace("tt", time.ampm);

// prepends a zero to the value stored under that objects key argument
const prependZero = key => clockTime => ({
    ...clockTime,
    [key]: clockTime[key] < 10 ? "0" + clockTime[key] :
        clockTime[key]
});

// take clock time as an argument and transforms it into civilian time
// by using both civilian hours.
const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

// take civilian clock time and make sure the hours, minutes, and seconds
// display double digits by prepending zeros where needed
const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

// Starts the clock by setting an interval that will invoke a callback every second.

const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

startTicking();