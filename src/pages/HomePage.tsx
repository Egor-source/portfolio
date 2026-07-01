import Greetings from '../components/home/Greetings.tsx'
import StatsBar from '../components/home/StatsBar.tsx'

const HomePage = () => {
  return (
    <section className="w-full h-full px-6 flex justify-center flex-1">
      <div className="flex max-w-7xl  flex-col justify-between gap-5">
        <Greetings />
        <StatsBar />
      </div>
    </section>
  )
}

export default HomePage
