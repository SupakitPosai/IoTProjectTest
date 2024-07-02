const dotenv = require('dotenv');
dotenv.config();
const AuthService = require('../AuthService');
const errors = require('../../../utils/errors');
const { DefaultError } = require('../../../utils/errors');
const { TestCases } = require('./AuthServiceTestCases');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

for (const tc of TestCases) {
    describe(tc.serviceName, () => {
        for (const t of tc.testCases) {
            const authService = new AuthService(t.when.userRepository, t.when.jwtSecret)
            test(t.name, async () => {
                try {
                    const jwt = require('jsonwebtoken');
                    await jwt.sign.mockResolvedValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTc3ZGU0MTNmMzBjZmM0NDA2ZTIwYyIsImlhdCI6MTcxOTU3MTczMiwiZXhwIjoxNzE5NTc1MzMyfQ.NXvNvCuymJJnjkoGqaSh88k2try_Ojp71gUXdLbhZjw");
                    const response = await tc.service(authService, t.given.username, t.given.email, t.given.password)
                    expect(response).toEqual(t.expect.data);
                } catch (error) {
                    expect(error).toBeInstanceOf(DefaultError);
                    expect(error.message).toBe(t.expect.error.message);
                }
            });
        }
    });
}

