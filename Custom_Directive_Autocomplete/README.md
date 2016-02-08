# Custom Directive Exercise: Autocomplete

The template for the custom directive is provided in index.html.

Requirements for this exercise are:

* Create custom directive file/function
* Restrict directive to element
* Isolate the scope of the directive via bindToController or scope
* Directive params are at least:
  * searchParam: what the user types in the input box
  * suggestions: the list of options available (this can be hard-coded... for now)
* Suggestions only show up after the user has typed at least two non-whitespace characters
* Suggestions have matching text in bold (hint: custom filter)
* Once a suggestion is selected, the text of the suggestion replaces what was typed so far
* User can navigate through the suggestions with the up and down arrows and select a suggestion with the enter or tab keys
* User can hide suggestion box by clicking away
* Each suggestion is a custom directive that requires your autocomplete directive
* Options are dynamically pulled down from http://omdbapi.com/
