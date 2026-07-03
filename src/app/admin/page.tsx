import type { Metadata } from "next";
import AdminForm from "@/components/AdminForm";

export const metadata: Metadata = {
  title: "Administrace — Společně pro Josefov",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminForm />;
}
