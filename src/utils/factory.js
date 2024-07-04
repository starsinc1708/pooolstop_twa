export function dashboardFactory() {
    return {
        chart: {
            hashrates: [],
            rejects: [],
            rejectsPercent: [],
            labels: [],
            unit: "",
            totalHashrate: 0,
            totalReject: 0,
            totalRejectPercent: 0,
        },
        minersInfo: {
            total: 0,
            active: 0,
            warning: 0,
            dead: 0,
        },
        paid: "",
        expect: "",
        total: "",
    };
}

export function userFactory() {
    return {
        blocked: false,
        email: "",
        isMinerSecure: false,
        login: "",
        name: null,
        role: "USER",
        wallet: false,
    };
}

export function balanceFactory() {
    return {
        btc: 0,
        totalUsdt: 0,
    };
}

export function stratumFactory() {
    return {
        account: "",
        stratum: "",
        stratum2: "",
        stratum3: "",
    };
}

export function walletFactory() {
    return {
        btc: "",
        expected_income: "",
        usdt: "",
        paid: "",
        expected_bonus: "",
        expected_total: "",
    };
}

export function statFactory() {
    return {
        hashrate: 0,
        uptime: 0,
        rejectPercent: 0,
        unit: "TH",
        chart: {
            hashrates: [],
            rejects: [],
            labels: [],
        },
    };
}

export function nominalFactory() {
    return {
        active_miners: 0,
        unit: "",
        value: null,
    };
}

export function pairFactory() {
    return {
        active: true,
        base_currency: "",
        currency: "",
        daily_volume: "",
        futures: "",
        id: "",
        indicators: {},
        lastTick: {
            history_from: "",
            history_to: "",
            rate: "",
            update_time: "",
        },
        history_from: "",
        history_to: "",
        rate: "",
        update_time: "",
        limit_orders_enabled: false,
        margin_buy_allowed: false,
        margin_sell_allowed: false,
        margin_symbol_id: 0,
        margin_trade: false,
        market_orders_enabled: false,
        max_price: "",
        max_quantity: "",
        min_order_price: "",
        min_price: "",
        min_quantity: "",
        name: "",
        notional_currency: "",
        step_size: "",
        stop_loss_limit_orders_enabled: false,
        stop_loss_market_orders_enabled: false,
        take_profit_limit_orders_enabled: false,
        take_profit_market_orders_enabled: false,
        tick_size: "",
    };
}
