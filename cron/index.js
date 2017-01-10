const Cron = require('cron');

module.exports = {
	initialize: function() {
		new Cron.CronJob('0 0 * * * *', () => {
			/// runs on start of script
			/// this runs every hour at *:00:00 (0 minutes, 0 seconds)
		}, () => {
			/// runs at end of script
		}, true, 'Asia/Singapore');
	}
};
