// case 1 : register success
// case 2 : register fail duplicate username 
// case 3 : register fail validate password 
// case 4 : register fail validate username 
// case 5 : register fail validate email 

const errors = require("../../../../utils/errors")

module.exports = [
    {
        serviceName: "test",
        service: (authService, username, email, password) => authService?.test(username, email, password),
        testCases: [
            {
                name: "test success",
                given: {
                    username: "test",
                    password: "test1234",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => ({
                            username: "test",
                            password: "test1234",
                            email: "test@email.com"
                        }),
                        findByUsername: () => (null)
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    data: {
                        username: "test",
                        password: "test1234",
                        email: "test@email.com"
                    }
                }
            },
            {
                name: "test fail validate username duplicate",
                given: {
                    username: "test1",
                    password: "test1234",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => ({}),
                        findByUsername: () => ({
                            username: "test1",
                            email: "test@email.com"
                        })
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    error: {
                        message: errors.DUPLICATED_USERNAME
                    }
                },
            }
        ]
    },
    {
        serviceName: "register",
        service: (authService, username, email, password) => authService?.register(username, email, password),
        testCases: [
            {
                name: "case 1 : register success",
                given: {
                    username: "test",
                    password: "test1234",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => ({
                            username: "test",
                            password: "test1234",
                            email: "test@email.com"
                        }),
                        findByUsername: () => (null)
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    data: {
                        username: "test",
                        password: "test1234",
                        email: "test@email.com"
                    }
                }
            },
            {
                name: "case 2 : register fail validate password ",
                given: {
                    username: "test1",
                    password: "",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => ({}),
                        findByUsername: () => ({
                            username: "test1",
                            email: "test@email.com"
                        })
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    error: {
                        message: errors.INVALID_USERNAME_PASSWORD
                    }
                },
            },
            {
                name: "case 3 : register fail validate username ",
                given: {
                    username: "",
                    password: "test2",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => (null),
                        findByUsername: () => (null)
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    error: {
                        message: errors.INVALID_USERNAME_PASSWORD
                    }
                },
            },
            {
                name: "case 4 : register fail duplicate username",
                given: {
                    username: "test1",
                    password: "test1234",
                    email: "test@email.com"
                },
                when: {
                    userRepository: {
                        create: () => ({}),
                        findByUsername: () => ({
                            username: "test1",
                            email: "test@email.com"
                        })
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    error: {
                        message: errors.DUPLICATED_USERNAME
                    }
                },
            },
            {
                name: "case 5 : register fail validate email",
                given: {
                    username: "test1",
                    password: "test1234",
                    email: ""
                },
                when: {
                    userRepository: {
                        create: () => (null),
                        findByUsername: () => (null)
                    },
                    jwtSecret: process.env.JWT_SECRET
                },
                expect: {
                    error: {
                        message: errors.INVALID_EMAIL
                    }
                },
            }
        ]
    }
]