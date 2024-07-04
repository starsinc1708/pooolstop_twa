export const RESPONSE_STATUSES = {
    error: "error",
    success: "success",
    not_found: "not found",
    auth: 401
};

export const SORT_VALUES = {
    default: "",
    asc: "asc",
    desc: "desc",
};

export const OVERFLOWS = {
    hidden: "hidden",
    auto: "auto",
};

export const DISPLAYS = {
    none: "none",
};

export const DEFAULT_PAGE = 0;

export const DEFAULT_PAGE_STEP = 1;

export const PAGE_SIZE = 31;

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_VALIDATION_ICONS = {
    default: "default",
    true: "green",
    false: "red",
};

export const PASSWORD_VALIDATION_LABELS = {
    containNumbers: "contain numbers",
    containSpecialCharacters: "contain special characters",
    beAtLeast8CharactersLong: "be at least 8 characters long",
    matchWithPasswordConfirmation: "match with password confirmation",
};

export const ACCOUNT_VALIDATION_LABELS = {
    noContainSpecialCharacters: "contain only letters and numbers",
    beAtLeast4CharactersLong: "be at least 4 characters long",
    onlyLowerCase: "only lower case",
};

export const DEFAULT_FIXED_VALUE = 2;

export const DEFAULT_BTC_FIXED_VALUE = 8;
export const DEFAULT_USDT_FIXED_VALUE = 2;

export const HASHRATE_UNIT = {
    'H': 1,
    'KH': 1000,
    'MH': 1000000,
    'GH': 1000000000,
    'TH': 1000000000000,
    'PH': 1000000000000000,
    'EH': 1000000000000000000n
}
