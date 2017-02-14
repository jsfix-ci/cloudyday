#!/usr/bin/env node
const colors = require('colors/safe');
const copydir = require('copy-dir');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const {
	exec,
	spawn
} = require('child_process');

const PROCESS_ARGS = process.argv;
const CLOUDY_DAY_SOURCE = path.join(__dirname, '../');
const CURRENT_DIRECTORY = process.cwd();
const INPUT_CONSENT = 'consent';
const INPUT_DIRNAME = 'dirname';
const DESCRIPTION_CONSENT = `Initialize CloudyDay React/Express seeder in ${CURRENT_DIRECTORY}?\n`;
const DESCRIPTION_DIRNAME = 'Name of project to create?\n';
const DEFAULT_CONSENT = 'Y/n';
const DEFAULT_DIRNAME = 'New Folder';

prompt.message = colors.rainbow('cloudday');
prompt.delimiter = '||';

prompt.get([{
	name: INPUT_CONSENT,
	description: DESCRIPTION_CONSENT,
	default: DEFAULT_CONSENT,
	message: 'Please enter either `yes` or `no` (`y`/`n`)',
	conform: function(value) {
		if(typeof value === 'undefined') {
			return true;
		} else if(value === DEFAULT_CONSENT) {
			return true;
		} else if(typeof value === 'string') {
			const normalisedValue = value.toLowerCase();
			switch(normalisedValue) {
				case 'yes': case 'y': case 'yupp': case 'yea': case 'yeah': case 'yy': case 'yyy':
					return true;
				case 'no': case 'n': case 'nope': case 'nop': case 'nah': case 'nn': case 'nnn':
					process.exit(1);
				default:
					return false;
			}
		} else {
			return false;
		}
	}
}, {
	name: INPUT_DIRNAME,
	description: DESCRIPTION_DIRNAME,
	default: DEFAULT_DIRNAME
}
], function(err, res) {
	const DIRNAME = path.join(CURRENT_DIRECTORY, `/${res[INPUT_DIRNAME]}`);
	const CONSENT = res[INPUT_CONSENT];
	try {
		if(fs.lstatSync(DIRNAME).isDirectory()) {
			console.error(colors.red(`Directroy already exists at ${DIRNAME}`));
		} else {
			console.error(colors.red(`File already exists at ${DIRNAME}`));
		}
	} catch(ex) {
		// fs.mkdirSync(DIRNAME);
		const GIT_IGNORE = [
			'.git',
			'node_modules',
			'bower_components'
		];
		copydir(CLOUDY_DAY_SOURCE, DIRNAME, function(stat, filepath, filename) {
			return (GIT_IGNORE.findIndex(fn => filename === fn) === -1);
		}, function(err) {
			if(err) {

			} else {
				const binFolder = path.join(DIRNAME, '/.bin');
				const binFiles = fs.readdirSync(binFolder);
				binFiles.forEach(executableFile => {
					if(executableFile.indexOf('.') === -1) {
						fs.chmodSync(path.join(binFolder, `/${executableFile}`), '750');
					}
				});
				const initialisationProcess = spawn(path.join(DIRNAME, '/.bin/update'), [], {
					cwd: DIRNAME,
					stdio: 'inherit'
				});
				initialisationProcess.on('close', code => {
					if(code === 0) {
						const projectSetupProcess = spawn('npm', ['run', 'init'], {
							cwd: DIRNAME,
							stdio: 'inherit'
						});
						projectSetupProcess.on('close', code => {
							if(code === 0) {
								console.info(colors.green('DONE'));
							} else {
								console.error(colors.red(`CloudyDay project initialisation FAILED with status code ${code}`));
							}
							process.exit(code);
						});
					} else {
						console.error(colors.red(`CloudyDay dependency updating FAILED with status code ${code}`));
					}
				});
			}
		});
	}
});
