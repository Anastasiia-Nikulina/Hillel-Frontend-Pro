const getRandomInt2 = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


const randomizeErrorForPromise = () => {
    const random = getRandomInt2(1, 100);

    if (random > 90) {
        return new Error('Bad Request');
    }

    return null;
};


// симулятор запроса в БД в таблицу юзеров.
const getUsersPromise = () => {
    const USERS = [
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Andy' },
        { id: 3, name: 'John' },
    ];

    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            const error = randomizeErrorForPromise();
            if (error) {
                reject(error);
            } else {
                resolve(USERS);
            }
        }, 2000);
    })
    return promise;

};

// симулятор запроса в таблицу продуктов.
const getProductsPromise = () => {
    const PRODUCTS = [
        { id: 1, name: 'iPad' },
        { id: 2, name: 'Google Pixel' },
        { id: 3, name: 'War and Peace' },
        { id: 4, name: 'iPad' },
        { id: 5, name: 'Kaizen' },
        { id: 6, name: 'Sherlock Holmes' },
    ];

    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            const error = randomizeErrorForPromise();
            if (error) {
                reject(error);
            } else {
                resolve(PRODUCTS);
            }
        }, 2000);
    })
    return promise;
};

// симулятор запроса в таблицу заказов.
const getOrdersPromise = () => {
    const ORDERS = [
        { id: 1, userId: 1, checkout: [1, 6] },
        { id: 2, userId: 1, checkout: [3] },
        { id: 3, userId: 2, checkout: [2, 4] },
    ];

    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            const error = randomizeErrorForPromise();
            if (error) {
                reject(error);
            } else {
                resolve(ORDERS);
            }
        }, 2000);
    })
    return promise;
};


const getCheckoutsForUserAsync = async (userId) => {
    const user = await getUsersPromise();
    const data = user.filter(row => row.id === userId)
    if (data.length > 0) {
        const [orders, products] = await Promise.all([getOrdersPromise(), getProductsPromise()])
        const userOrders = orders.filter(row => row.userId === userId);
        if (userOrders.length === 0) {
            throw new Error("User has not added any orders yet")
        }
        for (let i = 0; i < userOrders.length; i++) {
            let checkout = [];
            for (const iterator of userOrders[i].checkout) {
                checkout = checkout.concat(products.filter(row => row.id === iterator));
            }
            userOrders[i].checkout = checkout;
        }
        return userOrders;
    } else {
        throw new Error("User is not found")
    }

}
getCheckoutsForUserAsync(1)
    .then(console.log)
    .catch(console.error)