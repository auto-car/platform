import { decorateResponse } from "./decorateResponse";

export interface Env {
  STORAGE: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env);
    } catch (e) {
      return decorateResponse(`${e}`, 500);
    }
  },
};

const handleRequest = async (request: Request, env: Env) => {
  const doId = env.STORAGE.idFromName("worker-autocar-user");
  const obj = env.STORAGE.get(doId);

  return await obj.fetch(request);
};

export { StorageDO } from "./storage";
