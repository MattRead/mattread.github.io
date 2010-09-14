---
layout:     post
title:      Ephyboy, The Epiphany Tomboy Extension
date:       Sep 10, 2010
category:   notes
tag:        ephyboy
---

Back in the day when I used to use [Firefox][], I fell in love with the [Tomfox extension][]. It
allowed you to create a new [Tomboy][] note using the currently selected text of the webpage you
were browsing, using the title for the title of the note and referencing the url as the source. This
was great for me to document all the code and Linux commands I'd find scattered around the net.

Eventually, though, I got tired of Firefox, especially it's load times, and switched to
[Chromium][]. You guessed it, Chromium sucked too. So back to [Epiphany][] I went, and with the
2.30 version it is really quite a nice little browser.

Epiphany extensions are now done with [Seed][], the GTK javascript bindings, making it really
easy to write new extensions. Plus, it has almost a complete GTK implementation via GObject
Introspection. So getting my tomboy note maker dohicky back was really not that hard -- aside from
the lack of documentation. And thus, [Ephyboy][] is born; It's really quite simple:

 1. [Download][] the tarball, or zip.
 2. [Install][] the extension.
 3. Enable the extension (*no restart required!*).
 4. Select some text to add in your note.
 5. Hit `CTRL+Shift+B`; Or, add the Tomboy Note button to the toolbar and click the button.

The extension will then create your note and open your note in [Tomboy][] for review and/or further
editing.

There is one thing to note. The extension works by making a DBus call to Tomboy to create the note
so you have to have Tomboy open and connected to the bus for this to work. Usually not a problem
as I have Tomboy start on log in.

[Firefox]:http://getfirefox.com
[Tomboy]:http://projects.gnome.org/tomboy/
[Chromium]:http://www.chromium.org/
[Tomfox extension]:https://addons.mozilla.org/en-US/firefox/addon/8276/
[Epiphany]:http://projects.gnome.org/epiphany/
[Seed]:http://live.gnome.org/Seed
[Ephyboy]:http://github.com/MattRead/Ephyboy
[Download]:http://github.com/MattRead/Ephyboy/downloads
[Install]:http://github.com/MattRead/Ephyboy/wiki
