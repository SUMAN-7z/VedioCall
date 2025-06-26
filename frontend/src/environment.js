let IS_PROD = false;
const server = IS_PROD
  ? "https://vediocall-ui49.onrender.com"
  : "http://localhost:8000";

export default server;
