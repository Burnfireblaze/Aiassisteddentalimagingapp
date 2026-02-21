import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Clock, TrendingUp } from 'lucide-react';

interface Finding {
  id: number;
  condition: string;
  tooth: string;
  urgency: string;
  confidence: number;
  modality: string;
  timeline: string;
  action: string;
}

interface FindingsTabProps {
  findings: Finding[];
}

export default function FindingsTab({ findings }: FindingsTabProps) {
  const sortedFindings = [...findings].sort((a, b) => {
    const urgencyOrder = { urgent: 0, attention: 1, routine: 2 };
    return urgencyOrder[a.urgency as keyof typeof urgencyOrder] - urgencyOrder[b.urgency as keyof typeof urgencyOrder];
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{findings.length} Findings Detected</h3>
      </div>

      {sortedFindings.map((finding) => (
        <Card key={finding.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{finding.condition}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">Tooth {finding.tooth}</p>
                </div>
                <Badge 
                  variant={finding.urgency === 'urgent' ? 'destructive' : finding.urgency === 'attention' ? 'default' : 'secondary'}
                  className="capitalize flex-shrink-0"
                >
                  {finding.urgency}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Confidence</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${finding.confidence}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{finding.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600">Modality</p>
                  <p className="font-medium text-gray-900 mt-1">{finding.modality}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700">Timeline</p>
                  <p className="text-sm text-gray-900">{finding.timeline}</p>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-blue-700">Recommended Action</p>
                  <p className="text-sm text-blue-900">{finding.action}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
