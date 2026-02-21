import { FileText, Calendar, User, AlertCircle, CheckCircle, Clock, Download, Printer } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function PatientReport() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Your Dental Report
              </h1>
              <p className="text-gray-600">Comprehensive analysis of your dental health</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-600">Report Date</p>
                <p className="font-medium text-gray-900">January 15, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-600">Dentist</p>
                <p className="font-medium text-gray-900">Dr. Rodriguez</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-gray-600">Report ID</p>
                <p className="font-medium text-gray-900">RPT-2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-3">Overall Summary</h2>
          <p className="text-blue-100 mb-4">
            Your recent dental examination revealed 3 findings that require attention. One finding is urgent and needs treatment within the next 2 weeks. The other findings can be monitored during your regular check-ups.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-3xl font-bold mb-1">3</p>
              <p className="text-sm text-blue-100">Total Findings</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-3xl font-bold mb-1">1</p>
              <p className="text-sm text-blue-100">Urgent</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-3xl font-bold mb-1">2</p>
              <p className="text-sm text-blue-100">Monitor</p>
            </div>
          </div>
        </div>

        {/* Findings in Plain Language */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Found</h2>
          
          <div className="space-y-4">
            {/* Finding 1 - Urgent */}
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Small Cavity on Upper Right Molar</h3>
                    <p className="text-sm text-gray-600">Tooth #16 (back tooth, upper right side)</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                  Needs Treatment
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">What does this mean?</p>
                  <p className="text-sm text-gray-600">
                    A small cavity has started forming in one of your back teeth. This is like a small hole in the tooth that can get bigger if not treated.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Why is it urgent?</p>
                  <p className="text-sm text-gray-600">
                    If treated now, we can fix it with a simple filling. Waiting longer means the cavity could grow and cause pain or require more complex treatment.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">What should you do?</p>
                  <p className="text-sm text-gray-600">
                    Schedule a filling appointment within the next 2 weeks. The procedure is quick and will prevent further damage.
                  </p>
                </div>

                <div className="bg-white border border-red-200 rounded-lg p-3 mt-3">
                  <p className="text-sm font-medium text-red-900 mb-1">Next Steps:</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Call to schedule filling appointment</li>
                    <li>• Appointment should be within 2 weeks</li>
                    <li>• Procedure takes about 30-45 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finding 2 - Monitor */}
            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Minor Tooth Wear</h3>
                    <p className="text-sm text-gray-600">Tooth #24 (upper left side)</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 whitespace-nowrap">
                  Monitor
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">What does this mean?</p>
                  <p className="text-sm text-gray-600">
                    There's slight wear on the outer layer (enamel) of one tooth. This is common and often happens naturally over time.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">What should you do?</p>
                  <p className="text-sm text-gray-600">
                    No immediate treatment needed. We'll check it during your regular visits to make sure it's not getting worse. Continue your normal brushing and flossing routine.
                  </p>
                </div>
              </div>
            </div>

            {/* Finding 3 - Monitor */}
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Previous Filling - Looks Good</h3>
                    <p className="text-sm text-gray-600">Tooth #46 (lower right side)</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                  Stable
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Your existing filling appears healthy and intact. No concerns at this time. We'll continue to monitor it during regular check-ups.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Treatment Plan</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-red-700">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Schedule Filling Appointment</h3>
                <p className="text-sm text-gray-600 mb-2">Priority: Urgent - Within 2 weeks</p>
                <p className="text-sm text-gray-700">
                  Treatment for cavity on tooth #16. Simple filling procedure that takes 30-45 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-gray-700">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Follow-up Check-up</h3>
                <p className="text-sm text-gray-600 mb-2">In 6 months</p>
                <p className="text-sm text-gray-700">
                  Regular check-up to monitor tooth wear and verify filling is healing properly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-3">Home Care Instructions</h2>
          <div className="space-y-3 text-sm text-green-50">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-1">Brush twice daily</p>
                <p>Use fluoride toothpaste and brush for 2 minutes each time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-1">Floss daily</p>
                <p>Especially important around tooth #16 where the cavity was detected</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-1">Avoid hard or sticky foods</p>
                <p>Until your filling appointment to prevent the cavity from worsening</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white mb-1">Schedule regular cleanings</p>
                <p>Every 6 months to maintain good oral health</p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-2">Have Questions?</h3>
          <p className="text-sm text-blue-800 mb-4">
            If you have any questions about this report or your treatment plan, please don't hesitate to contact us.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Call Office
            </Button>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
