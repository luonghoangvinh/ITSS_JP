const API_BASE = import.meta.env.VITE_API_URL || '';
export const getAccount = async (id: number) => {
  const response = await fetch(`${API_BASE}/api/accounts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch account');
  }
  return response.json();
};

export const updateAccount = async (id: number, data: any) => {
  const response = await fetch(`${API_BASE}/accounts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update account');
  }
  return response.json();
};

export const deleteAccount = async (id: number) => {
  const response = await fetch(`${API_BASE}/accounts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
  return true;
};