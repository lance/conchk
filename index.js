var logger = initLog();

setInterval(checker('google.com', 80), 1000);

function checker(host, port) {
  return function() {
    checkConnection(host, port);
  };
}

function checkConnection(host, port) {
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

function initLog() {
  var winston = require('winston');
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, { colorize:true, timestamp:true });
  winston.add(winston.transports.File, { filename: 'conchk.log' });
  return winston;
}
