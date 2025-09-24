import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlockDTO, ReservationDTO, createBlock, createReservation, deleteBlock, deleteReservation, listBlocks, listReservations } from "@/lib/api";
import { Clock, Plus, Trash2 } from "lucide-react";

const timeOptions = [
  { id: "1", time: "08:00" },
  { id: "2", time: "08:30" },
  { id: "3", time: "09:00" },
  { id: "4", time: "09:30" },
  { id: "5", time: "10:00" },
  { id: "6", time: "10:30" },
  { id: "7", time: "11:00" },
  { id: "8", time: "14:00" },
  { id: "9", time: "14:30" },
  { id: "10", time: "15:00" },
];

export default function AdminHome() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [blocks, setBlocks] = useState<BlockDTO[]>([]);
  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  const [newTime, setNewTime] = useState<string>("");

  const dateKey = useMemo(() => {
    if (!selectedDate) return "";
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [selectedDate]);

  useEffect(() => {
    if (!user || !dateKey) return;
    (async () => {
      const [resv, blks] = await Promise.all([
        listReservations(dateKey, user.id, user.professionalId),
        listBlocks(dateKey, user.id, user.professionalId),
      ]);
      setReservations(resv);
      setBlocks(blks);
    })();
  }, [user, dateKey]);

  const isDayBlocked = blocks.some(b => b.dateKey === dateKey && !b.timeSlotId);

  const handleBlockDay = async () => {
    if (!user || !dateKey) return;
    const created = await createBlock({ dateKey, adminId: user.id, professionalId: user.professionalId });
    setBlocks(prev => [...prev, created]);
  };

  const handleUnblockDay = async () => {
    const block = blocks.find(b => b.dateKey === dateKey && !b.timeSlotId);
    if (!block || typeof block.id !== 'number') return;
    await deleteBlock(block.id);
    setBlocks(prev => prev.filter(b => b.id !== block.id));
  };

  const handleAddTime = async () => {
    if (!user || !dateKey || !newTime) return;
    const option = timeOptions.find(t => t.id === newTime);
    if (!option) return;
    const created = await createReservation({ dateKey, timeSlotId: option.id, adminId: user.id, professionalId: user.professionalId });
    setReservations(prev => [...prev, created]);
    setNewTime("");
  };

  const handleRemoveTime = async (id: number | undefined) => {
    if (typeof id !== 'number') return;
    await deleteReservation(id);
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">Olá, {user?.name}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Sua Agenda</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border p-3"
              />
              <div className="flex gap-2 mt-4">
                {!isDayBlocked ? (
                  <Button variant="destructive" onClick={handleBlockDay}>Bloquear data</Button>
                ) : (
                  <Button variant="outline" onClick={handleUnblockDay}>Liberar data</Button>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Horários do dia {dateKey}</Label>
                <div className="flex items-center gap-2">
                  <Select value={newTime} onValueChange={setNewTime}>
                    <SelectTrigger className="w-[140px]"><SelectValue placeholder="Novo horário" /></SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(t => (
                        <SelectItem value={t.id} key={t.id}>{t.time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddTime} disabled={!newTime}><Plus className="h-4 w-4 mr-1" />Adicionar horário</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {reservations
                  .filter(r => r.dateKey === dateKey)
                  .sort((a, b) => Number(a.timeSlotId) - Number(b.timeSlotId))
                  .map(r => {
                    const time = timeOptions.find(t => t.id === r.timeSlotId)?.time || r.timeSlotId;
                    return (
                      <Button key={r.id} variant="outline" className="justify-between">
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-2" />{time}</span>
                        <Trash2 className="h-4 w-4" onClick={(e) => { e.preventDefault(); handleRemoveTime(r.id); }} />
                      </Button>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


