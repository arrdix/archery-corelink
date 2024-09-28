'use client'

import isAuth from '@/components/is-auth/is-auth'

function Page(): JSX.Element {
    return <h1>Home Page</h1>
}

export default isAuth(Page)
