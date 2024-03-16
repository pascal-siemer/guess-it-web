function instanciate(template: string): DocumentFragment {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template;
    return templateElement.content;
}

export const DOM = {
    instanciate: instanciate
};