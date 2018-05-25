/**
 * 路由
 * @authors yutent (yutent@doui.cc)
 * @date    2015-10-01 19:11:19
 *
 */
'use strict'

module.exports = function(req, res, next) {
  if (!this.modules[req.app]) {
    if (!this.modules.__error__) {
      res.error(`The app [${req.app}] not found`, 404)
    } else {
      res.error(
        this.get('debug')
          ? this.modules.__error__.stack
          : this.modules.__error__,
        500
      )
    }
    return
  }

  try {
    if (req.path.length < 1) {
      req.path.push('index')
    }

    let app = new this.modules[req.app]({ ctx: this, req, res })

    if (this.get('routeMode') === 1) {
      let act = req.path.shift()

      if (app[act + 'Action']) {
        app[act + 'Action'].apply(app, req.path).catch(err => {
          res.error(this.get('debug') ? err.stack || err : err, 500)
        })
      } else {
        res.error(`Action[${act}] not found`, 404)
      }
    } else {
      if (app.indexAction) {
        app.indexAction.apply(app, req.path).catch(err => {
          res.error(this.get('debug') ? err.stack || err : err, 500)
        })
      } else {
        res.error(`Default Action not found`, 404)
      }
    }
  } catch (err) {
    res.error(this.get('debug') ? err.stack || err : err, 500)
  }
}
