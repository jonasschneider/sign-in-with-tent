Sign in with Tent
=================

**Sign in with Tent** makes it a pleasure to sign in to Tent apps.

It stores the user's Tent entity URI and provides a standardized way for Tent apps to query this information from the users's browser, and for Tent providers to store the user's entity URI within their browser.

Installation
------------

Tent app developers can relax:

1. Add

        <script src="https://raw.github.com/jonasschneider/sign-in-with-tent/master/sign-in-with-tent.js"></script>

   to your page, or better yet, download the file yourself and include it manually.
2. Add the CSS class `sign-in-with-tent` to the input field that asks for the user's entity URI.
3. There is no step 3! Clicking the tent icon will allow users to sign in automatically.

For a comprehensive example, see `examples/automatic.html`

Tent entity providers need a bit more work, because they need to interact with the extension in order to actually register as the user's tent entity. See `examples/manual.html` for reference.

How it works
------------
For signing in to a compatible site:

1. The user visits the app's web site
2. They click on the distinctive Tent icon or a "Sign in with Tent" button
3. A browser extension that the user installed (provided here) captures the WebIntent
4. After confirmation, the web site is given the user's entity URI.

After that, authentication proceeds as usual. Internally, the browser starts a [WebIntent](http://webintents.org/) activity indicating that the user wants to sign in using Tent.

Registering the tent entity provider works similarly:

1. The user clicks on a "Use this server for signing in" button on their Tent server provider's web site
2. The browser starts a [WebIntent](http://webintents.org/) activity indicating that the user wants to update their Tent entity
3. A browser extension that the user installed (provided here) captures the WebIntent
4. After confirmation, the given entity URI is stored by the extension.

Future
------
If WebIntents were more mature, we would not need a browser extension at all; in fact, the problem of finding out the user's Tent server address is actually perfectly solved by the WebIntent spec: identity providers could declare themselves as handlers for the `authenticate` intent with the `<intent>` tag, and apps could call the intent to directly contact the site. This could also vastly improve the user experience of the OAuth flow, since communication with the user's tent server could happen entirely inside the WebIntent dialog.
Sadly, no browser vendors currently implement the new tag. When they start doing that, the world will become a better place.

Technicalities
--------------
These WebIntent `action`s are used:

    https://tent.jonasschneider.com/sign-in-with-tent/register
    https://tent.jonasschneider.com/sign-in-with-tent/authenticate

They each use a `type` of "v1" (not sure whether this is good. spec 'recommends' MIME types, but they don't make much sense here).

Legal
-----
Copyright 2013 Jonas Schneider. Released under the MIT license. No warranties, etc.