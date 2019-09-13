describe("About Objects", function () {

  describe("Properties", function () {
    var megalomaniac;

    beforeEach(function () {
       megalomaniac = {  mastermind: "Joker", henchwoman: "Harley" };
    });
// Joker is assigned to mastermind
    it("should confirm objects are collections of properties", function () {
      expect(megalomaniac.mastermind).toBe("Joker");
    });
//Harley is assigned to henchwoman, nothing is assigned to henchWoman
    it("should confirm that properties are case sensitive", function () {
      expect(megalomaniac.henchwoman).toBe("Harley");
      expect(megalomaniac.henchWoman).toBe(undefined);
    });
  });


  it("should know properties that are functions act like methods", function () {
    var megalomaniac = {
      mastermind : "Brain",
      henchman: "Pinky",
      battleCry: function (noOfBrains) {
        return "They are " + this.henchman + " and the" +
          Array(noOfBrains + 1).join(" " + this.mastermind);
      }
    };

    var battleCry = megalomaniac.battleCry(4);
    expect("They are Pinky and the Brain Brain Brain Brain").toMatch(battleCry);
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", function () {
    var currentDate = new Date();
    var currentYear = (currentDate.getFullYear());
    var megalomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge: function () {
        return currentYear - this.birthYear;
      }
    };
//currentYear is pulling in the year from current Date
//calculateAge is using birthyear and current year to calculate the age.
    expect(currentYear).toBe(2019);
    expect(megalomaniac.calculateAge()).toBe(49);
  });

  describe("'in' keyword", function () {
    var megalomaniac;
    beforeEach(function () {
      megalomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true
      };
    });

    it("should have the bomb", function () {

      var hasBomb = "theBomb" in megalomaniac;
//theBomb has a value of true and hasBomb is equal to theBomb
      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", function () {

      var hasDetonator = "theDetonator" in megalomaniac;
//there is no object for theDetonator making it false.
      expect(hasDetonator).toBe(false);
    });
  });

  it("should know that properties can be added and deleted", function () {
    var megalomaniac = { mastermind : "Agent Smith", henchman: "Agent Smith" };
// object secretary has not be defined so returns false.
    expect("secretary" in megalomaniac).toBe(false);
//object secretary has been defined so returns true.
    megalomaniac.secretary = "Agent Smith";
    expect("secretary" in megalomaniac).toBe(true);
//object henchman has been deleted so returns false.
    delete megalomaniac.henchman;
    expect("henchman" in megalomaniac).toBe(false);
  });


  it("should use prototype to add to all objects", function () {
      function Circle(radius)
      {
        this.radius = radius;
      }

      var simpleCircle = new Circle(10);
      var colouredCircle = new Circle(5);
      colouredCircle.colour = "red";
//simpleCircle.colour does not have a value so it returns undefined.
//colouredCircle.colour has a value of red so it returns red.
      expect(simpleCircle.colour).toBe(undefined);
      expect(colouredCircle.colour).toBe('red');

      Circle.prototype.describe = function () {
        return "This circle has a radius of: " + this.radius;
      };
//simpleCircle has a value of 10
//colouredCircle has a value of 5
      expect(simpleCircle.describe()).toBe("This circle has a radius of: 10");
      expect(colouredCircle.describe()).toBe("This circle has a radius of: 5");
  });
});
