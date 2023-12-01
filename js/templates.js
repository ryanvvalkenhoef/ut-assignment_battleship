const Templates = {
    gridCell: function (obj) {
        return {
            tag: 'button',
            classes: [
                'gridCell',
                `bg-${obj.color}`,
                `border-${obj.borderColor}`,
                obj.hasDot ? 'hasDot' : null,
                obj.hasCross ? 'hasCross' : null
            ],
            attributes: obj.isEnabled,
            id: obj.id
        }
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