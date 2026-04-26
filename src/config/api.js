export default {
    ENDPOINTS:{
        users:{
            list: (page,limit, sort, order) => `/users?page=${page}&limit=5&sort=createdAt&order=asc`,
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
        event:{
            getEvents: () => `/events`,
            addEvent: () => `/event`,
            
        }
    }
}