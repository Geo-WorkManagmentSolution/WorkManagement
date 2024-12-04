export const countries = [
  {
    name: 'USA',
    states: ['California', 'Texas', 'New York', 'Florida', 'Illinois']
  },
  {
    name: 'India',
    states: ['Gujarat', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi']
  }
];

export const cities = {
  California: ['Los Angeles', 'San Francisco', 'San Diego'],
  Texas: ['Houston', 'Austin', 'Dallas'],
  'New York': ['New York City', 'Buffalo', 'Albany'],
  Florida: ['Miami', 'Orlando', 'Tampa'],
  Illinois: ['Chicago', 'Springfield', 'Peoria'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  Delhi: ['New Delhi', 'Noida', 'Gurgaon']
};

export const getStates = (country: string) => {
  const foundCountry = countries.find(c => c.name === country);
  return foundCountry ? foundCountry.states : [];
};

export const getCities = (state: string) => {
  return cities[state] || [];
};
