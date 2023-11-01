import { recipe } from "@vanilla-extract/recipes";

const SCROLL_BAR_WIDTH = "10px" as const;

export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
});

export const viewport = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
  },
});

export const scrollbar = recipe({
  base: {
    display: "flex",
    padding: "2px",
    background: "rgba(0, 0, 0, 0.06)",
    transition: "background 160ms ease-out",
    userSelect: "none",
    touchAction: "none",
    ":hover": {
      background: "rgba(0, 0, 0, 0.08)",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "column",
        height: SCROLL_BAR_WIDTH,
      },
      vertical: {
        flexDirection: "row",
        width: SCROLL_BAR_WIDTH,
      },
    },
  },
});

export const thumb = recipe({
  base: {
    flex: "1 1 auto",
    background: "gray.400",
    position: "relative",
    borderRadius: SCROLL_BAR_WIDTH,
    "::before": {
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
