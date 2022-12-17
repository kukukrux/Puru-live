import { Reaction } from '../types';

const reaction: Reaction = {
	name: 'vallah',
	trigger: ['vallah'],
	execute: (message) => {
		message.reply('nein, wallah');
	},
};

export default reaction;