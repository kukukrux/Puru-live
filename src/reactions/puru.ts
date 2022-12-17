import { Reaction } from '../types';

const reaction: Reaction = {
	name: 'puru',
	trigger: ['puru'],
	execute: (message) => {
		message.react('<:blush:955914251447468032> ');
	},
};

export default reaction;