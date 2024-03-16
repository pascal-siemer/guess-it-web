interface View<Model> {
    render(root: HTMLElement): void;
    destroy(): void;
    update(fn: (model: Model) => Model): void;
}