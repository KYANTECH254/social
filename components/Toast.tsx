"use client"
import { ToastType } from "@/types/types";
import { toast } from "sonner";

export function Toast({ data }: { data: ToastType }) {
    if (!data) return;
    const { type, message, duration, className } = data;
    let alert = null;
    switch (type) {
        case "error":
            alert = toast.error(message, {
                duration: duration,
                classNames: {
                    toast: className || "alert",
                }
            })
            return alert;
        case "success":
            alert = toast.success(message, {
                duration: duration,
                classNames: {
                    toast: className || "alert",
                }
            })
            return alert;
        case "warning":
            alert = toast.warning(message, {
                duration: duration,
                classNames: {
                    toast: className || "alert",
                }
            })
            return alert;
        case "info":
            alert = toast.info(message, {
                duration: duration,
                classNames: {
                    toast: className || "alert",
                }
            })
            return alert;
        default:
            return alert
    }

}