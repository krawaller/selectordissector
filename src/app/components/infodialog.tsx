import * as React from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogHeader,
  DialogHeaderTitle,
  DialogSurface,
} from "rmwc/Dialog";

type InfoDialogProps = {
  isOpen: boolean,
  close: () => void,
};

const InfoDialog: React.StatelessComponent<InfoDialogProps> = ({isOpen, close}) => (
  <Dialog
    open={isOpen}
    onClose={close}
  >
    <DialogSurface>
      <DialogHeader>
        <DialogHeaderTitle>What's this?</DialogHeaderTitle>
      </DialogHeader>
      <DialogBody>
        Crafted with &hearts; by <a href="http://edument.se" target="_blank">Edument</a>.
      </DialogBody>
      <DialogFooter>
          <DialogFooterButton accept>Ok</DialogFooterButton>
      </DialogFooter>
    </DialogSurface>
    <DialogBackdrop />
  </Dialog>
);

export default InfoDialog;
