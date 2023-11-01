import {
  Root as _Root,
  Scrollbar as _Scrollbar,
  Thumb as _Thumb,
  Viewport as _Viewport,
} from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { root, scrollbar, thumb, viewport } from "./scroll-area.css";

export const Root = forwardRef<
  ElementRef<typeof _Root>,
  ComponentPropsWithoutRef<typeof _Root>
>(({ className, ...props }, ref) => (
  <_Root ref={ref} className={clsx(root(), className)} {...props} />
));

export const Viewport = forwardRef<
  ElementRef<typeof _Viewport>,
  ComponentPropsWithoutRef<typeof _Viewport>
>(({ className, ...props }, ref) => (
  <_Viewport ref={ref} className={clsx(viewport(), className)} {...props} />
));

export const Scrollbar = forwardRef<
  ElementRef<typeof _Scrollbar>,
  ComponentPropsWithoutRef<typeof _Scrollbar>
>(({ className, ...props }, ref) => (
  <_Scrollbar
    ref={ref}
    className={clsx(scrollbar({ orientation: props.orientation }), className)}
    {...props}
  />
));

export const Thumb = forwardRef<
  ElementRef<typeof _Thumb>,
  ComponentPropsWithoutRef<typeof _Thumb>
>(({ className, ...props }, ref) => (
  <_Thumb ref={ref} className={clsx(thumb(), className)} {...props} />
));
