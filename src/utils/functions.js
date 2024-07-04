import $cookies from "vue-cookies";
import moment from "moment";
import {orderBy, get} from "lodash";

import {
    PAGE_SIZE,
    OVERFLOWS,
    PASSWORD_MIN_LENGTH,
    PASSWORD_VALIDATION_ICONS,
    PASSWORD_VALIDATION_LABELS,
    DEFAULT_FIXED_VALUE,
    DEFAULT_USDT_FIXED_VALUE,
    DEFAULT_BTC_FIXED_VALUE,
} from "@/utils/constants.js";

export function getValidationEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
}

export function getValidationContainNumbers(value) {
    const regex = /\d/;

    return regex.test(value);
}

export function getValidationContainSpecialCharacters(value) {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    return regex.test(value);
}

export function getValidationAccount(account) {
    const regex = /^[a-z0-9]{4,}$/;

    return regex.test(account);
}

export function setCookie(name, value, days = "", path = "/") {
    $cookies.set(name, value, days, path);
    localStorage.setItem(name, value);
}

export function getCookie(name) {
    if ($cookies.get(name) == null) { return localStorage.getItem(name); }
    return $cookies.get(name);
}

export function removeCookie(name) {
    $cookies.remove(name);
    localStorage.removeItem(name);
}

export function getDate(date, format) {
    return moment(date).format(format);
}

export function getTimestampDate(date, format) {
    return moment(date).format(format);
}

export function getDateToTimestamp(date) {
    return moment(date).valueOf();
}

export function getGradient(ctx, chartArea, colorOne, colorTwo, colorThree) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    let width, height, gradient;

    if (!gradient || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;

        gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
        );

        if (colorOne) {
            gradient.addColorStop(0, colorOne);
        }

        if (colorTwo) {
            gradient.addColorStop(0.5, colorTwo);
        }

        if (colorThree) {
            gradient.addColorStop(1, colorThree);
        }
    }

    return gradient;
}

export function getSort(keys, items) {
    const sortKeys = Object.keys(keys);
    const sortOrder = sortKeys.map((key) => keys[key]).filter((key) => key);

    return orderBy(
        items,
        (item) =>
            sortKeys.map((key) => {
                if (key.includes(".")) {
                    return get(item, key.split("."));
                }

                return item[key];
            }),
        sortOrder
    );
}

export function getPasswordValidation(password, passwordConfirm) {
    return [
        {
            id: 0,
            label: PASSWORD_VALIDATION_LABELS.containNumbers,
            validation: !password.length
                ? PASSWORD_VALIDATION_ICONS.default
                : PASSWORD_VALIDATION_ICONS[
                      getValidationContainNumbers(password)
                  ],
        },
        {
            id: 1,
            label: PASSWORD_VALIDATION_LABELS.containSpecialCharacters,
            validation: !password.length
                ? PASSWORD_VALIDATION_ICONS.default
                : PASSWORD_VALIDATION_ICONS[
                      getValidationContainSpecialCharacters(password)
                  ],
        },
        {
            id: 2,
            label: PASSWORD_VALIDATION_LABELS.beAtLeast8CharactersLong,
            validation: !password.length
                ? PASSWORD_VALIDATION_ICONS.default
                : PASSWORD_VALIDATION_ICONS[
                      password.length >= PASSWORD_MIN_LENGTH
                  ],
        },
        {
            id: 3,
            label: PASSWORD_VALIDATION_LABELS.matchWithPasswordConfirmation,
            validation:
                !password.length && !passwordConfirm.length
                    ? PASSWORD_VALIDATION_ICONS.default
                    : PASSWORD_VALIDATION_ICONS[password === passwordConfirm],
        },
    ];
}

export function getPasswordValidationDisabled(validation) {
    return validation.find(
        (item) =>
            item.validation === PASSWORD_VALIDATION_ICONS.default ||
            item.validation === PASSWORD_VALIDATION_ICONS.false
    );
}

export function getCapitalizeFirstLetter(str) {
    if (!str || !str.length) {
        return str;
    }

    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function hiddenOverflowY() {
    document.documentElement.style.overflowY = OVERFLOWS.hidden;
}

export function autoOverflowY() {
    document.documentElement.style.overflowY = OVERFLOWS.auto;
}

export function getIsShow(data) {
    return data.length >= PAGE_SIZE;
}

export function getAnnotation(value, unit) {
    const display = value ? true : false;
    const content = `${value} ${unit}`;

    return {
        adjustScaleRange: true,
        type: "line",
        scaleID: "y",
        value,
        borderColor: "#E3E3F0",
        borderWidth: 1,
        borderDash: [5, 5],
        label: {
            display,
            content,
            position: "start",
            backgroundColor: "#EDEDF5",
            color: "#9E9FA8",
            font: {
                weight: "regular",
                size: 12,
            },
            padding: {
                top: 1,
                bottom: 1,
                right: 6,
                left: 6,
            },
            borderRadius: 4,
        },
    };
}

export function getSubtractTimeFromCurrentDate({hours, days}) {
    var currentDate = new Date();

    currentDate.setHours(currentDate.getHours() - hours);
    currentDate.setDate(currentDate.getDate() - days);

    return currentDate.getTime();
}

export function getDashboardFactory(dashboard, incomes) {
    const hashrates = [];
    const labels = [];
    let unit = "";
    let totalHashrate = 0;

    incomes.forEach((income) => {
        const {day, unit: incomeUnit, hashrate} = income;

        const formatedHashrate = parseFloat(hashrate);

        hashrates.push(parseFloat(hashrate));
        labels.push(getDateToTimestamp(day));
        unit = incomeUnit;
        totalHashrate += formatedHashrate;
    });

    const averageHashrate = (totalHashrate / incomes.length).toFixed(
        DEFAULT_FIXED_VALUE
    );

    return {
        ...dashboard,
        chart: {
            hashrates: hashrates.reverse(),
            labels: labels.reverse(),
            unit,
            totalHashrate: averageHashrate,
        },
    };
}

export function getFixedUsdtValue(usdt) {
    if (!usdt) return ''
    return parseFloat(usdt).toFixed(DEFAULT_USDT_FIXED_VALUE);
}

export function getFixedBtcValue(btc) {
    if (!btc) return ''
    return parseFloat(btc).toFixed(DEFAULT_BTC_FIXED_VALUE);
}

export function getNumberOfDecimalPoints(number, points) {
    const findDot = number.toString().includes(".");

    if (findDot) {
        return number.toString().split(".").pop().length > points;
    }

    return false;
}
