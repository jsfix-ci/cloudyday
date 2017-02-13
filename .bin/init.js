const Case = require('case');
const colors = require('colors/safe');
const fs = require('fs');
const npmValidate = require('validate-npm-package-name');
const path = require('path');
const prompt = require('prompt');
const {spawn} = require('child_process');

const DISPLAY_NAME = 'display name';
const PROJECT_NAME = 'project name';
const PROJECT_VERSION = 'project version';
const DESCRIPTION = 'description';
const AUTHOR_NAME = 'author name';
const AUTHOR_EMAIL = 'author email';
const REPO_URL = 'repository url';
const PROJECT_PATH = process.cwd();
const PROJECT_FOLDER_NAME = PROJECT_PATH.substr(PROJECT_PATH.lastIndexOf('/') + 1);
const DEFAULT_DISPLAY_NAME = Case.capital(PROJECT_FOLDER_NAME);
const DEFAULT_PROJECT_NAME = Case.kebab(PROJECT_FOLDER_NAME);
const DEFAULT_PROJECT_VERSION = '1.0.0';
const DEFAULT_DESCRIPTION = 'A fresh project, destined to be incomplete.';
const DEFAULT_AUTHOR_NAME = process.env.USER || process.env.LOGNAME || 'Me';
const DEFAULT_AUTHOR_EMAIL = 'nobody@vo.id';
const DEFAULT_REPO_URL = 'git@vo.id/nothing-here';

prompt.message = colors.rainbow('cloudyday');
prompt.delimiter = colors.grey('||');
prompt.start();
prompt.get([
	{
		name: PROJECT_VERSION,
		description: colors.green('version?\n'),
		default: DEFAULT_PROJECT_VERSION,
		message: 'Invalid version number (validating RegEx: /^([\d].)*[\d]$/)',
		pattern: /^([\d].)*[\d]$/
	},
	{
		name: DISPLAY_NAME,
		description: colors.green('display name?\n'),
		type: 'string',
		required: true,
		default: DEFAULT_DISPLAY_NAME
	},
	{
		name: PROJECT_NAME,
		description: colors.green('project name?\n'),
		default: DEFAULT_PROJECT_NAME,
		message: 'Package name is invalid',
		conform: (value) => {
			return npmValidate(value).validForNewPackages
		}
	},
	{
		name: DESCRIPTION,
		description: colors.green('project description?\n'),
		default: DEFAULT_DESCRIPTION
	},
	{
		name: AUTHOR_NAME,
		description: colors.green('name of author?\n'),
		default: DEFAULT_AUTHOR_NAME
	},
	{
		name: AUTHOR_EMAIL,
		description: colors.green('author\'s email?\n'),
		default: DEFAULT_AUTHOR_EMAIL
	},
	{
		name: REPO_URL,
		description: colors.green('repository url?\n'),
		default: DEFAULT_REPO_URL
	}
], function(err, res) {
	const bowerPackageInformation = require('../bower.json');
	const npmPackageInformation = require('../package.json');
	npmPackageInformation.name = res[PROJECT_NAME];
	npmPackageInformation.displayName = res[DISPLAY_NAME];
	npmPackageInformation.description = res[DESCRIPTION];
	npmPackageInformation.author = `${res[AUTHOR_NAME]} <${AUTHOR_EMAIL}>`;
	npmPackageInformation.contributors[0].name = res[AUTHOR_NAME];
	npmPackageInformation.contributors[0].email = res[AUTHOR_EMAIL];
	npmPackageInformation.repository.url = res[REPO_URL];
	npmPackageInformation.version = res[PROJECT_VERSION];

	bowerPackageInformation.name = res[PROJECT_NAME];
	bowerPackageInformation.description = res[DESCRIPTION];
	bowerPackageInformation.authors = [`${res[AUTHOR_NAME]} <${AUTHOR_EMAIL}>`];
	bowerPackageInformation.homepage = '';
	bowerPackageInformation.version = res[PROJECT_VERSION];
	fs.writeFileSync(path.join(PROJECT_PATH, './package.json'), JSON.stringify(npmPackageInformation, {}, '  '));
	fs.writeFileSync(path.join(PROJECT_PATH, './bower.json'), JSON.stringify(bowerPackageInformation, {}, '  '));

	const git = {
		backup: function(callback) {
			process.stdout.write('Creating a backup of the .git directory...');
			git.checkIfRepoExists(repositoryExists => {
				console.log('repo exists', repositoryExists);
				const backupGitRepo = spawn('cp', ['-R', '.git', '.git.archive']);
				backupGitRepo.stderr.on('data', data => {
					// console.log(data.toString());
				});
				backupGitRepo.on('close', code => {
					if(code === 0) {
						console.info(colors.green(' DONE'));
						callback();
					} else if(!repositoryExists) {
						console.info(colors.green(' DONE'), '(None found, creating one)');
						callback();
					} else {
						console.error(colors.red(' FAILED'));
						console.info(colors.red('Refusing to proceed because your Git repository could not be backed up.'));
					}
				});
			});
			
		},
		backupRestore: function() {
			process.stdout.write('Perceived error occurred, restoring back-ed up Git repository information...');
			git.checkIfRepoExists(exists => {
				const gitCleanse = spawn('rm', ['-rf', '.git']);
				gitCleanse.stderr.on('data', data => {
					console.log(data.toString());
				});
				gitCleanse.on('close', code => {
					const restoreGitRepo = spawn('mv', ['.git.archived', '.git']);
					restoreGitRepo.stderr.on('data', data => {
						console.log(data.toString());
					});
					restoreGitRepo.on('close', code => {
						console.info(colors.green(' DONE'));
					});
				});
			});
		},
		checkIfRepoExists: function(callback) {
			process.stdout.write('Checking if current folder is a .git repository...');
			const checkIfGitRepoExists = spawn('ls', ['.git']);
			checkIfGitRepoExists.on('close', code => {
				console.info(colors[(code === 0) ? 'green' : 'red']((code === 0) ? ' EXISTS' : ' NOPE, NOT THERE'));
				callback(code === 0);
			});
		},
		commitInitial: function(callback) {
			process.stdout.write('Creating initial commit...');
			const gitInitialCommit = spawn('git', ['commit', '-m', 'Initial commit']);
			gitInitialCommit.stdout.on('data', data => { });
			gitInitialCommit.stderr.on('data', data => { });
			gitInitialCommit.on('close', code => {
				if(code === 0) {
					console.info(colors.green(' DONE'));
					callback();
				} else {
					console.error(colors.red(' FAILED'));
					git.backupRestore();
				}
			});
		},
		destroy: function(callback) {
			process.stdout.write('Removing current .git directory...');
			const gitCleanse = spawn('rm', ['-rf', '.git']);
			gitCleanse.stderr.on('data', data => {
				console.error(colors.red(data.toString()));
			});
			gitCleanse.on('close', code => {
					if(code === 0) {
						console.info(colors.green(' DONE'));
						callback();
					} else {
						console.error(colors.red(' FAILED'));
						console.info(colors.red('Refusing to proceed because your Git repository could not be deleted.'));
					}
			});
		},
		destroyBackup: function(callback) {
			process.stdout.write('Removing archived .git.archive directory...');
			const gitCleanse = spawn('rm', ['-rf', '.git.archive']);
			gitCleanse.stderr.on('data', data => {
				console.error(colors.red(data.toString()));
			});
			gitCleanse.on('close', code => {
					if(code === 0) {
						console.info(colors.green(' DONE'));
						callback();
					} else {
						console.error(colors.red(' FAILED'));
						console.info(colors.red('Unable to remove the generated .git.archive Git archive, please do so yourself.'));
					}
			});
		},
		initialize: function(callback) {
			process.stdout.write('Initialising a new Git repository...');
			const gitInit = spawn('git', ['init']);
			gitInit.stderr.on('data', data => {
				console.error(colors.red(data.toString()));
			});
			gitInit.on('close', code => {
				if(code === 0) {
					console.info(colors.green(' DONE'));
					callback();
				} else {
					console.error(colors.red(' FAILED'));
					git.backupRestore();
				}
			});
		},
		remoteAdd: function(callback) {
			process.stdout.write('Adding the `origin` remote...');
			const gitAddRemote = spawn('git', ['remote', 'add', 'origin', npmPackageInformation.repository.url]);
			gitAddRemote.stderr.on('data', data => {
				console.error(colors.red(data.toString()));
			});
			gitAddRemote.on('close', code => {
				if(code === 0) {
					console.info(colors.green(' DONE'));
					callback();
				} else {
					console.error(colors.red(' FAILED'));
					git.backupRestore();
				}
			});
		},
		stageInitial: function(callback) {
			process.stdout.write('Staging files...');
			const gitInitialStage = spawn('git', ['add', '.']);
			gitInitialStage.stderr.on('data', data => {
				console.error(colors.red(data.toString()));
			});
			gitInitialStage.on('close', code => {
				if(code === 0) {
					console.info(colors.green(' DONE'));
					callback();
				} else {
					console.error(colors.red(' FAILED'));
					git.backupRestore();
				}
			});
		}
	};
	git.backup(() => {
		git.destroy(() => {
			git.initialize(() => {
				git.remoteAdd(() => {
					git.stageInitial(() => {
						git.commitInitial(() => {
							console.info('Exiting with status 0');
							process.exit(0);
						});
					});
				});
			});
		});
	});
});