module.exports = {
    "env": {
        "jest": true,
        "es6": true
    },
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "import"
    ],
    "rules": {
        "indent": [2, "tab"],
        "no-tabs": 0,
        "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": [2, "tab"],
        "react/jsx-indent-props": [2, "tab"],
        "react/forbid-prop-types": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};