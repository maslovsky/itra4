import PathBuilder from './components/path-builder.js';
import Axis from './components/axis.js';

import Point from './components/point.js';
import Tooltip from './components/tooltip.js';

import HtmlHelper from '../services/html-helper.js';

export default class LineChart {
    constructor(container, data, width, height) {
        this.width = width;
        this.height = height;
        this.padding = 150;
        this.lineOffset = 5;
        
        this.months = data.map(x => x.month);
        this.values = data.map(x => x.value);

        this.coordinates = this._getPointCoordinates(data);

        this._tooltip = new Tooltip();

        container.append(this._render());
    }

    _render() {
        const dots = this.coordinates.map(data => new Point(data.bind).render(data.x, data.y));

        const html = `
            <svg width="${this.width}" height="${this.height}">
                <path stroke="black" fill="transparent" d=${this._getPath(this.coordinates)} />

                ${this._getYAxis()}
                ${this._getXAxis()}
              
                <g class="dots">
                    ${dots.join('')}
                </g>

                ${this._getXAxisLabels()}

                ${this._tooltip.render('Month', 'Value')}
            </svg>
        `;

        const svg = HtmlHelper.toHtml(html);

        this._bindHover(svg);

        return svg;
    }

    _getPointCoordinates(data) {
        const getX = Axis.buildEnumAxis(this.padding, this.width - this.padding, this.months);

        const maxValue = Math.max(...this.values);
        const getY = Axis.buildAxis(this.padding, this.height - this.padding, 0, maxValue);

        return data.map(x => {
            return {
                x: getX(x.month),
                y: getY(x.value),

                bind: {
                    value: x.value,
                    month: x.month
                }
            }
        });
    }

    _getPath([first, ...others]) {
        const builder = new PathBuilder().moveTo(first.x, first.y);

        return others
            .reduce((builder, {
                x,
                y
            }) => builder.lineTo(x, y), builder)
            .build();
    }

    _bindHover(svg) {
        svg.querySelectorAll('g.dots circle').forEach(point => {
            point.addEventListener('mouseenter', () => {
                this._showTooltip(svg, point);
            });

            point.addEventListener('mouseout', () => {
                this._tooltip.hide(svg);
            });
        });
    }

    _showTooltip(svg, point) {
        this._tooltip.move(svg, point.getAttribute('cx'), point.getAttribute('cy'));

        this._tooltip.setValues(svg, point.getAttribute('month'), point.getAttribute('value'));

        this._tooltip.show(svg);
    }

    _getYAxis() {
        const padding = this.padding;

        const path = new PathBuilder()
            .moveTo(padding, this.height - padding)
            .lineTo(padding, padding)
            .moveTo(padding + 15, padding + 15)
            .lineTo(padding, padding)
            .moveTo(padding - 15, padding + 15)
            .lineTo(padding, padding)
            .build();

        return `<path d=${path} stroke="black" stroke-width="2" />`
    }

    _getXAxis() {
        const padding = this.padding;
        const arrowOffset = 15;

        const endPoint = {
            x: this.width - padding / 2,
            y: this.height - padding
        };

        const path = new PathBuilder()
            .moveTo(padding, this.height - padding)
            .lineTo(endPoint.x, endPoint.y)
            .moveTo(endPoint.x - arrowOffset, endPoint.y - arrowOffset)
            .lineTo(endPoint.x, endPoint.y)
            .moveTo(endPoint.x - arrowOffset, endPoint.y + arrowOffset)
            .lineTo(endPoint.x, endPoint.y)
            .build();

        return `<path d=${path} stroke="black" stroke-width="2" />`
    }

    _getXAxisLabels() {
        const getLabel = (x, y, text) => `<text x="${x}" y="${y}">${text}</text>`;

        const labels = this.months.map((x, i) => getLabel(-15, this.coordinates[i].x - this.padding + 4, x))

        return `
            <g class="x-labels" transform="translate(${this.padding}, ${this.height - this.padding})">
                ${labels.join('')}
            </g>
        `;
    }
}