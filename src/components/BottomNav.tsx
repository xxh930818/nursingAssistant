import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "工作台", icon: LayoutDashboard },
    { path: "/schedule", label: "日程", icon: Calendar },
    { path: "/communication", label: "消息", icon: MessageSquare, badge: true },
    { path: "/profile", label: "我的", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-100 px-4 pb-6 pt-2 z-20">
      <div className="flex justify-between">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-1 flex-col items-center justify-end gap-1",
                isActive ? "text-blue-600" : "text-slate-400 "
              )}
            >
              <div className="relative flex h-8 items-center justify-center">
                <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 size-2 rounded-full bg-red-500"></div>
                )}
              </div>
              <p className={cn("text-[10px] leading-normal tracking-tight", isActive ? "font-bold" : "font-medium")}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
