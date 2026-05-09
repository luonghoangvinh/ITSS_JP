import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export function Mainlayout() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <Sidebar />
            <div style={{ marginLeft: '200px', flex: 1, overflow: 'auto' }}>
                <Outlet />
            </div>
        </div>
    )
}