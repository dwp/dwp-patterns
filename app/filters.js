var nunjucks = require('nunjucks'),
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
   * uses marked library to convert passed value from markdown to HTML
   * @method markdown
   * @param  {String} value     the block/string to be converted from markdown
   * @param  {Boolean} stripPara flag to strip blank paragraphs
   * @return {String}           converted string of markup
   */
  filters.markdown = function markdown(value, stripPara) {
    var result;
    stripPara = stripPara !== false;
    try {
      result = marked(value,{ gfm: false, tables: true, breaks: true, pedantic: true, sanitize: true, smartLists: true, smartypants: true}).trim();
      if (stripPara) { result = result.replace(/^<p>|<\/p>$/g, ''); }
      return nunjucksSafe(result);
    } catch (e) {
      console.error('Error processing markdown:', e);
      return value;
    }
  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;

};
