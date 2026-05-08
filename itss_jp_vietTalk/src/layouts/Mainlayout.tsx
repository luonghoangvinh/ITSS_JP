import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export function Mainlayout() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}