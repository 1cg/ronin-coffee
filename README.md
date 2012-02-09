Ronin-Coffee
=============

Ronin-Coffee is a simple plugin for Ronin that will dynamically compile your CoffeeScript files
into Javascript, when requested via HTTP

Installation
------------

Installing Ronin-Coffee is trivial.  In your `RoninConfig` setup, just add this:

    Filters.add( new CoffeeFilter(){ :Cache = m != DEVELOPMENT } )

This will set the filter up to cache the generated Javascript unless the server is in development mode,
in which case it will recompile dynamically on every request.
