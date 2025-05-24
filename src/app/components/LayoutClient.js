"use client";
import { usePathname } from "next/navigation";
import CommonLayout from "./CommonLayout";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  return isLogin ? (
    <main style={{ flex: 1 }}>{children}</main>
  ) : (
    <CommonLayout>
      <main style={{ flex: 1 }}>{children}</main>
    </CommonLayout>
  );
} 