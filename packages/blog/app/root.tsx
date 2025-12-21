import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./styles/global.css";
import { light } from "./styles/theme.css";

export default function Root() {
  const [className] = light;
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={className}>
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
