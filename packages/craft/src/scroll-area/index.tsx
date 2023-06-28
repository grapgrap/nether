import {
  Root as _Root,
  Scrollbar as _Scrollbars,
  Thumb as _Thumb,
  Viewport as _Viewport,
} from "@radix-ui/react-scroll-area";
import { styled } from "../../css/jsx";

const SCROLL_BAR_WIDTH = "10px" as const;

export const Root = styled(_Root, {
  base: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
});

export const Viewport = styled(_Viewport, {
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
  },
});

export const ScrollBar = styled(_Scrollbars, {
  base: {
    display: "flex",
    padding: "2px",
    background: {
      base: "rgba(0, 0, 0, 0.06)",
      _hover: "rgba(0, 0, 0, 0.08)",
    },
    transition: "background 160ms ease-out",
    userSelect: "none",
    touchAction: "none",
    _horizontal: {
      flexDirection: "column",
      height: SCROLL_BAR_WIDTH,
    },
    _vertical: {
      flexDirection: "row",
      width: SCROLL_BAR_WIDTH,
    },
  },
});

export const Thumb = styled(_Thumb, {
  base: {
    flex: "1 1 auto",
    background: "gray.400",
    position: "relative",
    borderRadius: SCROLL_BAR_WIDTH,
    _before: {
      content: "",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      minWidth: "44px",
      minHeight: "44px",
    },
  },
});
