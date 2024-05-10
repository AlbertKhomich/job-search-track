import { revalidatePath } from "next/cache";
import LoginForm from "../ui/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    revalidatePath("/");
    redirect("/");
  }

  return (
    <main className="grid place-items-center mt-20">
      <LoginForm />
    </main>
  );
}
