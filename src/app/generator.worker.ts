/// <reference lib="webworker" />

import { worker } from './workerpool';
import init, { generate_from_api } from "./wasm/generator_wasm";



async function generateApi(api: string) {
    return generate_from_api(api)
}

async function initEngineWasm() {
  // Initialize wasm module
  await init("assets/generator_wasm_bg.wasm");

  console.debug("loaded wasm and created engine")

  // Register functions with workerpool
  worker({
    generateApi,
    health: async () => "ok"
  });

  console.debug("worker registered")

}

initEngineWasm();
