
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Common Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Common Footer */}
      <Footer />

    </div>
  )
}

export default MainLayout
