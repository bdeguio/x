import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/clerkTheme"

export default function Page() {
  return <SignUp appearance={clerkAppearance} />;
}
