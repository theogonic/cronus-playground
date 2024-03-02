###
### This file is used to copy the wasm engine from project 'fusion'
### to this Angular project. Mainly the copy the js/ts helpers to the src/wasm 
### and put the wasm to src/assets
###
import argparse
import os
import shutil
import subprocess

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cronus-dir", type=str, help="custom directory of project 'cronus'", default="../cronus")
    args = parser.parse_args()

    cronus_plg_dir = os.path.dirname(os.path.dirname(__file__))
    cronus_dir = args.cronus_dir if args.cronus_dir is not None else os.path.join(cronus_plg_dir, "../fusion")
    if not os.path.exists(cronus_dir):
        return print(f"cannot find project cronus directory at '{cronus_dir}'")

    cornus_wasm_dir = os.path.join(cronus_dir, "lib", "generator-wasm")
    subprocess.run([
        "wasm-pack", "build", "--target", "web", "--out-dir", "out"
    ], cwd=cornus_wasm_dir).check_returncode()

    cronus_wasm_out = os.path.join(cornus_wasm_dir,"out")
    cronus_plg_web_src_app = os.path.join(cronus_plg_dir, "src","app")
    files = [
        (os.path.join(cronus_wasm_out, "cronus_generator_wasm.d.ts"), os.path.join(cronus_plg_web_src_app,"wasm", "generator_wasm.d.ts")),
        (os.path.join(cronus_wasm_out, "cronus_generator_wasm.js"), os.path.join(cronus_plg_web_src_app,"wasm", "generator_wasm.js")),
        (os.path.join(cronus_wasm_out, "cronus_generator_wasm_bg.wasm"), os.path.join(cronus_plg_dir, "src", "assets", "generator_wasm_bg.wasm"))
    ]

    for src, dst in files:
        dst_dir = os.path.dirname(dst)
        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)
        shutil.copyfile(src, dst)

if __name__ == "__main__":
    main()