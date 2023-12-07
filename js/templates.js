const Templates = {
    gridCell: function (obj) {
        return {
            ...{
                tag: 'button',
                classes: [
                    'gridCell',
                    `bg-${obj.color}`,
                    `border-${obj.borderColor}`,
                    obj.hasDot ? 'hasDot' : null,
                    obj.hasCross ? 'hasCross' : null
                ],
                id: obj.id
            },
            ...(!obj.isEnabled ? { attributes: { 'disabled': true } } : {})
        };
    },
    gridContainer: function (obj) {
        return {
            tag: 'div',
            id: obj.id,
            classes: ['grid-container'],
            children: []
        }
    }
}
module.exports = Templates;