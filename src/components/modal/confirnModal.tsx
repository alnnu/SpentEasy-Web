import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

function ConfirnModal({
  open,
  setIsOpen,
  title,
  message,
  onConfirn,
}: {
  open: boolean;
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  title: string;
  message: string;
  onConfirn: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => {
            onConfirn()
            setIsOpen(false)
          }} variant="outline">
            Confirn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirnModal;
