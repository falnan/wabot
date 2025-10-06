const userLastChat = new Map(); // { sender: timestamp }

export function updateUserActivity(sender) {
  userLastChat.set(sender, Date.now());
}

export function isRecentChat(sender) {
  const lastChat = userLastChat.get(sender);
  if (!lastChat) return false;

  const diffInHours = (Date.now() - lastChat) / (1000 * 60 * 60);
  if (diffInHours >= 24) {
    // Hapus user yang tidak aktif lebih dari 24 jam
    userLastChat.delete(sender);
    return false;
  }
  return true;
}

export function debugUserHistory() {
  console.log("User aktif:", [...userLastChat.entries()]);
}
