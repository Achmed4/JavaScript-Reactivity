/*jshint esversion: 6*/

let data = {
    price: 5,
    quantity: 2
};

let target, total, salePrice;

class Dep {
    constructor() { //Store
        this.subscribers = [];
    }

    depend() { //Record
        if(target && !this.subscribers.includes(target)) {
            this.subscribers.push(target);
        }
    }

    notify() { //Replay
        this.subscribers.forEach(run => run());
    }

}

Object.keys(data).forEach(key => {
    let internalValue = data[key]; //Store the value, starting with initial value

    const dep = new Dep(); //Each of these is going to have its own dep instance

    Object.defineProperty(data, key, {        
        get() {
            dep.depend(); // <-- Remember the target we're running
            return internalValue;
        },    
        set(newVal) {            
            internalValue = newVal;
            dep.notify(); // <-- Return saved targets
        }
    });
});

function watcher(myFunc) {
    target = myFunc; //Setting the target
    target(); //Running the target
    target = null; //Reseting the target
}

watcher(() => {total = data.price * data.quantity;});

watcher(() => {salePrice = data.price * 0.9;});