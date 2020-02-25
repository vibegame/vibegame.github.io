export default function Subscribes() {
    const subscribes = {};

    this.subscribe = (eventName, func) => {
        if(!subscribes[eventName]) {
            subscribes[eventName] = [];
        }
        subscribes[eventName].push(func);
    };

    this.callSubscribe = (eventName, data) => {
        if(!subscribes[eventName]) {
            return;
        }
        subscribes[eventName].forEach(func => func(data));
    };

    this.unsubscribe = (eventName, unfunc) => {
        if(!subscribes[eventName]) {
            return;
        }
        subscribes[eventName] = subscribes[eventName].filter((func) => {
            return func !== unfunc;
        });
        if(!subscribes[eventName].length)
            delete subscribes[eventName];
    };
}