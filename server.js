import { createRequestHandler } from "@react-router/node";
import express from "express";

// Import the server build
const build = await import("./build/server/index.js");

const app = express();

// Serve static files from the client build
app.use(express.static("build/client", { immutable: true, maxAge: "1y" }));

// Handle all requests with React Router
app.all("*", createRequestHandler({ build }));

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}

// Export for Vercel serverless
export default app;
