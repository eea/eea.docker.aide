/*
 * GET home page.
 */

var searchServer = require('eea-searchserver')
var nconf = require('nconf');
var field_base = nconf.get("elastic:field_base");
var layout_vars = nconf.get("layout_vars");

if (typeof layout_vars === 'undefined') {
  layout_vars = {}
}

exports.index = searchServer.builtinRoutes.index

exports.details = function(req, res, id_name){
  if (req.query[id_name] === undefined){
      res.send(id_name + ' is missing');
      return;
  }
  var host = "http://localhost:" + nconf.get('http:port');

  var query = '{"query":{"ids":{"values":["' + req.query[id_name] + '"]}}}';
  query = encodeURIComponent(query);
  var options = {
    host: host + "/api",
    path: "?source="+ query,
    layout_vars: layout_vars,
  };

  searchServer.EEAFacetFramework.renderDetails({
    req:req,
    res:res,
    field_base:field_base,
    options:options,
    prerender:function(tmp_options){
        var shorttitle_link = encodeURIComponent(tmp_options.raw_data.hits.hits[0]._source.statsURI);
        tmp_options.data['_shorttitle'] = {label:'_shorttitle', value : req.query[id_name], link : shorttitle_link}
        return(tmp_options);
    },
    error_fallback:function(tmp_options){
        tmp_options[id_name] = req.query[id_name];
        return(tmp_options);
    }
  });
};
