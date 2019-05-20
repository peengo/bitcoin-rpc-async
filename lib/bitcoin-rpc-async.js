const axios = require('axios');

module.exports = class {
    constructor(url, methods = [], naming) {
        this.url = url;
        this.methods = methods;
        this.naming = naming;

        for (const method of this.methods) {
            this[method] = (params) => {
                switch (this.naming) {
                    case 'camelCase':
                        return this.run(method.toLowerCase(), params);
                    case 'underscore':
                        return this.run(method.replace(/[_]/g, '').toLowerCase(), params);
                    default:
                        return this.run(method, params);
                }
            };
        }
    }
    async run(method, params = []) {
        try {
            const response = await axios.post(
                this.url,
                { method, params },
                // accept all HTTP statuses as resolved 
                { validateStatus: () => true }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
