"use client";

import { useExitModalStore } from "@/store/useExitModal";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ExitModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { onClose, isOpen } = useExitModalStore(({ onClose, isOpen }) => ({
    onClose,
    isOpen,
  }));
  const router = useRouter();

  const exitHandler = () => {
    onClose();
    router.push("/learn");
  };

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div>
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos; go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson? Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onClose}
            >
              Keep Learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={exitHandler}
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
