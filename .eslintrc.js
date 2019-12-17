module.exports = {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": ["error", "windows"],
        "no-console": ["error", { 
            "allow": ["log", "warn", "error"] 
        }],
        "comma-dangle": 0,
        "no-underscore-dangle": "off"
    },
    "env": { "node": true, "mocha": true },
    "ignorePatterns": ["node_modules/", "views/"],
};