(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const events = require('../routes/events');
    const event_types = require('../routes/event_types');
    const calendar = require('../routes/calendar');
    const login = require('../routes/login');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/events', events);
    app.use('/event_types', event_types);
    app.use('/calendar', calendar);
    app.use('/login', login)

  };

})(module.exports);
