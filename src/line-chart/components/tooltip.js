export default class Tooltip {
    constructor() {
    }

    render(titleFirst, titleSecond) {
        return `
            <g transform="translate(0, 0)" class="tooltip" display="none" fill="white">
                <rect x="0" y="0" width="140" height="45" fill="gray"/>

                <text dy="1em" dx="1em">${titleFirst}</text> 
                <text dy="1em" dx="1em" x="50" class="first-value"></text>
                
                <text dy="1em" dx="1em" y="20">${titleSecond}</text>
                <text dy="1em" dx="1em" y="20" x="50" class="second-value"></text>
            </g>
        `;
    }

    show(svg) {
        const tooltip = this._getTooltip(svg);
        
        tooltip.setAttribute('display', null);

        return this;
    }

    hide(svg) {
        const tooltip = this._getTooltip(svg);

        tooltip.setAttribute('display', 'none');

        return this;
    }

    move(svg, x, y) {
        const tooltip = this._getTooltip(svg);

        tooltip.setAttribute('transform', `translate(${+x + 10}, ${+y + 10})`);
        
        return this;
    }

    setValues(svg, first, second) {
        const tooltip = this._getTooltip(svg);
        
        tooltip.querySelector('text.first-value').textContent = first;
        tooltip.querySelector('text.second-value').textContent = second;  

        return this;
    }

    _getTooltip(svg) {
        return  svg.querySelector('g.tooltip');
    }
}