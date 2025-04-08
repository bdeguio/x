import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/clerkTheme";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}
