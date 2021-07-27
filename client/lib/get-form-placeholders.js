import parseRoute from './parse-route';

function getGardenFormPlaceHolders(location, state) {
  const route = parseRoute(location);

  if (route.path === 'plants') {
    return {
      soil: 'Select soil quality',
      sun: 'Select sun exposure',
      size: 'eg. 3ft x 6ft',
      notes: ''
    };
  }
}

export default getGardenFormPlaceHolders;
