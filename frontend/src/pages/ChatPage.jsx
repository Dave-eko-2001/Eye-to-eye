import React, { useState } from 'react';
import UserSearchBar from '../components/UserSearchBar';
<<<<<<< HEAD

function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(null);
=======
import VoiceNoteRecorder from '../components/VoiceNoteRecorder';
import axios from 'axios';

function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [voiceNoteUrl, setVoiceNoteUrl] = useState(null);
    const [localVoiceUrl, setLocalVoiceUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Save blob locally and upload to backend
    const handleVoiceSend = async (blob) => {
        // Save locally
        const localUrl = URL.createObjectURL(blob);
        setLocalVoiceUrl(localUrl);
        // Save to phone (browser) storage
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = localUrl;
        a.download = `voice-note-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Upload to backend
        setUploading(true);
        const formData = new FormData();
        formData.append('voice', blob, `voice-note-${Date.now()}.webm`);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/voice/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setVoiceNoteUrl(res.data.url);
        } catch (err) {
            alert('Voice note upload failed.');
        }
        setUploading(false);
    };

>>>>>>> b8fa83a (Biometircs intergration into settings)
    return (
        <div>
            <h2 style={{ textAlign: 'center', color: '#1976d2', marginTop: 24 }}>Eye to Eye Chat</h2>
            <UserSearchBar onUserSelect={setSelectedUser} />
            {selectedUser && (
                <div className="chat-container" style={{ maxWidth: 600, margin: "0 auto", border: "1px solid #25d366", borderRadius: 16, padding: 24, background: "#f4f6fb", boxShadow: "0 4px 24px rgba(37,211,102,0.08)" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                        <img src={selectedUser.avatar || '/default-avatar.png'} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', background: '#eee' }} />
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#075e54' }}>{selectedUser.username}</div>
                            <div style={{ color: '#888', fontSize: 14 }}>{selectedUser.email}</div>
                        </div>
                    </div>
                    <div className="chat-messages" style={{ height: 350, overflowY: "auto", marginBottom: 16, padding: 8, background: "#fff", borderRadius: 8, border: "1px solid #eee" }}>
                        {/* Example messages */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontWeight: "bold", color: "#1976d2" }}>You:</div>
                            <div style={{ background: "#e3f2fd", padding: 8, borderRadius: 4, display: "inline-block" }}>Hi {selectedUser.username}! 👋</div>
                            <div style={{ fontSize: 12, color: "#888" }}>10:00 AM</div>
                        </div>
                        <div style={{ marginBottom: 12, textAlign: "right" }}>
                            <div style={{ fontWeight: "bold", color: "#388e3c" }}>{selectedUser.username}:</div>
                            <div style={{ background: "#c8e6c9", padding: 8, borderRadius: 4, display: "inline-block" }}>Hello! You found me on Eye to Eye.</div>
                            <div style={{ fontSize: 12, color: "#888" }}>10:01 AM</div>
                        </div>
<<<<<<< HEAD
                        {/* More messages can be mapped here */}
                    </div>
=======
                        {/* Voice note preview and download */}
                        {localVoiceUrl && (
                            <div style={{ margin: '16px 0' }}>
                                <div style={{ fontWeight: 'bold', color: '#1976d2' }}>Your Voice Note (local):</div>
                                <audio controls src={localVoiceUrl} />
                            </div>
                        )}
                        {voiceNoteUrl && (
                            <div style={{ margin: '16px 0' }}>
                                <div style={{ fontWeight: 'bold', color: '#388e3c' }}>Saved in Cloud:</div>
                                <audio controls src={`${import.meta.env.VITE_API_URL}${voiceNoteUrl}`} />
                                <a href={`${import.meta.env.VITE_API_URL}${voiceNoteUrl}`} download style={{ marginLeft: 12, color: '#25d366' }}>Redownload</a>
                            </div>
                        )}
                    </div>
                    <VoiceNoteRecorder onSend={handleVoiceSend} />
>>>>>>> b8fa83a (Biometircs intergration into settings)
                    <form style={{ display: "flex", gap: 8 }}>
                        <input
                            type="text"
                            placeholder={`Message ${selectedUser.username}...`}
                            style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #25d366" }}
                            disabled
                        />
                        <button type="submit" style={{ padding: "8px 20px", borderRadius: 8, background: "#25d366", color: "#fff", border: "none" }} disabled>
                            Send
                        </button>
                    </form>
                    <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
                        * Direct messaging coming soon!
                    </div>
<<<<<<< HEAD
=======
                    {uploading && <div style={{ color: '#1976d2', marginTop: 8 }}>Uploading voice note...</div>}
>>>>>>> b8fa83a (Biometircs intergration into settings)
                </div>
            )}
        </div>
    );
}

export default ChatPage;
