import { Client } from 'discord.js';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { logStuff } from '../functions';

module.exports = (client: Client) => {
	const modulesDir = join(__dirname, '../modules');
	logStuff('Loading modules folder...', client, 'info');

	readdirSync(modulesDir).forEach(moduleDir => {
		if (existsSync(`${modulesDir}/${moduleDir}/index.tsx`)) {
			require(`${modulesDir}/${moduleDir}/index.tsx`)(client);
			logStuff(`Succesfully loaded module ${moduleDir}`, client, 'info');
		}
		else if (existsSync(`${modulesDir}/${moduleDir}/index.ts`)) {
			require(`${modulesDir}/${moduleDir}/index.ts`)(client);
			logStuff(`Succesfully loaded module ${moduleDir}`, client, 'info');
		}
		else {
			logStuff(`Could not load module "${moduleDir}, no 'index.ts' or 'index.tsx' was found`, client, 'warn');
		}
	});
	logStuff('Modules folder loaded\n', client, 'info');
};