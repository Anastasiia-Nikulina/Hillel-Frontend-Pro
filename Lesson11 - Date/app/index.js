const MS_IN_A_DAY = 1000 * 60 * 60 * 24;

const MS_IN_A_HOUR = 1000 * 60 * 60;

const MS_IN_A_MINUTE = 1000 * 60;

const MS_IN_A_SECOND = 1000;

const date1 = new Date ("2022-02-19T19:14:00");
const date2 = new Date ("2022-02-19T19:15:00");



const difference = (from, to) => {

    const diff = Math.abs(from.getTime() - to.getTime());
    return dateObj = {
        ms: diff,
        s: Math.abs(Math.round(diff / MS_IN_A_SECOND)),
        m: Math.abs(Math.round(diff / MS_IN_A_MINUTE)),
        h: Math.abs(Math.round(diff / MS_IN_A_HOUR)),
        d: Math.abs(Math.round(diff / MS_IN_A_DAY)),

        M: Math.round(from.getMonth() - to.getMonth()),
        y: Math.abs(Math.round(from.getFullYear() - to.getFullYear())),
    }
}

console.log(difference(date1, date2));