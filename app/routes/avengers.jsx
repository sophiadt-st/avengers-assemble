import { Outlet } from '@remix-run/react';

export default function Index() {
    return (
        <>
            <h1>Hello from avengers route!</h1>
            <Outlet />
        </>
    )
}