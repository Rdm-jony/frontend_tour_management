"use client";

import { logoutUser } from "@/utils/logoutUser";
import { Button } from "../ui/button";
import { showToast } from "nextjs-toast-notify";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
        showToast.success("user logout successfully")
    };
    return (
        <Button variant={"destructive"} onClick={handleLogout} className="cursor-pointer">
            Logout
        </Button>
    );
};

export default LogoutButton;