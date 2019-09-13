var _; //globals

/* This section uses a functional extension known as Underscore.js - http://documentcloud.github.com/underscore/
     "Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support
      that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects.
      It's the tie to go along with jQuery's tux."
 */
describe("About Higher Order Functions", function () {

  it("should use filter to return array items that meet a criteria", function () {
    var numbers = [1,2,3];
    var odd = _(numbers).filter(function (x) { return x % 2 !== 0 });
//
    expect(odd).toEqual([1,3]);
    expect(odd.length).toBe(2);
    expect(numbers.length).toBe(3);
  });

  it("should use 'map' to transform each element", function () {
    var numbers = [1, 2, 3];
    var numbersPlus1 = _(numbers).map(function(x) { return x + 1 });
//numbersPlus1 is calling in numbers and adding one to each number in the array.
//numbers is just calling back to the orginal numbers without any changes.
    expect(numbersPlus1).toEqual([2, 3, 4]);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it("should use 'reduce' to update the same result on each iteration", function () {
    var numbers = [1, 2, 3];
    var reduction = _(numbers).reduce(
            function(/* result from last call */ memo, /* current */ x) { return memo + x }, /* initial */ 0);
//the first iteration 0 is passed in for memo and 1 is passed in for x; sum 1
//the second iteration 1 is passed in for memo and 2 is passed in for x; sum 3
//the third iteration 3 is passin for memo and 3 is passed in for x; sum 6
    expect(reduction).toBe(6);
    expect(numbers).toEqual([1,2,3]);
// numbers is still equal to the original array.
  });

  it("should use 'forEach' for simple iteration", function () {
    var numbers = [1,2,3];
    var msg = "";
    var isEven = function (item) {
      msg += (item % 2) === 0;
    };

    _(numbers).forEach(isEven);
//with each iteration a number from the array is being passed through the
//equation resulting in falsetruefalse
    expect(msg).toEqual('falsetruefalse');
    expect(numbers).toEqual([1, 2, 3]);
//numbers is equal [1, 2, 3]
  });

  it("should use 'all' to test whether all items pass condition", function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 };
//onlyEven is true since 2 can go into all integers with no remainders.
    expect(_(onlyEven).all(isEven)).toBe(true);
    expect(_(mixedBag).all(isEven)).toBe(false);
//mixedBad is false since 5 can not be evenly divided down to 0 by 2.
  });

  it("should use 'any' to test if any items passes condition" , function () {
    var onlyEven = [2,4,6];
    var mixedBag = [2,4,5,6];

    var isEven = function(x) { return x % 2 === 0 };
//onlyEven is true since 2 can go into all integers with no remainders.
    expect(_(onlyEven).any(isEven)).toBe(true);
    expect(_(mixedBag).any(isEven)).toBe(true);
//mixedBag is true since 2 can go into at least one of the integers with no remainders.
  });

  it("should use range to generate an array", function() {
//range starts at zero and up to 2 for a range of 3
      expect(_.range(3)).toEqual([0, 1, 2]);
//range starts at 1 and ends at 3 to make a range from space 1 to 4.
      expect(_.range(1, 4)).toEqual([1, 2, 3]);
//range starts at 0 and counts backwards to -3 for a range from 0 to 4 and ignores -1 since it is not valid in the range.
      expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it("should use flatten to make nested arrays easy to work with", function() {
      expect(_([ [1, 2], [3, 4] ]).flatten()).toEqual([1, 2, 3, 4]);
  //flatten removes them from their nested arrays into one big array.
  });

  it("should use chain() ... .value() to use multiple higher order functions", function() {
      var result = _([ [0, 1], 2 ]).chain()
                                    //Chain linked all of the order functions
                       .flatten()
                       //flatten removes the numbers from their nested array
                       .map(function(x) { return x+1 } )
                       //each number then passes through the map and is increase by one.
                       .reduce(function (sum, x) { return sum + x })
                       //reduce then passes all the numbers through adding them together
                       .value();
                       //value then pulls the total from the array leaving 6

      expect(result).toEqual(6);
  });

});
