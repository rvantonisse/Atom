/*
** JAVASCRIPT SYNTAX EXAMPLE
*/

/* VARIABLES */
var string = 'string',
    number = 1,
    boolean = true;

string.toUpperCase();

var array = [
  {
    name: 'Jonagold',
    type: 'pie apple',
    juiciness: 4,
    immune: false,
  },
  {
    name: 'Jazz',
    type: 'Swing apple',
    juiciness: 8,
    immune: true,
  },
];

console.log(array[1]);

var object = {
  propOne: 'Definition',
  propTwo: 'value two',
  propBool: false,
  methodOne: function() {
    console.log('Method one!');
  },
  methodTwo: () => {
    console.log('Method Two!');
  },
}

// other storage types
let variableArray = [];
variableArray.push('Item!');

const CONSTANTVAR = 'Something constant';
console.log(CONSTANTVAR);

/* FUNCTIONS */
// Declaration
function doStuff(withThis) {
  console.log('Doing stuff with: ', withThis);
}

// Lexical
var doMoreStuff = (withThis) => {
  console.log('MOAR! With ' + withThis);
}

// Call
doStuff('this');

/* OBJECT ORIENTED JS */
// namespace
var MYOBJ = MYOBJ || {};

// sub namespace
MYOBJ.stuff = {};

// Class
var Thing = function(thingName) {
  return {
    name: this.thingName,
  };
}
Thing.prototype.identify = function() {
  console.log('This is a ' + this.thingName + ' thing.');
}
Thing.prototype.age = 33;

class Thingy extends OtherThingy {
  Constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    a: Proptypes.boolean,
  }

  handleClick() {
    console.log('CLICKED!');
  }

  render() {
    const classes = classNames(
      style.JsxElement,
      { 'conditional-style': condition },
    );

    return (
      <div
        className={ classes }
        onClick={ this.handleClick }
        dataValue="Some value"
      >
        <span>Some JSX whoop-di-doo</span>
      </div>
    );
  }
}

// new Instance
var ThingOne = new Thing('New'),
    ThingTwo = new Thing('Two');

ThingOne.identify();
ThingTwo.identify();

if (boolean) {
  console.log('It is really ' + boolean + '!');
}

for (thing in object) {
  console.log(thing, object[thing]);
}
