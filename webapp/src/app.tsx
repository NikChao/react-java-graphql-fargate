import './app.css'
import {Coffee, useGetCoffeeQuery} from "./gql/generated/graphql.tsx";
import {Spinner} from "./components/spinner/spinner.tsx";

function toTitles(coffee?: (Coffee | null)[] | null) {
    return coffee
        ?.map(coffee => coffee?.title)
        .filter((title): title is string => !!title) ?? [];
}

function App() {
    const { data, loading } = useGetCoffeeQuery();

  const hotCoffee = toTitles(data?.hotCoffee);
  const icedCoffee = toTitles(data?.icedCoffee);

  if (loading || !(hotCoffee.length || icedCoffee.length)) {
      return <Spinner />
  }

  return (
      <div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-left text-2xl'>Some coffees</h2>
          <div className='flex gap-2'>
              <div className='text-left'>
                  <h4 className='text-lg font-bold'>Hot</h4>
                  <div>
                      {hotCoffee.map(title => <p key={title}>{title}</p>)}
                  </div>
              </div>
              <div className='text-left'>
                  <h4 className='text-lg font-bold'>Iced</h4>
                  <div>
                      {icedCoffee.map(title => <p key={title}>{title}</p>)}
                  </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default App
