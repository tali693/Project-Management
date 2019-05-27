$(function () {
    $('table').tablesorter({

        // *** APPEARANCE ***
        theme: 'bootstrap',
        widthFixed: false,
        showProcessing: false,
        headerTemplate: '{content}',
        onRenderTemplate: null,
        onRenderHeader: function (index) {
            $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
        },

        // *** FUNCTIONALITY ***
        cancelSelection: true,
        dateFormat: "mmddyyyy",
        sortMultiSortKey: "shiftKey",
        sortResetKey: 'ctrlKey',
        usNumberFormat: true,
        delayInit: false,
        serverSideSorting: false,

        // *** SORT OPTIONS ***
        headers: {
            // set "sorter : false" (no quotes) to disable the column
            0: {
                sorter: "text"
            },
            1: {
                sorter: "digit"
            },
            2: {
                sorter: "text"
            },
            3: {
                sorter: "url"
            }
        },

        ignoreCase: true,
        sortForce: null,
        sortList: [
            [0, 0],
            [1, 0],
            [2, 0]
        ],
        sortAppend: null,
        sortInitialOrder: "asc",
        sortLocaleCompare: false,
        sortReset: false,
        sortRestart: false,
        emptyTo: "bottom",
        stringTo: "max",

        textExtraction: {
            0: function (node) {
                return $(node).text();
            },
            1: function (node) {
                return $(node).text();
            }
        },

        // use custom text sorter
        //function(a,b){ return a.sort(b); }, // basic sort////////////////////
        textSorter: null,

        // *** WIDGETS ***

        // apply widgets on tablesorter initialization
        initWidgets: true,

        // include zebra and any other widgets, options:
        // 'columns', 'filter', 'stickyHeaders' & 'resizable'
        // 'uitheme' is another widget, but requires loading
        // a different skin and a jQuery UI theme.
        widgets: ['zebra', 'columns'],

        widgetOptions: {

            // zebra widget: adding zebra striping, using content and
            // default styles - the ui css removes the background
            // from default even and odd class names included for this
            // demo to allow switching themes
            // [ "even", "odd" ]
            zebra: [
                "ui-widget-content even",
                "ui-state-default odd"],

            // uitheme widget: * Updated! in tablesorter v2.4 **
            // Instead of the array of icon class names, this option now
            // contains the name of the theme. Currently jQuery UI ("jui")
            // and Bootstrap ("bootstrap") themes are supported. To modify
            // the class names used, extend from the themes variable
            // look for the "$.extend($.tablesorter.themes.jui" code below
            uitheme: 'jui',

            // columns widget: change the default column class names
            // primary is the 1st column sorted, secondary is the 2nd, etc
            columns: [
                "primary",
                "secondary",
                "tertiary"],

            // columns widget: If true, the class names from the columns
            // option will also be added to the table tfoot.
            columns_tfoot: true,

            // columns widget: If true, the class names from the columns
            // option will also be added to the table thead.
            columns_thead: true,

            // filter widget: If there are child rows in the table (rows with
            // class name from "cssChildRow" option) and this option is true
            // and a match is found anywhere in the child row, then it will make
            // that row visible; default is false
            filter_childRows: false,

            // filter widget: If true, a filter will be added to the top of
            // each table column.
            filter_columnFilters: true,

            // filter widget: css class applied to the table row containing the
            // filters & the inputs within that row
            filter_cssFilter: "tablesorter-filter",

            // filter widget: Customize the filter widget by adding a select
            // dropdown with content, custom options or custom filter functions
            // see http://goo.gl/HQQLW for more details
            filter_functions: null,

            // filter widget: Set this option to true to hide the filter row
            // initially. The rows is revealed by hovering over the filter
            // row or giving any filter input/select focus.
            filter_hideFilters: false,

            // filter widget: Set this option to false to keep the searches
            // case sensitive
            filter_ignoreCase: true,

            // filter widget: jQuery selector string of an element used to
            // reset the filters.
            filter_reset: null,

            // Delay in milliseconds before the filter widget starts searching;
            // This option prevents searching for every character while typing
            // and should make searching large tables faster.
            filter_searchDelay: 300,

            // Set this option to true if filtering is performed on the server-side.
            filter_serversideFiltering: false,

            // filter widget: Set this option to true to use the filter to find
            // text from the start of the column. So typing in "a" will find
            // "albert" but not "frank", both have a's; default is false
            filter_startsWith: false,

            // filter widget: If true, ALL filter searches will only use parsed
            // data. To only use parsed data in specific columns, set this option
            // to false and add class name "filter-parsed" to the header
            filter_useParsedData: false,

            // Resizable widget: If this option is set to false, resized column
            // widths will not be saved. Previous saved values will be restored
            // on page reload
            resizable: true,

            // saveSort widget: If this option is set to false, new sorts will
            // not be saved. Any previous saved sort will be restored on page
            // reload.
            saveSort: true,

            // stickyHeaders widget: css class name applied to the sticky header
            stickyHeaders: "tablesorter-stickyHeader"

        },

        // *** CALLBACKS ***
        // function called after tablesorter has completed initialization
        initialized: function (table) { },

        // *** CSS CLASS NAMES ***
        tableClass: 'tablesorter',
        cssAsc: "tablesorter-headerSortUp",
        cssDesc: "tablesorter-headerSortDown",
        cssHeader: "tablesorter-header",
        cssHeaderRow: "tablesorter-headerRow",
        cssIcon: "tablesorter-icon",
        cssChildRow: "tablesorter-childRow",
        cssInfoBlock: "tablesorter-infoOnly",
        cssProcessing: "tablesorter-processing",

        // *** SELECTORS ***
        // jQuery selectors used to find the header cells.
        selectorHeaders: '> thead th, > thead td',

        // jQuery selector of content within selectorHeaders
        // that is clickable to trigger a sort.
        selectorSort: "th, td",

        // rows with this class name will be removed automatically
        // before updating the table cache - used by "update",
        // "addRows" and "appendCache"
        selectorRemove: "tr.remove-me",

        // *** DEBUGING ***
        // send messages to console
        debug: false//////////////////////////

    })
    
});