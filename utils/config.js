import development from './development.json'
import production from './production.json'
import fat from './fat.json'
import pre from './pre.json'

const config = {
  development,
  production,
  fat,
  pre
};

const env = 'production';

const out = {
  ...config[env],
  env
};

export default out;

