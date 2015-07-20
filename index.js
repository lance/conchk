// Usage example. By default Check will log to the console, but not a file.
//
// var Check = require('conchk'),
//     checker = Check('google.com', 80, {silent-console: true, filename: 'conchk.log'});
//
// setInterval(checker, 1000);

module.exports = Check;

function Check(host, port, options) {
  var logger = initLog(options);
  return function() {
    checkConnection(host, port, logger);
  };

  function checkConnection(host, port, logger) {
    var net = require('net'),
        opts = {
          host: host,
          port: port
        };

    var conn = net.connect(opts, function(err, sock) {
      if (err) {
        logger.error('Connection error', err);
      } else {
        logger.info('Connected', opts);
        if (sock) sock.close();
      }
    });

    conn.on('error', function(e) {
      logger.error('Connection error', e);
    });
  }

  function initLog(options) {
    var winston = require('winston');
    var transports = [];

    // add console transport by default
    transports.push(new (winston.transports.Console)({colorize:true, timestamp:true}));

    if (options) {
      if (options.silent-console) {
        // nope - no console
        transports.shift();
      }
      if (options.filename) {
        // also log to a file
        transports.push(new (winston.transports.File)({ filename: options.filename }));
      }
    }

    return new (winston.Logger)({
      transports: transports
    });
  }
}
