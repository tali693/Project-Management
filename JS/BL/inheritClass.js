// It's a good idea to have a utility class to wire up inheritance.
function inherit(cls, superCls) {
    // We use an intermediary empty constructor to create an
    // inheritance chain, because using the super class' constructor
    // might have side effects.
    var construct = function () {};
    construct.prototype = superCls.prototype;
    cls.prototype = new construct;
    cls.prototype.constructor = cls;
    cls.super = superCls;
}

var MyChildClass = (function () {
    // constructor
    var cls = function (surName) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this);

        // Shadowing instance properties is a little bit less
        // intuitive, but can be done:
        var getName = this.get_name;
        

        // public (this instance only)
        this.get_name = function () {
            return getName.call(this) + ' ' + surName;
        };
    };
    cls.ppp = function () { }
    inherit(cls, MyClass); // <-- important!

    return cls;
})();

//maybe help: http://www.htmlgoodies.com/html5/tutorials/create-an-object-oriented-javascript-class-constructor.html#fbid=W07Cz5r1b6x
//http://stackoverflow.com/questions/1114024/constructors-in-javascript-objects
//usage:
var bob = new MyClass();
bob.set_name('Bob');
bob.announce(); // id is 1, name shows as "Bob"

var john = new MyChildClass('Doe');
john.set_name('John');
john.announce(); // id is 2, name shows as "John Doe"


alert(john instanceof MyClass); // true