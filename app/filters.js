var _ = require('lodash'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked');

module.exports = function(env) {

  var nunjucksSafe = env.getFilter('safe');
  markdown.register(env, marked);
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {};

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!';
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!';
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */
  
  /**
   * sets globally accessible variable within nunjucks context
   * @method setGlobal
   * @param  {*}  val  the value you want to be global
   * @param  {String}  key  the key/variable name you would like the access the value by
   */
  filters.setGlobal = function setGlobal(val, key) {
    env.addGlobal(key, nunjucksSafe(val));
  }
  
  /**
   * returns a filtered collection where the value of the key is not empty
   * @method filterByEmpty
   * @param  {Array} list the array/object being filtered
   * @param  {String} key  the key being checked is not empty
   * @return {Array}      the filtered collection minus those with empty values in the key provided
   */
  filters.filterByEmpty = function filterByEmpty(collection,key) {
    if (_.isObjectLike(collection)) {
      return _.filter(collection, function(o) { return !_.isEmpty(o[key]); });
    }
  }
  
  /**
   * translate characters in a string
   * @param  {String} s  the string to translate
   * @param  {String} ss the substring to replace
   * @param  {String} r  the replacee string
   * @param  {String} f  regex flags, 'g' by default
   * @return {String}    a translated string
   */
  filters.trC = function trC(s, ss, r, f) {
  	return (s||'').replace(new RegExp(ss, typeof f === 'string' ? f : 'g'), r);
  };
  
  /**
   * deep merge that supports concating arrays & strings.
   * @param  {Object} o1           a plain object to merge
   * @param  {Object} o2           a plain object to merge
   * @param  {Boolean} mergeStrings will merge strings together if true
   * @return {Object}              the resulting merged object
   */
  filters.deeperMerge = function deeperMerge(o1, o2, mergeStrings) {

  	mergeStrings = typeof mergeStrings !== undefined ? mergeStrings : false;

  	// exit conditions
  	if      ( ! o1 && ! o2 )          { return; }
  	else if ( ! _.isPlainObject(o1) ) { return o2; }
  	else if ( ! _.isPlainObject(o2) ) { return o1; }

  	return _
  		.union(Object.keys(o1), Object.keys(o2))
  		.map(function(k) {
  			return [k, (
  				( typeof o1[k] === 'string' && typeof o2[k] === 'string' ) ? ( mergeStrings ? o1[k] + o2[k] : o2[k] ) :
  				( _.isPlainObject(o1[k]) || _.isPlainObject(o2[k]) ) ? deeperMerge(o1[k], o2[k], mergeStrings) :
  				( _.isArray(o1[k]) && _.isArray(o2[k]) ) ? o1[k].concat(o2[k]) :
  				( o1[k] && !o2[k] ) ? o1[k] : o2[k]
  			)];
  		})
  		.reduce(function(a, b) { return (a[b[0]] = b[1], a) }, {});
  };
  
  /**
   * lodash methods exposed as filters
   * see documentation here: https://lodash.com/docs
   */
  filters.unescape = _.unescape;
  filters.filter = _.filter;
  filters.isEmpty = _.isEmpty;
  filters.merge = _.merge;
  
  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;

};