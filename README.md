Sign in with Tent
=================

*Sign in with Tent* is a Browser extension (currently, Chrome only) to simplify signing in to Tent apps.

It stores the user's Tent entity URI and provides a standardized way for Tent apps to query this information from the users's browser, and for Tent providers to store the user's entity URI within their browser.

How it works
------------
For logging in to a 'Sign in with Tent'-enabled site:

1. The user visits a potential Tent app's web site
2. The user clicks on "Sign in with Tent" or a similar button
3. The browser starts a [WebIntent](http://webintents.org/) activity indicating that the user wants to sign in using Tent
4. A browser extension that the user installed (provided here) captures the WebIntent
5. After confirmation, the web site is given the user's entity URI.

After that, authentication proceeds as usual.

First-time setup:

1. The user clicks on a "Use this server for signing in" button on their Tent server provider's web site
2. The browser starts a [WebIntent](http://webintents.org/) activity indicating that the user wants to update their Tent entity
3. A browser extension that the user installed (provided here) captures the WebIntent
4. After confirmation, the given entity URI is stored by the extension.

Technicalities
--------------
These WebIntent `action`s are used:

    https://tent.io/jonasschneider/sign-in-with-tent/register
    https://tent.io/jonasschneider/sign-in-with-tent/authenticate

They each use a `type` of "v1" (not sure whether this is good. spec recommends MIME types, but they don't make much sense here).

Tent guys, please notify me if you are upset by me using the `tent.io` domain.

Future
------
Note that this extension currently only spares the user from entering their Tent entity URI. No other actions, such as automatic OAuth authentication with the user's tent server, is currently implemented.

In the future, it might be possible to integrate the OAuth flow into the WebIntent activity. This would make the first time signing in much more seamless.


Legal
-----
Copyright 2013 Jonas Schneider. Released under the MIT license. No warranties, etc.