class Observer {
    /**
     * 
     * @param { Function } fn 
     */
    constructor(fn) {
        this.fn = fn;
    };

    /**
     * 
     * @param { string[] } data 
     */
    refresh(data) {
        this.fn(data);
    };
};

class Radius {
    /**
     * 
     * @param { Observer } observer 
     */
    constructor() {
        /**
         * @type { Observer[] }
         */
        this.observers = [];
    }

    /**
     * 
     * @param  {Observer } observer 
     */
    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /**
     * 
     * @param { string[] } data 
     */
    notify(data) {
        this.observers.forEach(
            (obs) => {
                obs.refresh(data);
            }
        );
    }
};

/**
     * @type { HTMLInputElement }
     */
const inputTopLeft = document.getElementById('range1');
/**
 * @type { HTMLInputElement }
*/
const inputTopRight = document.getElementById('range2');

/**
 * @type { HTMLInputElement }
*/
const inputBottomLeft = document.getElementById('range3');
/**
 * @type { HTMLInputElement }
*/
const inputBottomRight = document.getElementById('range4');

/**
 * @type { HTMLDivElement }
 */
const circle = document.getElementById('circle');


const borderUpdater = new Radius();

/**
 * 
 * @param { string[] } radius 
 */
const changeRadius = (radius) => {
    circle.style.borderRadius = `${radius[0]} ${radius[1]} ${radius[2]} ${radius[3]}`
};
const observerBordersRadius = new Observer( changeRadius );

const onInputValues = () => {

    /**
     * @type { HTMLElement }
     */
    let articleOutput = document.getElementById('output-values');
    let paragraphBorderTopLeft = document.getElementById('border-top-left');
    let paragraphBorderTopRight = document.getElementById('border-top-right');
    let paragraphBorderBottomLeft = document.getElementById('border-bottom-left');
    let paragraphBorderBottomRight = document.getElementById('border-bottom-right');


    let {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius
    } = window.getComputedStyle(circle);

    articleOutput.innerText = `${ borderTopLeftRadius } ${ borderTopRightRadius} ${ borderBottomLeftRadius} ${ borderBottomRightRadius}`;
    paragraphBorderTopLeft.innerText = borderTopLeftRadius;
    paragraphBorderTopRight.innerText = borderTopRightRadius;
    paragraphBorderBottomLeft.innerText = borderBottomLeftRadius;
    paragraphBorderBottomRight.innerText = borderBottomRightRadius;
}
const observerBordersToInput = new Observer( onInputValues );


borderUpdater.subscribe(observerBordersRadius)
borderUpdater.subscribe(observerBordersToInput)


function updateBorder() {

    let inputTopLeftValue = inputTopLeft.value + '%';
    let inputTopRightValue = inputTopRight.value + '%';
    let inputBottomLeftValue = inputBottomLeft.value + '%';
    let inputBottomRightValue = inputBottomRight.value + '%';


    console.log([
        inputTopLeftValue,
        inputTopRightValue,
        inputBottomLeftValue,
        inputBottomRightValue
    ])
    ;
    borderUpdater.notify([
        inputTopLeftValue,
        inputTopRightValue,
        inputBottomLeftValue,
        inputBottomRightValue,
    ]);
};


function copy() {
    const articleOutput = document.getElementById('output-values');

    navigator.clipboard.writeText( articleOutput.textContent )
    .then( () => alert('Texto Copiado!'))
    .catch( ( err ) => alert('Error al copiar'+ err )  );
}