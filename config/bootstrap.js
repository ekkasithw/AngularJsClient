/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var moment = require('moment');

module.exports.bootstrap = function(cb) {

  var towns = [
    {
      name: 'Tokyo'
    },
    {
      name: 'Osaka'
    }
  ];

  var day = new moment('2016-01-30');
  var totalDays = 7;

  var days = [];
  for (i = 0; i < totalDays + 1; i++) {
    days.push({day: day.unix()});
    day.add(1, 'days');
  }

  Town.create(towns)
    .then(function(theseTowns) {
      return [theseTowns, Day.create(days)];
    })
    .spread(function(theseTowns, theseDays) {
      var ids = [];
      theseDays.forEach(function(thisDay) {
        ids.push(thisDay.id);
      });

      theseTowns.forEach(function(thisTown) {
        thisTown.days.add(ids);
        thisTown.save();
      });
    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
