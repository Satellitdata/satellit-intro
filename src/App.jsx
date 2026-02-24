import Header from './components/Header'
import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Ecosystem from './components/Ecosystem'
import DatasetCatalog from './components/DatasetCatalog'
import UseCases from './components/UseCases'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen bg-deep font-body">
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Ecosystem />
        <DatasetCatalog />
        <UseCases />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
