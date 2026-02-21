import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Save, X } from 'lucide-react';

interface CorrectionFormProps {
  finding: any;
  onSave: (updates: any) => void;
  onCancel: () => void;
}

export default function CorrectionForm({ finding, onSave, onCancel }: CorrectionFormProps) {
  const [condition, setCondition] = useState(finding.condition);
  const [tooth, setTooth] = useState(finding.tooth);
  const [urgency, setUrgency] = useState(finding.urgency);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      condition,
      tooth,
      urgency,
      correctionNotes: notes,
    });
  };

  return (
    <Card className="border-blue-300 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">Correct AI Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g., Periapical Lesion"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tooth">Tooth Reference</Label>
              <Input
                id="tooth"
                value={tooth}
                onChange={(e) => setTooth(e.target.value)}
                placeholder="e.g., #19"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="attention">Needs Attention</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Correction Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Explain why you're correcting this detection..."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Correction
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
