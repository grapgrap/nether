import * as ScrollArea from "@radix-ui/react-scroll-area";
import { forwardRef } from "react";
import { cx } from "../../css/css";

export const Root: typeof ScrollArea.Root = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <ScrollArea.Root ref={ref} className={cx(className)} {...props}>
        {children}
      </ScrollArea.Root>
    );
  }
);
