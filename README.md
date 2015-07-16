# Conchk

A simple internet connection checker. I use this to log the status of my
internet connection once per second, if I am having intermittent issues that
are hard to diagnose. This is a good way to show Charter that the problem
is theirs.

    // Usage example. By default Check will log to the console, but not a file.
    var Check = require('conchk'),
      options = { silent-console: true, filename: 'output.log'},
      checker = Check('google.com', 80, options);

    setInterval(checker, 1000);
