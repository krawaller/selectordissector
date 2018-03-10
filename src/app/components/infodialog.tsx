import {ReactElement} from "react";
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
  content: ReactElement<any>,
  close: () => void,
};

const InfoDialog: React.StatelessComponent<InfoDialogProps> = ({isOpen, close, content}) => (
  <Dialog
    open={isOpen}
    onClose={close}
  >
    <DialogSurface>
      <DialogHeader>
        <DialogHeaderTitle>What's this?</DialogHeaderTitle>
      </DialogHeader>
      <DialogBody>
        {content}
      </DialogBody>
      <DialogFooter>
          <DialogFooterButton accept>Ok</DialogFooterButton>
      </DialogFooter>
    </DialogSurface>
    <DialogBackdrop />
  </Dialog>
);

export default InfoDialog;
