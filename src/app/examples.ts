export interface Example {
    spec: string;
    label: string;
}
export default [
    {
        label: "Todo (Rust)",
        spec:`
global [generator.rust.file = "src/generated.rs"]
global [generator.rust_axum.file = "src/generated.rs"]
global [generator.rust.async]
global [generator.rust.async_trait]


struct Todo {
    id: string
    content: string
}

usecase Todo {

    [rest.method = "post"]
    createTodo {
        in {
            content: string
        }

        out {
            todo: Todo
        }
    }
}
        `
    }
] as Example[];