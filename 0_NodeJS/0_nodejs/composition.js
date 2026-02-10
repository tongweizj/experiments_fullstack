const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg);
// convert a date to a formatted time with AM/PM
const civilianHours = date =>
  date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

const appendAMPM = time => (time >= 12 ? `${time} PM` : `${time} AM`);

// compose both functions
const both = compose(civilianHours, appendAMPM);

// test it
console.log(both(new Date())); // Outputs a formatted time with AM/PM