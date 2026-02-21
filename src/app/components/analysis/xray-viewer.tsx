import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Eye, EyeOff, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Finding {
  id: number;
  condition: string;
  tooth: string;
  urgency: string;
  position: { x: number; y: number; width: number; height: number };
}

interface XRayViewerProps {
  findings: Finding[];
  showAnnotations: boolean;
  onToggleAnnotations: (show: boolean) => void;
  selectedTooth: number | null;
}

export default function XRayViewer({ 
  findings, 
  showAnnotations, 
  onToggleAnnotations,
  selectedTooth 
}: XRayViewerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'border-red-500 bg-red-500/20';
      case 'attention':
        return 'border-yellow-500 bg-yellow-500/20';
      default:
        return 'border-green-500 bg-green-500/20';
    }
  };

  return (
    <Card className={fullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>X-ray Viewer</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleAnnotations(!showAnnotations)}
            >
              {showAnnotations ? (
                <>
                  <EyeOff className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Hide</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Show</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFullscreen(!fullscreen)}
              className="hidden sm:flex"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center">
          {/* Mock X-ray image - in production this would be actual radiograph */}
          <div 
            className="relative bg-gradient-to-br from-gray-700 to-gray-800 w-full h-full flex items-center justify-center"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div className="text-gray-500 text-center p-8">
              <p className="text-sm mb-2">Dental Radiograph</p>
              <p className="text-xs">Patient #1234 - Panoramic View</p>
            </div>

            {/* AI Annotations */}
            {showAnnotations && findings.map((finding) => (
              <div
                key={finding.id}
                className={`absolute border-2 ${getUrgencyColor(finding.urgency)} transition-all cursor-pointer hover:scale-105`}
                style={{
                  left: `${finding.position.x}%`,
                  top: `${finding.position.y}%`,
                  width: `${finding.position.width}%`,
                  height: `${finding.position.height}%`,
                }}
              >
                <div className="absolute -top-8 left-0 whitespace-nowrap">
                  <Badge 
                    variant={finding.urgency === 'urgent' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {finding.tooth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        {showAnnotations && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-red-500 bg-red-500/20" />
              <span className="text-gray-700">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-yellow-500 bg-yellow-500/20" />
              <span className="text-gray-700">Attention Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-green-500 bg-green-500/20" />
              <span className="text-gray-700">Routine</span>
            </div>
          </div>
        )}

        <div className="mt-3 text-sm text-gray-600">
          Zoom: {zoom}% • {findings.length} findings detected
        </div>
      </CardContent>
    </Card>
  );
}
