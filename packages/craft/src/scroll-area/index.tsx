import ScrollArea from "@radix-ui/react-scroll-area";
import { cx } from "css/css";
import { forwardRef } from "react";

export const Root: typeof ScrollArea.Root = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <ScrollArea.Root ref={ref} className={cx(className)} {...props}>
        {children}
      </ScrollArea.Root>
    );
  }
);
