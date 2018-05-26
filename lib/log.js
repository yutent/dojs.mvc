/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-25 17:48:17
 *
 */
'use strict'

class Log {
  constructor(file = 'run_time.log', dir) {
    if (!dir) {
      throw new Error(`agument dir must be a string, but ${typeof dir} given.`)
    }

    if (!Util.fs.exists(dir)) {
      Util.fs.mkdir(dir)
    }

    this.file = Util.path.resolve(dir, file)
  }

  error(str) {
    this.save(str, 'error')
  }

  info(str) {
    this.save(str, 'info')
  }

  warn(str) {
    this.save(str, 'warning')
  }

  debug(str) {
    this.save(str, 'debug')
  }

  //写入日志文件
  save(str, type) {
    type = type || 'debug'
    Util.fs.echo(
      `[${type}] ${new Date().format('Y-m-d_H:i:s')} ${str} \n`,
      this.file,
      true
    )
  }
}

module.exports = Log
