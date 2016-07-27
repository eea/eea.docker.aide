function fixQueries(){
    $(".detail_link").each(function(idx, detail_link){
        var href = $(detail_link).attr("href");
        var base = href.split("=")[0];
        var aideid = href.split("=")[1];
        $(detail_link)
            .attr("href", base + "=" + encodeURIComponent(aideid));
    });
}

function viewReady(){
    addHeaders("#facetview_results");
    fixQueries();
    fixDataTitles();
}

jQuery(document).ready(function($) {
    var default_sort = [{}, {}];
    default_sort[0][field_base + 'Namespace'] = {"order": 'asc'};
    default_sort[1][field_base + 'ReportingYear'] = {"order": 'asc'};
    eea_facetview('.facet-view-simple', 
        {
            search_url: './api',
            search_index: 'elasticsearch',
            datatype: 'json',
            initial_search: false,
            enable_rangeselect: true,
            enable_geoselect: true,
            default_sort: default_sort,
            post_init_callback: function() {
              add_EEA_settings();
            },
            post_search_callback: function() {
              add_EEA_settings();
              viewReady();
            },
            paging: {
                from: 0,
                size: 10
            }
        });
});
