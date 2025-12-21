import { globalLayer, globalStyle } from "@vanilla-extract/css";
import "./normalize.css";
import { light } from "./theme.css";

// Define layer order
globalLayer("normalize");
globalLayer("theme");
globalLayer("layout");

const [, vars] = light;

globalStyle("html", {
  "@layer": {
    layout: {
      fontSize: "16px",
    },
  },
});

globalStyle("body", {
  "@layer": {
    layout: {
      margin: 0,
      color: vars.colors.text.primary,
      backgroundColor: vars.colors.background.primary,
    },
  },
});

globalStyle("main", {
  "@layer": {
    layout: {
      width: "88vw",
      maxWidth: "54rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});
