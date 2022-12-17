import { Reaction } from '../types';
import { getRandomLine } from '../functions';

const reaction: Reaction = {
	name: 'quran',
	trigger: ['quran', 'mashallah', 'allah', 'wallah', 'bismillah'],
	execute: (message) => {
		message.reply(getRandomLine('res/text/quran.txt'));
	},
};

export default reaction;