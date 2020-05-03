import * as sapper from '@sapper/app';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
sapper.start({
	target: document.querySelector('#sapper'),
  hydrate: false
});
