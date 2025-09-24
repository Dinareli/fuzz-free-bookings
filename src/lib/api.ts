export interface ReservationDTO {
  id?: number;
  dateKey: string;
  timeSlotId: string;
  adminId?: number;
  professionalId?: string;
}

const API_URL = "http://localhost:5179";

export async function listReservations(dateKey?: string, adminId?: number, professionalId?: string): Promise<ReservationDTO[]> {
  const params: string[] = [];
  if (dateKey) params.push(`dateKey=${encodeURIComponent(dateKey)}`);
  if (adminId) params.push(`adminId=${adminId}`);
  if (professionalId) params.push(`professionalId=${encodeURIComponent(professionalId)}`);
  const query = params.length ? `?${params.join("&")}` : "";
  const res = await fetch(`${API_URL}/reservations${query}`);
  if (!res.ok) throw new Error("Erro ao buscar reservas");
  return res.json();
}

export async function createReservation(payload: ReservationDTO): Promise<ReservationDTO> {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao criar reserva");
  return res.json();
}

export async function deleteReservation(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/reservations/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover reserva");
}

// Blocks API
export interface BlockDTO {
  id?: number;
  dateKey: string;
  timeSlotId?: string; // se ausente, bloqueia o dia inteiro
  adminId: number;
  professionalId: string;
}

export async function listBlocks(dateKey?: string, adminId?: number, professionalId?: string): Promise<BlockDTO[]> {
  const params: string[] = [];
  if (dateKey) params.push(`dateKey=${encodeURIComponent(dateKey)}`);
  if (adminId) params.push(`adminId=${adminId}`);
  if (professionalId) params.push(`professionalId=${encodeURIComponent(professionalId)}`);
  const query = params.length ? `?${params.join("&")}` : "";
  const res = await fetch(`${API_URL}/blocks${query}`);
  if (!res.ok) throw new Error("Erro ao buscar bloqueios");
  return res.json();
}

export async function createBlock(payload: BlockDTO): Promise<BlockDTO> {
  const res = await fetch(`${API_URL}/blocks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao criar bloqueio");
  return res.json();
}

export async function deleteBlock(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/blocks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover bloqueio");
}


