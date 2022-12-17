import { Reaction } from '../types';

const reaction: Reaction = {
	name: 'andre',
	trigger: ['andre', 'andré'],
	execute: (message) => {
		message.react('<:smoothbrain:1031934692406083624> ');
	},
};

export default reaction;