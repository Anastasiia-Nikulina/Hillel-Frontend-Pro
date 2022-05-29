// симулятор ошибок
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


const randomizeError = () => {
    const random = getRandomInt(1, 100);

    if (random > 90) {
        return new Error('Bad Request');
    }

    return null;
};


// симулятор запроса в БД в таблицу юзеров.
const getUsers = (callback) => {
    const USERS = [
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Andy' },
        { id: 3, name: 'John' },
    ];

    setTimeout(() => {
        callback(randomizeError(), USERS);
    }, 2000);
};

// симулятор запроса в таблицу продуктов.
const getProducts = (callback) => {
    const PRODUCTS = [
        { id: 1, name: 'iPad' },
        { id: 2, name: 'Google Pixel' },
        { id: 3, name: 'War and Peace' },
        { id: 4, name: 'iPad' },
        { id: 5, name: 'Kaizen' },
        { id: 6, name: 'Sherlock Holmes' },
    ];

    setTimeout(() => {
        callback(randomizeError(), PRODUCTS);
    }, 2000);
};

// симулятор запроса в таблицу заказов.
const getOrders = (callback) => {
    const ORDERS = [
        { id: 1, userId: 1, checkout: [1, 6] },
        { id: 2, userId: 1, checkout: [3] },
        { id: 3, userId: 2, checkout: [2, 4] },
    ];

    setTimeout(() => {
        callback(randomizeError(), ORDERS);
    }, 2000);
};

//FirstErrorCallback

const getCheckoutsForUser = ((userId, callback) => {
    getUsers((error, user) => {
        if (!error) {
            const data = user.filter(row => row.id === userId)
            if (data.length > 0) {
                getOrders((error, orders) => {
                    if (!error) {
                        const userOrders = orders.filter(row => row.userId === userId)
                        if (userOrders.length > 0) {
                            getProducts((error, products) => {
                                if (!error) {
                                    for (let i = 0; i < userOrders.length; i++) {
                                        let checkout = [];
                                        for (const iterator of userOrders[i].checkout) {
                                            checkout = checkout.concat(products.filter(row => row.id === iterator));
                                        } 
                                        userOrders[i].checkout = checkout;
                                    }
                                    callback(error, userOrders);
                                } else {
                                    callback(error, userId);
                                }
                            })
                        }
                        else {
                            callback(new Error("User has not added any orders yet"), userOrders);
                        }
                    } else {
                        callback(error, orders);
                    }
                })
            }
            else {
                callback(new Error("User is not found"), data);
            }
        }
        else {
            callback(error, userId);
        }
    })
});


cb = (error, data) => {
    if (!error) {
        console.log(data);
    }
    else {
        console.error(error);
    }
}
getCheckoutsForUser(1, cb);

//Promise