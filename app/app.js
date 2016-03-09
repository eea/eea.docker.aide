#!/usr/bin/env node

/**
 * Module dependencies.
 */

var path = require('path');
var searchServer = require('eea-searchserver');
var builtinRoutes = require('./routes/aide');
var managementCommands = searchServer.builtinCommands;

options = {
  app_dir: __dirname,
  views: __dirname + '/views',
  settingsFile: __dirname + '/config/settings.json',
  routes: {
    routes: builtinRoutes,
    detailsIdName: 'aideid'
  },
  indexing:{
    managementCommands: managementCommands,
    indexingFilterQuery: 'config/filtersQuery.sparql',
    indexingQuery: 'config/query.sparql',
    extraAnalyzers: 'config/analyzers.json',
    dataMapping: 'config/dataMapping.json',
    endpoint: 'http://cr.eionet.europa.eu/sparql',
  }
}
searchServer.Helpers.SimpleStart(options)

exports.fieldsMapping = function(next){
    next(require(path.join(__dirname, "/config/mapping.json")));
}
