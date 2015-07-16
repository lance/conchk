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
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, { colorize:true, timestamp:true });

    if (options) {
      if (options.silent-console) {
        winston.remove(winston.transports.Console);
      }
      if (options.filename) {
        winston.add(winston.transports.File, { filename: options.filename });
      }
    }
    return winston;
  }
}
