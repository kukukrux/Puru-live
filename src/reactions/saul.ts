import { Reaction } from '../types';

const reaction: Reaction = {
	name: 'saul',
	trigger: ['saul'],
	execute: (message) => {
		message.reply({ files: [{ attachment: 'res/img/saul.gif' }] });
	},
};

export default reaction;