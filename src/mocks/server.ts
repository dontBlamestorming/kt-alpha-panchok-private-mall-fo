import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Server Component/Route Handler 등 Node 런타임에서 fetch를 목킹할 때 사용한다.
export const server = setupServer(...handlers);
