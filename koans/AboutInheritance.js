function Muppet(age, hobby) {
  this.age = age;
  this.hobby = hobby;

  this.answerNanny = function(){
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby);
  this.mood = mood;

  this.cook = function() {
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet();

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet = new Muppet(2, "coding");
	this.swedishChef = new SwedishChef(2, "cooking", "chillin");
  });
//this.swidishChef is calling back to the function SwedishChef to the this.cook which equals "Mmmm soup"
  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual("Mmmm soup!");
  });
//this.swidishChef is calling back to the base object Muppet to get answerNanny's value.
  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
  });
//this.swidishChef is calling back to get age of 2 and hobby of cooking
  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual('cooking');
  });
//this.swidishChef is calling back to the constructor parameters to get his mood.
  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual("chillin");
  });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () {
  function F() {}
  F.prototype = this;
  return new F();
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby);
  this.trick = trick;

  this.doTrick = function() {
    return this.trick;
  }
}

//no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
  this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });

  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual('eat a tire');
  });
//pulls "everythings cool" from the base answerNanny
  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything's cool");
  });
//pulls his age from this.gonzo
  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    expect(this.gonzo.hobby).toEqual("daredevil performer");
  });
//function this.doTrick allows for simpler syntax to call trick.
  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual('eat a tire');
  });
});
