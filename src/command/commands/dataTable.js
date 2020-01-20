/*
 *
 */
'use strict';

(function(c) {
    const { COMMAND_TYPES, RECORDABLE } = Entry.STATIC;

    c[COMMAND_TYPES.dataTableAddSource] = {
        do(table) {
            const { dataTable } = Entry.playground;
            if (dataTable) {
                dataTable.tables.unshift(table);
                Entry.playground.reloadPlayground();
                Entry.playground.refreshPlayground();
            }
        },
        state(table) {
            return [table];
        },
        log(table) {
            return [['table', table]];
        },
        recordable: RECORDABLE.SUPPORT,
        validate: false,
        undo: 'dataTableRemoveSource',
        dom: ['playground', 'tableAddButton'],
    };

    c[COMMAND_TYPES.dataTableRemoveSource] = {
        do(table = {}) {
            const { dataTable } = Entry.playground;
            const index = dataTable.getIndex(table);
            if (index < 0) {
                console.warn('not found table', table);
                return;
            }
            dataTable.tables.splice(index, 1);
            Entry.playground.reloadPlayground();
            Entry.playground.refreshPlayground();
        },
        state(table) {
            return [table];
        },
        log(table) {
            return [['table', table]];
        },
        recordable: RECORDABLE.SUPPORT,
        validate: false,
        undo: 'dataTableAddSource',
        dom: ['playground', 'tableAddButton'],
    };
})(Entry.Command);
