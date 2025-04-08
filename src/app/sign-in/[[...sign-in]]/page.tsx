import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/clerkTheme"

export default function Page() {
  return <SignIn appearance={clerkAppearance}/>;
}
