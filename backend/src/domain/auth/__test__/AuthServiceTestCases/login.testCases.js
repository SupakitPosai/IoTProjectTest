// case 1 : login success
// case 2 : login fail validate password 
// case 3 : login fail validate username

const errors = require("../../../../utils/errors")

module.exports = [
    {
        serviceName: "login",
        service: (authService, username, email, password) => authService?.login(username, password),
        testCases: [
            {
                name: "case 1 : login success",
                given: {
                    username: "test",
                    password: "dsfasdsad"
                },
                when: {
                    userRepository: {
                        create: () => (null),
                        findByUsername: () => ({
                            _id:"1234",
                            username: "test",
                            email: "test@email.com",
                            password: "$2b$10$y0wiHHxahgDYEfDHTJ6hKOKFyWCxUcTaqG5hhvj1RU/BmV7zELA0m"
                        })
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    data: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTc3ZGU0MTNmMzBjZmM0NDA2ZTIwYyIsImlhdCI6MTcxOTU3MTczMiwiZXhwIjoxNzE5NTc1MzMyfQ.NXvNvCuymJJnjkoGqaSh88k2try_Ojp71gUXdLbhZjw", expiresIn: 3600
                    }
                }
            }
        ]
    }
]