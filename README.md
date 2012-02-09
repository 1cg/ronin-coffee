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

Usage
-----

Once you've installed the filter, you can put CoffeeScript files in your `html/public' folder, and,
when you request them, they will be automatically compiled to Javascript.

So `http://localhost:8080/public/scripts/example.coffee` with this content:

    alert "Yay!" if true

will return this Javascript:

    (function() {
      if (true) alert("Yay!");
    }).call(this);

If you wish to view the raw version of the CoffeeScript, you can append '?raw' to the URL.