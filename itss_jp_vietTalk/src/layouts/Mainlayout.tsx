import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export function Mainlayout() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', width: 'calc(100% - 200px)', overflow: 'auto' }}>
                <Outlet />
            </div>
        </div>
    )
}