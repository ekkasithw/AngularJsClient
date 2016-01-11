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

  return cb();

  var towns = [
    {
      name: 'Tokyo'
    },
    {
      name: 'Osaka'
    }
  ];


  var days = {
    Tokyo: [
      {
        day: '2016-01-31'
      },
      {
        day: '2016-02-01'
      },
      {
        day: '2016-02-02'
      },
      {
        day: '2016-02-06'
      }
    ],
    Osaka: [
      {
        day: '2016-02-03'
      },
      {
        day: '2016-02-04'
      },
      {
        day: '2016-02-05'
      }
    ]
  };

  Town.create(towns)
    .then(function(theseTowns) {
      var promises = [theseTowns];

      theseTowns.forEach(function(thisTown, index) {
        var promise = Day.create(days[thisTown.name]);
        promises.push(promise);
      });

      return promises;
    })
    .spread(function() {
      var args = arguments;
      var theseTowns = arguments[0];

      theseTowns.forEach(function(thisTown, index) {
        var ids = [];

        args[index + 1].forEach(function(thisDay) {
          ids.push(thisDay.id);
        });

        thisTown.days.add(ids);
        thisTown.save();
      });
    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
