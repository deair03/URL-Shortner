import ShortenedUrl from "../components/ShortenedUrl";

function Analytics(){
    
    return(
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8">
            <div className="space-y-4">
              <ShortenedUrl />
            </div>
          </div>
        </div>
      </div>  
    )
}

export default Analytics;