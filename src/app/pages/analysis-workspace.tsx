import { useState } from 'react';
import { useParams } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import UrgencyDashboard from '../components/analysis/urgency-dashboard';
import XRayViewer from '../components/analysis/xray-viewer';
import ToothChart from '../components/analysis/tooth-chart';
import FindingsTab from '../components/analysis/findings-tab';
import ClinicalReportTab from '../components/analysis/clinical-report-tab';
import AIAssistantTab from '../components/analysis/ai-assistant-tab';
import { Button } from '../components/ui/button';
import { ChevronLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AnalysisWorkspace() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [toothChartExpanded, setToothChartExpanded] = useState(false);

  // Mock data - in production this would come from an API
  const caseData = {
    id: caseId,
    patient: 'Patient #1234',
    date: '2026-02-21 09:30',
    urgency: {
      level: 'urgent',
      score: 8.5,
      timeline: 'within 24-48 hours',
      action: 'Schedule immediate appointment',
      summary: 'Multiple urgent findings detected requiring prompt attention',
      priorityFindings: [
        'Periapical lesion on tooth #19',
        'Large carious lesion on tooth #30',
      ],
      recommendation: 'Contact patient immediately for emergency appointment',
    },
    findings: [
      {
        id: 1,
        condition: 'Periapical Lesion',
        tooth: '#19',
        urgency: 'urgent',
        confidence: 95,
        modality: 'Periapical',
        timeline: 'Within 24-48 hours',
        action: 'Endodontic evaluation required',
        position: { x: 45, y: 60, width: 8, height: 10 },
      },
      {
        id: 2,
        condition: 'Large Carious Lesion',
        tooth: '#30',
        urgency: 'urgent',
        confidence: 92,
        modality: 'Bitewing',
        timeline: 'Within 1 week',
        action: 'Restorative treatment needed',
        position: { x: 72, y: 55, width: 6, height: 8 },
      },
      {
        id: 3,
        condition: 'Early Caries',
        tooth: '#14',
        urgency: 'routine',
        confidence: 88,
        modality: 'Bitewing',
        timeline: 'Next routine visit',
        action: 'Monitor and consider preventive treatment',
        position: { x: 28, y: 48, width: 5, height: 6 },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-16 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{caseData.patient}</h1>
              <p className="text-sm text-gray-600">{caseData.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/report/${caseId}`)}>
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Report</span>
            </Button>
            <Button onClick={() => navigate(`/findings/${caseId}`)}>
              Review Findings
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Urgency Dashboard - Always visible first */}
        <div className="mb-6">
          <UrgencyDashboard urgency={caseData.urgency} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left Column - X-ray Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <XRayViewer 
              findings={caseData.findings}
              showAnnotations={showAnnotations}
              onToggleAnnotations={setShowAnnotations}
              selectedTooth={selectedTooth}
            />
            
            <ToothChart 
              findings={caseData.findings}
              onToothSelect={setSelectedTooth}
              selectedTooth={selectedTooth}
            />
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="findings" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="report">Report</TabsTrigger>
                <TabsTrigger value="ai">AI Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="findings" className="mt-4">
                <FindingsTab findings={caseData.findings} />
              </TabsContent>
              
              <TabsContent value="report" className="mt-4">
                <ClinicalReportTab caseData={caseData} />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-4">
                <AIAssistantTab caseId={caseId!} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          <XRayViewer 
            findings={caseData.findings}
            showAnnotations={showAnnotations}
            onToggleAnnotations={setShowAnnotations}
            selectedTooth={selectedTooth}
          />

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setToothChartExpanded(!toothChartExpanded)}
          >
            {toothChartExpanded ? 'Hide' : 'Show'} Tooth Chart
          </Button>

          {toothChartExpanded && (
            <ToothChart 
              findings={caseData.findings}
              onToothSelect={setSelectedTooth}
              selectedTooth={selectedTooth}
            />
          )}

          <Tabs defaultValue="findings" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="findings" className="text-xs sm:text-sm">Findings</TabsTrigger>
              <TabsTrigger value="report" className="text-xs sm:text-sm">Report</TabsTrigger>
              <TabsTrigger value="ai" className="text-xs sm:text-sm">AI Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="findings" className="mt-4">
              <FindingsTab findings={caseData.findings} />
            </TabsContent>
            
            <TabsContent value="report" className="mt-4">
              <ClinicalReportTab caseData={caseData} />
            </TabsContent>
            
            <TabsContent value="ai" className="mt-4">
              <AIAssistantTab caseId={caseId!} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
