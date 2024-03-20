import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui";
import { Logo } from "@/components";

export const Header = () => (
  <header className="h-20 w-full border-b-2 border-slate-200 px-4">
    <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
      <Logo />
      <ClerkLoading>
        <Loader className="animate-spin w-5 h-5 text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            afterSignInUrl="/learn"
            afterSignUpUrl="/learn"
          >
            <Button variant="ghost" size="lg">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  </header>
);
