const countdown = (value, fn) => { 
  fn(value); 
  // console.log(value)
  return value > 0 ? countdown(value - 1, fn) : value; 
}; 
// countdown(10, value => console.log(value));


const countdown2 = (value, fn, delay = 1000) => { 
  fn(value); 
  return value > 0 
         ? setTimeout(() => countdown(value - 1, fn, delay), delay) 
         : value; 
}; 
const log = value => console.log(value); 
countdown2(10, log);
