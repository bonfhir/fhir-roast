import React from "react";
import { IndexPage } from "./pages";

export const App = () => {
  return (
    <React.StrictMode>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>FHIR Roast Terminology Service</title>
        </head>
        <body>
          <IndexPage />
        </body>
      </html>
    </React.StrictMode>
  );
};

export default App;
