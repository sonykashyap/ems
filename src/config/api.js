export default {
    ENDPOINTS:{
        users:{
            list: () => `/users`,
            create: ()=> `/add-user`,
            delete: (userId) => `/user/${userId}`,
            edit: (userId) => `/edit-user/${userId}`,
            forgotPassword: () => `/forgot-password`,
            resetPassword: () => `/reset-password`,
        },
        roles: {
            list: () => `/roles`,
            create: () => `/roles`,
            delete: () => `/delete`,
            edit: () => `/edit-role`,
        },
        auth: {
            login: () => `/login`,
            logout: () => `/logout`,
        },
         dashboard: {
            dashboardData: () => `/dashboardData`,
        },
    }
}