import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Check, X, Edit } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import DetectionCard from '../components/findings/detection-card';
import CorrectionForm from '../components/findings/correction-form';

export default function FindingsReview() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [findings, setFindings] = useState([
    {
      id: 1,
      condition: 'Periapical Lesion',
      tooth: '#19',
      urgency: 'urgent',
      confidence: 95,
      modality: 'Periapical',
      timeline: 'Within 24-48 hours',
      action: 'Endodontic evaluation required',
      status: 'pending',
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
      status: 'pending',
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
      status: 'pending',
    },
  ]);

  const [editingFinding, setEditingFinding] = useState<number | null>(null);

  const handleAccept = (id: number) => {
    setFindings(findings.map(f => 
      f.id === id ? { ...f, status: 'accepted' } : f
    ));
  };

  const handleReject = (id: number) => {
    setFindings(findings.map(f => 
      f.id === id ? { ...f, status: 'rejected' } : f
    ));
  };

  const handleCorrect = (id: number) => {
    setEditingFinding(id);
  };

  const handleSaveCorrection = (id: number, updates: any) => {
    setFindings(findings.map(f => 
      f.id === id ? { ...f, ...updates, status: 'corrected' } : f
    ));
    setEditingFinding(null);
  };

  const acceptedCount = findings.filter(f => f.status === 'accepted').length;
  const correctedCount = findings.filter(f => f.status === 'corrected').length;
  const rejectedCount = findings.filter(f => f.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-16 z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/analysis/${caseId}`)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Review Findings</h1>
              <p className="text-sm text-gray-600">Case: {caseId}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              {acceptedCount} Accepted
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              {correctedCount} Corrected
            </Badge>
            <Badge variant="outline" className="bg-red-50">
              {rejectedCount} Rejected
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Progress */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Review Progress</span>
              <span className="text-sm font-semibold text-blue-900">
                {acceptedCount + correctedCount + rejectedCount} / {findings.length}
              </span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${((acceptedCount + correctedCount + rejectedCount) / findings.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Findings List */}
        <div className="space-y-4">
          {findings.map((finding) => (
            <div key={finding.id}>
              {editingFinding === finding.id ? (
                <CorrectionForm
                  finding={finding}
                  onSave={(updates) => handleSaveCorrection(finding.id, updates)}
                  onCancel={() => setEditingFinding(null)}
                />
              ) : (
                <DetectionCard
                  finding={finding}
                  onAccept={() => handleAccept(finding.id)}
                  onReject={() => handleReject(finding.id)}
                  onCorrect={() => handleCorrect(finding.id)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/analysis/${caseId}`)}
            className="sm:w-auto w-full"
          >
            Back to Analysis
          </Button>
          <Button 
            onClick={() => navigate(`/report/${caseId}`)}
            disabled={acceptedCount + correctedCount + rejectedCount < findings.length}
            className="sm:w-auto w-full"
          >
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
