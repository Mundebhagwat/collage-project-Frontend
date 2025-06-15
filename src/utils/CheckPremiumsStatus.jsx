export const checkPremiumBeforeMessage = async (chatId, message,) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`https://collage-project-backend-j2vf.onrender.com/api/chat/check-premium-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // your JWT
      },
      body: JSON.stringify({ chatId, message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Access denied');
    return { allowed: true, remaining: data.remaining };
  } catch (err) {
    return { allowed: false, error: err.message };
  }
};
