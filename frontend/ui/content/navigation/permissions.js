export const permissionsToView = [
    {
        perm: 'show_statements',
        name: "Заявки",
        route: "statements"
    },
    {
        perm: 'show_payrolls',
        name: "Мои выплаты",
        route: "payrolls"
    },
    {
        perm: 'show_users',
        name: "Пользователи",
        route: "users"
    }
]

export const roleToView = [
    {
        role: 'ADMIN',
        name: 'Администратор'
    },
    {
        role: 'STUDENT',
        name: 'Студент'
    }
]