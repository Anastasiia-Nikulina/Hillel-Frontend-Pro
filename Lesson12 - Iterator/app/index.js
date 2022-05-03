const warehouse = {
    gadgets: [
        { id: 1, title: "Apple IPad Pro", price: 2000 },
        { id: 2, title: "Lenovo IdeaPad", price: 1000 },
    ],
    sport: [
        { id: 1, title: "Fitness PRO", price: 500 },
        { id: 2, title: "Nike x200", price: 400 },
    ],
    kids: [
        { id: 1, title: "Lego Builder", price: 100 },
        { id: 2, title: "Pokemon X", price: 200 },
    ],

    [Symbol.iterator]() {
        const categoriesKeys = Object.keys(this);
        let categoryIndex = 0;

        return {
            next: () => {
                if (categoryIndex > categoriesKeys.length - 1) {
                    return {
                        value: undefined,
                        done: true,
                    };
                }

                const category = this[categoriesKeys[categoryIndex]];
                const sum = category.reduce((a, b) => a + b.price, 0);

                return {
                    done: false,
                    value: Object.values({categoryName: categoriesKeys[categoryIndex++], sum: sum}),

                };
            },
        }
    }
}



for (let iterator of warehouse) {
    console.log(iterator[0]);
    console.log(iterator[1]);
}

const categories = [...warehouse];
console.log(categories);