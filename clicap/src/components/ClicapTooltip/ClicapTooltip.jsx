import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ClicapTooltip = ({tooltip, children, text, placement = "top" }) => {
  return (
    <>
        {
            tooltip?
            <OverlayTrigger placement={placement} overlay={<Tooltip>{text}</Tooltip>}>
            {children}
          </OverlayTrigger>
          :
          children
        }
        </>
  );
};
