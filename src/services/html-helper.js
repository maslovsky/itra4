export default class HtmlHelper {
    static toHtml(text, tag = 'div') {
        const div = document.createElement(tag);

        div.innerHTML = text;

        return div.children[0];
    }
}