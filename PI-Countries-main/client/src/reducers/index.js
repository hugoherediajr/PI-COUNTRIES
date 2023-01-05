const initialState = {
  countries: [], //este array se va a ir modificando según los filtros que aplique en el front
  allCountries: [], //en este array voy a tener siempre TODOS los paises
  countryDetail: {}, // en este array voy a alojar el detail de cada country clickleado
  activities: [], // array de la BD de Activity
  countriesBackup:[], //array conjuncion de filtros 
}
//function reducer(state = initialState, { type, payload })
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
        countriesBackup: action.payload,
      }
    case 'GET_COUNTRIES_BY_NAME':
      return {
        ...state,
        countries: action.payload,
      }
    case 'FILTER_BY_CONTINENT':
        const countries = state.allCountries;
        const continentFilter =
          action.payload === "All Continent"
            ? countries
            : countries.filter((el) => el.continent === action.payload);
  
        return {
          ...state,
          countries: continentFilter,
          countriesBackup: continentFilter,
        };

      // const filteredByCntnt =
      //   action.payload === 'All'
      //     ? state.allCountries
      //     : state.allCountries.filter((c) => c.continent === action.payload)
      // return {
      //   ...state,
      //   countries: filteredByCntnt,
      // }
    // case 'FILTER_BY_ACTIVITY':
    //   const filtered =
    //     action.payload === 'All'
    //       ? state.allCountries
    //       : state.allCountries.filter(
    //           (c) =>
    //             c.activities &&
    //             c.activities.filter((act) => act.season === action.payload)
    //               .length
    //         )
      // return {
      //   ...state,
      //   countries: filtered,
      // }
    case 'FILTER_BY_ACTIVITY_NAME':
      // const filteredByName =
      //   action.payload === 'All'
      //     ? state.allCountries
      //     : state.allCountries.filter(
      //         (c) =>
      //           c.activities &&
      //           c.activities.filter((act) => act.name === action.payload).length
      //       )
      // return {
      //   ...state,
      //   countries: filteredByName,
      // }
      //case "FILTER_BY_ACTIVITIES":
        const allCountriesActiv = state.countriesBackup;
  
        const activFilter =
          action.payload === "All Activities"
            ? allCountriesActiv.filter((all) => all.activities.length > 0)
            : allCountriesActiv.filter(
                (el) =>
                  el.activities &&
                  el.activities.map((fil) => fil.name).includes(action.payload)
              );
  
        return {
          ...state,
          allCountries: activFilter,
          countries: activFilter,
        };





      case 'SORT':
      var sorted
      if (action.payload.length === 2) {
        sorted =
          action.payload === 'AZ'
            ? state.countries.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
              })
            : state.countries.sort((a, b) => {
                if (a.name > b.name) return -1
                if (a.name < b.name) return 1
                return 0
              })
      } else {
        sorted =
          action.payload === 'populationAsc'
            ? state.countries.sort((a, b) => a.population - b.population)
            : state.countries.sort((a, b) => b.population - a.population)
      }
      return {
        ...state,
        countries: sorted,
      }
    case 'CREATE_ACTIVITY':
      return {
        ...state,
      }
    case 'GET_COUNTRY_DETAILS':
      return {
        ...state,
        countryDetail: action.payload,
      }
    //  "GET_ACTIVITIES"
    case "GET_ACTIVITIES": //ok
      return {
        ...state,
        activities: action.payload,
      };

      

    
    default:
      return state
  }
}

export default rootReducer
