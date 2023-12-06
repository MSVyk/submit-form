export const fetchMovies = async () => {
  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          allFilms {
            films {
              title
              director
              releaseDate
              speciesConnection {
                species {
                  name
                  classification
                  homeworld {
                    name
                  }
                }
              }
            }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await response.json();
  return result.data;
};
