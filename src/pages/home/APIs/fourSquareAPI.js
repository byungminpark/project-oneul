/* eslint-disable camelcase */
import axios from 'axios';
import FILTERS from '../constants/FILTERS.json';

const apiUrl = 'https://api.foursquare.com/v2/venues/explore';
const clientId = 'VZ5OEGESS05FTSUEHO32FLTPA41S53MSPA0FPGBDRS0ZBVHT';
const clientSecret = 'DLJOXDSZE0ADYDLTR0DV15NLPPHL2GKLL55VGGYJPGEXAPF0'; // Should not be here...
const noCateIconUrl = 'https://ss3.4sqi.net/img/categories_v2/building/default_64.png';

const fourSquareAPI = {
  offsetGap: 10,
  async fetch(searchTerm, filter, offset) {
    const [location, query] = searchTerm.split(' ');
    const encodedLocation = encodeURIComponent(location);
    const queryArg = query ? `&query=${encodeURIComponent(query)}` : '';
    const filterParam = FILTERS[filter];

    try {
      const urlToFetch = `${apiUrl}?near=${encodedLocation}${queryArg}&${filterParam}=1&offset=${offset}&limit=10&v=20220914&client_id=${clientId}&client_secret=${clientSecret}`;
      const { data: { response: { groups: [ { items } ] } } } = await axios.get(urlToFetch); // prettier-ignore
      return items.map(item => this.formatVenue(item.venue, location));
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) return [];
      return false;
    }
  },

  // HELPER for formatResponse.
  formatVenue(venue, searchTerm) {
    return {
      id: venue.id,
      name: venue.name,
      address: venue.location.address || searchTerm,
      category: venue.categories[0] ? venue.categories[0].name : '미분류',
      iconUrl: venue.categories[0]
        ? `${venue.categories[0].icon.prefix}64${venue.categories[0].icon.suffix}`
        : noCateIconUrl,
    };
  },
};

export default fourSquareAPI;
